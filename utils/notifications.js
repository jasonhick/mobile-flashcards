import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'JASONHICK:notifications';

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync
	);
}

function createNotification() {
	return {
		title: 'Daily quiz reminder!',
		body:
			"It's time for your daily quiz. Pick a deck and see if you can better your last score.",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			sticky: false,
			vibrate: true
		}
	};
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === 'granted') {
						Notifications.cancelAllScheduledNotificationsAsync();

						let tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate());
						tomorrow.setHours(12);
						tomorrow.setMinutes(30);

						// Test notification triggered 60 secs after completing a quiz
						// Uncomment the line below to test local notifications:
						// tomorrow.setDate(tomorrow.getTime() + 60000);

						Notifications.scheduleLocalNotificationAsync(createNotification(), {
							time: tomorrow,
							repeat: 'day'
						});

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
					}
				});
			}
		});
}
