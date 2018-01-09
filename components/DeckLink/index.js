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
			<Text style={[s.f5, { flex: 3 }]}>{deck.title}</Text>
			<Text style={[s.link]}>{deck.questions.length}</Text>
		</TouchableOpacity>
	</View>
);

const s = StyleSheet.create({
	view: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		marginHorizontal: 50,
		padding: 10,
		paddingLeft: 20,
		borderRadius: 50,
		backgroundColor: c.gold
	},
	link: {
		width: 30,
		height: 30,
		paddingTop: 6,
		borderRadius: 30 / 2,
		borderColor: c.yellow,
		borderWidth: 1,
		overflow: 'hidden',
		textAlign: 'center',
		color: c.black
	}
});

export default DeckLink;
