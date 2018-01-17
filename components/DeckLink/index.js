import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as c from '../../utils/colors';

const DeckLink = ({ deck, navigation }) => (
	<View>
		<TouchableOpacity
			style={[s.view]}
			onPress={() => navigation.navigate('Deck', { title: deck.title })}>
			<Text style={[s.title]}>{deck.title}</Text>
			<Text style={[s.subtitle]}>{deck.questions.length} questions</Text>
		</TouchableOpacity>
	</View>
);

const s = StyleSheet.create({
	view: {
		marginTop: 5,
		marginHorizontal: 50,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: c.gold
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
	}
});

export default DeckLink;
