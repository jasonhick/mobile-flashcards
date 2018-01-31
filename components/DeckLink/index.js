import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import s from '../../utils/styles';

const DeckLink = ({ deck, navigation }) => (
	<TouchableOpacity
		style={[s.deck]}
		onPress={() => navigation.navigate('Deck', { deck })}>
		<Text style={[s.deckTitle]}>{deck.title}</Text>
		<Text style={[s.deckSubtitle]}>{deck.questions.length} questions</Text>
	</TouchableOpacity>
);

export default DeckLink;
