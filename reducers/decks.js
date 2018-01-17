import * as actionType from '../actions/types';

function decks(state = {}, action) {
	switch (action.type) {
		case actionType.RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};

		case actionType.ADD_DECK:
			const { id, title } = action.deck;
			return {
				...state,
				[title]: {
					id,
					title,
					questions: []
				}
			};

		case actionType.FETCH_CARDS:
			return state;

		case actionType.ADD_CARD:
			const { deck, card } = action;
			return {
				...state,
				[deck]: {
					title: deck,
					questions: [...state[deck].questions, action.card]
				}
			};

		default:
			return state;
	}
}

export default decks;
