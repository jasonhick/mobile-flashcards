import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as c from '../../utils/colors';

const DeckLink = ({ deck, navigation }) => (
	<View style={[s.view]}>
		<TouchableOpacity
			style={[s.button]}
			onPress={() => navigation.navigate('Deck', { deck })}>
			<Text style={[s.title]}>{deck.title}</Text>
			<Text style={[s.subtitle]}>{deck.questions.length} questions</Text>
		</TouchableOpacity>
	</View>
);

const s = StyleSheet.create({
	view: {
		display: 'flex',
		alignItems: 'center'
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: c.nearblack
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 10,
		color: c.nearblack
	},
	button: {
		width: 200,
		marginTop: 5,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: c.gold,
		justifyContent: 'center'
	}
});

export default DeckLink;
