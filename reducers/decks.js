import * as actionType from '../actions/types';

function decks(state = [], action) {
	switch (action.type) {
		case actionType.RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};

		default:
			return state;
	}
}

export default decks;
