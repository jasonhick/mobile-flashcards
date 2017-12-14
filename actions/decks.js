import * as actionType from './types';
import * as api from '../utils/api';

export function receiveDecks(decks) {
	return {
		type: actionType.RECEIVE_DECKS,
		decks
	};
}

export const getDecks = () => dispatch =>
	api.fetchDecks().then(data => dispatch(receiveDecks(data)));
