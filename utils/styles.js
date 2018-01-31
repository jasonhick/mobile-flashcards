import { StyleSheet } from 'react-native';
import * as c from './colors';

const s = StyleSheet.create({
	flex: {
		flex: 1
	},
	flexRow: {
		flex: 1,
		flexDirection: 'row'
	},
	fJCC: {
		justifyContent: 'center'
	},
	fJSA: {
		justifyContent: 'space-around'
	},
	fAIC: {
		alignItems: 'center'
	},
	fAIFS: {
		alignItems: 'flex-start'
	},
	mv: {
		marginVertical: 20
	},
	mvs: {
		marginVertical: 10
	},
	mhs: {
		marginHorizontal: 10
	},
	mhl: {
		marginHorizontal: 40
	},
	p: {
		padding: 20
	},
	header: {
		backgroundColor: c.black
	},
	content: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		backgroundColor: c.black,
		borderColor: c.black
	},
	footer: {
		height: 85,
		paddingVertical: 20,
		backgroundColor: c.black
	},
	title: {
		color: c.white
	},
	bgBlack: {
		backgroundColor: c.black
	},
	bgGrey: {
		backgroundColor: c.grey
	},
	white: {
		color: c.white
	},
	tc: {
		textAlign: 'center'
	},
	deck: {
		alignContent: 'flex-end',
		flex: 1,
		height: 180,
		marginVertical: 5,
		marginHorizontal: 5,
		paddingVertical: 10,
		borderRadius: 7,
		borderWidth: 3,
		borderColor: c.white,
		backgroundColor: c.gold,
		justifyContent: 'center'
	},
	deckTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: c.nearblack
	},
	deckSubtitle: {
		textAlign: 'center',
		fontSize: 12,
		color: c.nearblack
	},
	list: {
		marginVertical: 20,
		backgroundColor: c.white,
		borderRadius: 5
	},
	cardLink: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: c.grey
	},
	cardTitle: {
		fontSize: 40,
		fontWeight: 'bold',
		color: c.darkgrey
	},
	cardText: {
		marginBottom: 20,
		fontSize: 24,
		color: c.black,
		textAlign: 'center'
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	flipCard: {
		justifyContent: 'space-between',
		width: 280,
		height: 400,
		paddingVertical: 0,
		paddingHorizontal: 10,
		backgroundColor: c.white,
		borderColor: c.gold,
		borderWidth: 10,
		borderRadius: 15,
		backfaceVisibility: 'hidden'
	},
	flipCardBack: {
		borderColor: c.white,
		backgroundColor: c.gold,
		position: 'absolute'
	},
	cardTitle: {
		fontSize: 40,
		fontWeight: 'bold',
		color: c.darkgrey
	},
	cardText: {
		marginBottom: 20,
		fontSize: 24,
		color: c.black,
		textAlign: 'center'
	},
	flexEnd: {
		alignSelf: 'flex-end',
		transform: [{ rotateX: '180deg' }, { rotateY: '180deg' }]
	},
	score: {
		fontSize: 70
	},
	tease: {
		marginHorizontal: 40,
		fontSize: 40,
		textAlign: 'center'
	}
});

export default s;
