import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import {
	Container,
	Header,
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
			msg = 'Rubbish!';
		} else if (percentage > 0 && percentage <= 25) {
			msg = 'Not very good';
		} else if (percentage > 0 && percentage <= 50) {
			msg = 'Could do better';
		} else if (percentage > 50 && percentage <= 75) {
			msg = 'Not bad...';
		} else if (percentage > 75 && percentage < 100) {
			msg = 'Great score!';
		} else if (percentage === 100) {
			msg = 'Excellent!';
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
				<Content
					padder
					contentContainerStyle={{
						flex: 1,
						flexDirection: 'row'
					}}>
					<View style={[s.flexCols]}>
						<H1>{deck.title}</H1>
						<H2>{msg}</H2>
						<Text>{percentage}%</Text>
						<Text>
							You got {score} of {deck.questions.length} correct
						</Text>
						<View>
							<Button
								block
								onPress={() => navigation.navigate('Quiz', { deck })}>
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
					</View>
				</Content>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	header: {
		backgroundColor: c.black
	},
	title: {
		color: c.white
	},
	subtitle: {
		color: c.white
	},
	button: {
		marginVertical: 5,
		backgroundColor: c.gold
	},
	center: {
		textAlign: 'center'
	},
	flexCols: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: c.black
	}
});

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck]
	};
}

export default connect(mapStateToProps)(Score);
