import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as c from '../../utils/colors';

const CardLink = ({ deck, card, navigation }) => (
	<View>
		<TouchableOpacity
			style={[s.item]}
			onPress={() =>
				navigation.navigate('AddCard', {
					title: 'Edit card',
					subtitle: deck.title
				})
			}>
			<Text numberOfLines={1}>{card.question}</Text>
		</TouchableOpacity>
	</View>
);

const s = StyleSheet.create({
	item: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: c.grey
	}
});

export default CardLink;
