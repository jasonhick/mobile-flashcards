import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import Home from './components/Home';

debugger;
const store = configureStore();

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Home />
			</Provider>
		);
	}
}

export default App;
