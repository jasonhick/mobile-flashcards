import { AsyncStorage } from 'react-native';

export const ASYNC_STORAGE_KEY = 'JASONHICK:FlashCards';

function loadInitialData() {
	const initialData = {
		React: {
			id: 'cjchetnjw000104wl2ggmhapp',
			title: 'React',
			questions: [
				{
					id: 'cjchb8mwa000004054kdytjsw',
					question: 'What is React?',
					answer: 'A library for managing user interfaces'
				},
				{
					id: 'cjchb9k8i00010405x5krha3k',
					question: 'Where do you make Ajax requests in React?',
					answer: 'The componentDidMount lifecycle event'
				}
			]
		},
		JavaScript: {
			id: 'cjcheucxi000204wljjjxh70r',
			title: 'JavaScript',
			questions: [
				{
					id: 'cjchb9qb800020405muiutk83',
					question: 'What is a closure?',
					answer:
						'The combination of a function and the lexical environment within which that function was declared.'
				}
			]
		}
	};

	AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(initialData));
	return initialData;
}

export function setupInitialResults(results) {
	return results === null ? loadInitialData() : JSON.parse(results);
	// return loadInitialData();
}

export function fetchDecks() {
	return AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(setupInitialResults);
}

export function dbSaveDeck(deck) {
	const { id, title } = deck;
	return AsyncStorage.mergeItem(
		ASYNC_STORAGE_KEY,
		JSON.stringify({
			[title]: {
				id,
				title,
				questions: []
			}
		})
	);
}

export function dbSaveCard(card) {
	return AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(result => {
		const data = JSON.parse(result);

		let questions = data[card.parentTitle].questions;
		const { parentId, parentTitle } = card;
		questions.push(card);

		AsyncStorage.mergeItem(
			ASYNC_STORAGE_KEY,
			JSON.stringify({
				[parentTitle]: {
					parentTitle,
					parentId,
					questions
				}
			})
		);
	});
}
