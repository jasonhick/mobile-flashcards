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
		Cats: {
			id: 'cjcheucxi000204wljjjxh70r',
			title: 'Cats',
			questions: [
				{
					id: 'cjchb9qb800020405muiutk83',
					question: 'A female cat is called a...',
					answer: 'Queen'
				},
				{
					id: 'cjchb9qb800020405muiutk84',
					question: "Should you give cats cow's milk?",
					answer: 'No. They are lactose intolerant.'
				},
				{
					id: 'cjchb9qb800020405muiutk95',
					question: 'Name a famous cartoon cat.',
					answer: 'Garfield. Top Cat. Cheshire Cat.'
				},
				{
					id: 'cjchb9qb801020405muiutk65',
					question: 'How many hours a day do cats sleep?',
					answer: '12-16 hours per day.'
				},
				{
					id: 'cjchb9qb801020405muiutk66',
					question: 'What are the collective nouns used for cats and kittens?',
					answer: 'A clowder of cats, and a kindle of kittens.'
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
