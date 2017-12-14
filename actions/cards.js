import * as actionTypes from './types';

export function fetchCards(cards) {
	return {
		type: FETCH_CARDS,
		cards
	};
}
