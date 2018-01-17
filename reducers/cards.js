import * as actionType from '../actions/types';

function cards(state = {}, action) {
	switch (action.type) {
		case actionType.FETCH_CARDS:
			return state;

		case actionType.ADD_CARD:
			const { deck, card } = action;
			return {
				...state,
				decks: {
					[deck]: {
						...action.card
					}
				}
			};

		default:
			return state;
	}
}

export default cards;
