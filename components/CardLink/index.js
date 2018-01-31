import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import s from '../../utils/styles';

const CardLink = ({ deck, card, navigation }) => (
	<View>
		<TouchableOpacity style={[s.cardLink]}>
			<Text numberOfLines={1}>{card.question}</Text>
		</TouchableOpacity>
	</View>
);

export default CardLink;
