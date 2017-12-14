import { combineReducers } from 'redux';
import decks from './decks';
import cards from './cards';

const rootReducer = combineReducers({
	decks,
	cards
});

export default rootReducer;
