import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(logger, thunk);

const configureStore = () => {
	const store = createStore(
		rootReducer,
		/* preloadedState, */ composeWithDevTools(enhancer)
	);

	store.subscribe(() => {
		AsyncStorage.state = JSON.stringify(store.getState());
	});

	return store;
};

export default configureStore;
