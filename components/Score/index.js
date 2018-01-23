import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import {
	Container,
	Header,
	Footer,
	Left,
	Right,
	Title,
	Subtitle,
	Body,
	Content,
	Icon,
	List,
	ListItem,
	Label,
	Button,
	Text,
	H1,
	H2,
	H3
} from 'native-base';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import * as c from '../../utils/colors';

class Score extends Component {
	showScoreMessage = percentage => {
		let msg = '';

		if (percentage === 0) {
			msg = 'Really? Zero? You cannot be serious!!';
		} else if (percentage > 0 && percentage <= 25) {
			msg = 'Oh dear. Did you do any homework?';
		} else if (percentage > 25 && percentage <= 50) {
			msg = 'Hmmmm. Could do better. Much better!';
		} else if (percentage > 50 && percentage <= 75) {
			msg = 'Not bad, but you could use some more practice.';
		} else if (percentage > 75 && percentage < 100) {
			msg = 'Great score!';
		} else if (percentage === 100) {
			msg = 'Full House! Excellent score, but maybe you should get out more...';
		} else {
			msg = 'Good job.';
		}
		return msg;
	};

	render() {
		const { navigation, deck } = this.props;
		const { score } = navigation.state.params;
		const percentage = score / deck.questions.length * 100;
		const msg = this.showScoreMessage(percentage);
		return (
			<Container>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Body>
						<Title style={[s.title]}>Score</Title>
					</Body>
				</Header>
				<Content contentContainerStyle={[s.flexRow, s.bgBlack]}>
					<View style={[s.flexCols]}>
						<Text style={[s.text, s.score]}>{percentage}%</Text>
						{score === 1 ? (
							<Text style={[s.text]}>You got 1 question wrong</Text>
						) : (
							<Text style={[s.text]}>
								You got {deck.questions.length - score} questions wrong
							</Text>
						)}
						<Text style={[s.text, s.tease]}>{msg}</Text>
					</View>
				</Content>

				<Footer>
					<View style={[s.flexRow, s.spaceAround, s.footer]}>
						<Button block onPress={() => navigation.navigate('Quiz', { deck })}>
							<Text>Restart Quiz</Text>
						</Button>

						<Button
							block
							onPress={() =>
								navigation.navigate('Deck', {
									deck
								})
							}>
							<Text>Back to Deck</Text>
						</Button>
					</View>
				</Footer>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	header: {
		backgroundColor: c.black
	},
	text: {
		marginVertical: 10,
		color: c.white
	},
	score: {
		fontSize: 70
	},
	tease: {
		marginHorizontal: 40,
		fontSize: 40,
		textAlign: 'center'
	},
	center: {
		textAlign: 'center'
	},
	button: {
		marginVertical: 5,
		backgroundColor: c.gold
	},
	center: {
		textAlign: 'center'
	},
	flexRow: {
		flex: 1,
		flexDirection: 'row'
	},
	flexCols: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: c.black
	},
	bgBlack: {
		backgroundColor: c.black
	},
	spaceAround: {
		justifyContent: 'space-around'
	},
	footer: {
		height: 65,
		padding: 10,
		backgroundColor: c.black
	}
});

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck]
	};
}

export default connect(mapStateToProps)(Score);
