import * as actionType from '../actions/types';

function cards(state = {}, action) {
	switch (action.type) {
		case actionType.FETCH_CARDS:
			return state;

		default:
			return state;
	}
}

export default cards;
