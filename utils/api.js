import { AsyncStorage } from 'react-native';

export const ASYNC_STORAGE_KEY = 'JASONHICK:FlashCards';

function loadInitialData() {
	const initialData = {
		React: {
			title: 'React',
			questions: [
				{
					question: 'What is React?',
					answer: 'A library for managing user interfaces'
				},
				{
					question: 'Where do you make Ajax requests in React?',
					answer: 'The componentDidMount lifecycle event'
				}
			]
		},
		JavaScript: {
			title: 'JavaScript',
			questions: [
				{
					question: 'What is a closure?',
					answer:
						'The combination of a function and the lexical environment within which that function was declared.'
				}
			]
		}
	};

	AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(initialData));
	return initialData;
}

export function setupInitialResults(results) {
	return results === null ? loadInitialData() : JSON.parse(results);
	// return loadInitialData();
}

export function fetchDecks() {
	return AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(setupInitialResults);
}

export function getDeck(title) {
	return AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(results => {
		const decks = JSON.parse(results);
		return decks[title];
	});
}

export function saveNewDeck(title) {
	return AsyncStorage.mergeItem(
		ASYNC_STORAGE_KEY,
		JSON.stringify({
			[title]: {
				title,
				questions: []
			}
		})
	);
}
