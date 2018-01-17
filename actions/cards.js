import * as actionTypes from './types';
import * as api from '../utils/api';

function addCard(deck, card) {
	return {
		type: actionTypes.ADD_CARD,
		deck,
		card
	};
}

export const saveCard = (deck, card) => dispatch =>
	api.dbSaveCard(deck, card).then(() => dispatch(addCard(deck, card)));
