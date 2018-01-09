import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Constants } from 'expo';
import * as c from '../../utils/colors';

const MyStatusBar = () => (
	<View style={{ height: Constants.statusBarHeight, backgroundColor: c.black }}>
		<StatusBar barStyle="light-content" />
	</View>
);

export default MyStatusBar;
