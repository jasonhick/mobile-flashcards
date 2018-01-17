import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import Expo, { AppLoading } from 'expo';
import configureStore from './utils/configureStore';
import MyStatusBar from './components/MyStatusBar';
import { Tabs, Stacks } from './utils/navigation';
import * as c from './utils/colors';

const store = configureStore();

class App extends React.Component {
	state = { fontsLoaded: false };

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
		});
		this.setState({ fontsLoaded: true });
	}

	render() {
		if (!this.state.fontsLoaded) {
			return <AppLoading />;
		}

		return (
			<Provider store={store}>
				<View style={s.view}>
					<MyStatusBar />
					<Tabs />
				</View>
			</Provider>
		);
	}
}

const s = StyleSheet.create({
	view: {
		flex: 1
	}
});

export default App;
