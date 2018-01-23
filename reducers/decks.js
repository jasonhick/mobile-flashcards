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
			const { parentId, parentTitle, question, answer } = action.card;
			return {
				...state,
				[parentTitle]: {
					id: parentId,
					title: parentTitle,
					questions: [
						...state[parentTitle].questions,
						{
							id: action.card.id,
							question,
							answer
						}
					]
					// questions: [...state[parentTitle].questions, action.card]
				}
			};

		default:
			return state;
	}
}

export default decks;
