import React from 'react';
import { StatusBar, StyleSheet, Text, View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import { TabNavigator } from 'react-navigation';
import NativeTachyons from 'react-native-style-tachyons';
import { styles as s } from 'react-native-style-tachyons';
import * as c from './utils/colors';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Home from './components/Home';

NativeTachyons.build(
	{
		/* REM parameter is optional, default is 16 */
		rem: 16,
		colors: {
			palette: {
				black: '#000000',
				white: '#ffffff',
				grey: '#eeeeee',
				gold: '#ffd700',
				yellow: '#fffceb'
			}
		},
		fonts: {
			avenir: 'Avenir',
			courier: 'Courier'
		}
	},
	StyleSheet
);

const AddDeck = () => (
	<View>
		<Text>Goodbye!</Text>
	</View>
);

function MyStatusBar() {
	return (
		<View style={[s.bg_gold, { height: Constants.statusBarHeight }]}>
			<StatusBar barStyle="dark-content" />
		</View>
	);
}

const Tabs = TabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				tabBarLabel: 'Home',
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="home" size={30} color={tintColor} />
				)
			}
		},
		AddDeck: {
			screen: AddDeck,
			navigationOptions: {
				tabBarLabel: 'Add Deck',
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="plus" size={30} color={tintColor} />
				)
			}
		}
	},
	{
		initialRouteName: 'Home',
		animationEnabled: true,
		swipeEnabled: true,
		tabBarOptions: {
			showLabel: false,
			activeTintColor: c.white,
			inactiveTintColor: c.black,
			style: {
				height: 56,
				backgroundColor: c.gold
			}
		}
	}
);

const store = configureStore();

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<MyStatusBar />
					<Tabs />
				</View>
			</Provider>
		);
	}
}

export default App;
