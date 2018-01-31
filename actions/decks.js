import * as actionType from './types';
import * as api from '../utils/api';

function receiveDecks(decks) {
	return {
		type: actionType.RECEIVE_DECKS,
		decks
	};
}

function addDeck(deck) {
	return {
		type: actionType.ADD_DECK,
		deck
	};
}

export const getAllDecks = () => dispatch =>
	api.fetchDecks().then(data => dispatch(receiveDecks(data)));

export const saveDeck = deck => dispatch =>
	api.dbSaveDeck(deck).then(() => dispatch(addDeck(deck)));
