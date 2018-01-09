import * as actionType from '../actions/types';

function decks(state = [], action) {
	switch (action.type) {
		case actionType.RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};

		case actionType.ADD_DECK:
			const { title } = action;
			return {
				...state,
				[title]: {
					title,
					questions: []
				}
			};

		default:
			return state;
	}
}

export default decks;
