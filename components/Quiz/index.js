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

class Quiz extends Component {
	state = {
		counter: 0,
		score: 0,
		showAnswer: false
	};

	// Check to see if the quiz is complete before rendering
	// If it is, show the score screen
	shouldComponentUpdate(nextProps, nextState) {
		const { questions } = this.props.deck;
		if (nextState.counter >= questions.length) {
			this.props.navigation.navigate('Score', {
				title: 'Score',
				deck: this.props.deck.title,
				score: nextState.score
			});
			return false;
		}
		return true;
	}

	answer = which => {
		const { navigation } = this.props;
		const { questions } = this.props.deck;
		const count = this.state.counter + 1;
		const complete = count >= questions.length ? true : false;
		which();
		this.showAnswer(false);
	};

	correct = () => {
		this.setState({
			counter: this.state.counter + 1,
			score: this.state.score + 1
		});
	};

	incorrect = () => {
		this.setState({
			counter: this.state.counter + 1
		});
	};

	showAnswer = which => {
		this.setState({
			showAnswer: which
		});
	};

	render() {
		const { deck, navigation } = this.props;
		const { counter, score, showAnswer } = this.state;
		return (
			<Container>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Left>
						<Button transparent onPress={() => navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title style={[s.title]}>Quiz</Title>
					</Body>
					<Right />
				</Header>

				<Content contentContainerStyle={[s.content]} padder>
					<View style={[s.flexRows]}>
						<H2 style={[s.qTitle]}>{deck.title}</H2>
						<Text style={[s.qCount]}>
							{counter + 1} of {deck.questions.length}
						</Text>
					</View>

					{showAnswer ? (
						<View style={[s.flexCols, s.card]}>
							<Text style={[s.questionTitle]}>Answer:</Text>
							<Text style={[s.text, s.answer]}>
								{deck.questions[counter].answer}
							</Text>
						</View>
					) : (
						<View style={[s.card]}>
							<Text style={[s.questionTitle]}>Question:</Text>
							<Text style={[s.question]}>
								{deck.questions[counter].question}
							</Text>
						</View>
					)}
				</Content>

				<Footer style={[s.footer]}>
					{showAnswer ? (
						<View style={[s.flexRows]}>
							<Button
								style={[s.button]}
								success
								onPress={() => this.answer(this.correct)}>
								<Text style={[s.buttonText]}>Correct</Text>
							</Button>
							<Button
								style={[s.button]}
								danger
								onPress={() => this.answer(this.incorrect)}>
								<Text style={[s.buttonText]}>Incorrect</Text>
							</Button>
						</View>
					) : (
						<Button
							style={[s.button]}
							success
							onPress={() => this.showAnswer(true)}>
							<Text style={[s.buttonText]}>Show Answer</Text>
						</Button>
					)}
				</Footer>
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
	content: {
		display: 'flex',
		alignItems: 'stretch'
	},
	flexCols: {
		display: 'flex',
		flexDirection: 'column'
	},
	flexRows: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	qTitle: {
		flex: 1
	},
	qCount: {
		flex: 1,
		color: c.darkgrey,
		textAlign: 'right'
	},
	card: {
		marginVertical: 20,
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 12,
		borderWidth: 6,
		borderColor: c.white,
		backgroundColor: c.grey
	},
	questionTitle: {
		marginBottom: 10,
		fontSize: 18,
		fontWeight: 'bold',
		color: c.darkgrey,
		textAlign: 'center'
	},
	question: {
		marginBottom: 20,
		color: c.nearblack,
		textAlign: 'center'
	},
	answer: {
		marginBottom: 20,
		textAlign: 'center'
	},
	button: {
		marginHorizontal: 5
	},
	buttonText: {
		width: 150,
		textAlign: 'center'
	},
	footer: {
		height: 65,
		padding: 10,
		backgroundColor: c.grey
	},
	bold: {
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck.title]
	};
}

export default connect(mapStateToProps)(Quiz);
