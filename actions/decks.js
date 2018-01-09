import * as actionType from './types';
import * as api from '../utils/api';

function receiveDecks(decks) {
	return {
		type: actionType.RECEIVE_DECKS,
		decks
	};
}

function addDeck(title) {
	return {
		type: actionType.ADD_DECK,
		title
	};
}

export const getAllDecks = () => dispatch =>
	api.fetchDecks().then(data => dispatch(receiveDecks(data)));

export const addNewDeck = title => dispatch =>
	api.saveNewDeck(title).then(() => dispatch(addDeck(title)));
