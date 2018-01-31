import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
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
import {
	clearLocalNotification,
	setLocalNotification
} from '../../utils/notifications';
import s from '../../utils/styles';

class Score extends Component {
	componentDidMount() {
		clearLocalNotification().then(setLocalNotification);
	}

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

	reset() {
		const { deck } = this.props;
		this.props.navigation.dispatch(
			NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName: 'Deck', params: { deck } })
				]
			})
		);
	}

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
				<Content contentContainerStyle={[s.flex, s.fAIC, s.fJCC, s.bgBlack]}>
					<Text style={[s.mv, s.white, s.score]}>{percentage}%</Text>
					{deck.questions.length - score === 1 ? (
						<Text style={[s.white]}>You got 1 question wrong</Text>
					) : (
						<Text style={[s.white]}>
							You got {deck.questions.length - score} questions wrong
						</Text>
					)}
					<Text style={[s.mv, s.white, s.tease]}>{msg}</Text>

					<View style={[s.flexRow]}>
						<Button
							block
							style={[s.mhs]}
							onPress={() => navigation.navigate('Quiz', { deck })}>
							<Text>Restart Quiz</Text>
						</Button>

						<Button block style={[s.mhs]} onPress={() => this.reset()}>
							<Text>Back to Deck</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck]
	};
}

export default connect(mapStateToProps)(Score);
