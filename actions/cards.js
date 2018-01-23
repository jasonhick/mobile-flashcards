import * as actionTypes from './types';
import * as api from '../utils/api';

function addCard(card) {
	return {
		type: actionTypes.ADD_CARD,
		card
	};
}

export const saveCard = card => dispatch =>
	api.dbSaveCard(card).then(() => dispatch(addCard(card)));
