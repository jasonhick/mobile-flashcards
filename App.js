import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import MyStatusBar from './components/MyStatusBar';
import { Tabs, Stacks } from './utils/navigation';
import * as c from './utils/colors';

const store = configureStore();

class App extends React.Component {
	render() {
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
