import React from 'react';
import { Text, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Decks from '../components/Decks';
import Deck from '../components/Deck';
import AddDeck from '../components/AddDeck';
import AddCard from '../components/AddCard';
import * as c from './colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export const Stacks = StackNavigator(
	{
		Decks: {
			screen: Decks
		},
		Deck: {
			screen: Deck,
			header: null
		},
		Card: {
			screen: AddCard
		},
		AddCard: {
			screen: AddCard
		}
	},
	{ headerMode: 'none' }
);

export const Tabs = TabNavigator(
	{
		Home: {
			screen: Stacks,
			navigationOptions: {
				tabBarLabel: 'Decks',
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="home" size={30} color={tintColor} />
				)
			}
		},
		AddDeck: {
			screen: AddDeck,
			navigationOptions: {
				tabBarLabel: 'Add Deck',
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="plus" size={30} color={tintColor} />
				)
			}
		}
	},
	{
		tabBarOptions: {
			activeTintColor: c.white,
			style: {
				height: 56,
				backgroundColor: Platform.OS === 'ios' ? c.black : c.black
			}
		}
	}
);
