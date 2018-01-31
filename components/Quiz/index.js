import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
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
import s from '../../utils/styles';

class Quiz extends Component {
	state = {
		counter: 0,
		score: 0,
		showAnswerButtons: false,
		complete: false
	};

	componentWillMount() {
		this.animatedValue = new Animated.Value(0);
		this.value = 0;

		this.animatedValue.addListener(({ value }) => {
			this.value = value;
		});

		this.backOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [0, 1]
		});

		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg']
		});

		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg']
		});
	}

	componentWillUnmount() {
		this.animatedValue.removeAllListeners();
	}

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

			// reset the counter
			this.setState({
				counter: 0
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

		// answer correct/incorrect
		which();

		// hide the correct/incorrect buttons
		this.showAnswerButtons(false);

		if (complete) {
			this.setState({
				complete
			});
		}
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

	showAnswerButtons = which => {
		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue: 0,
				duration: 800
			}).start();
		} else {
			Animated.spring(this.animatedValue, {
				toValue: 180,
				duration: 800
			}).start();
		}

		this.setState({
			showAnswerButtons: which
		});
	};

	render() {
		const { deck, navigation } = this.props;
		const { counter, score, complete, showAnswerButtons } = this.state;

		const frontAnimatedStyle = {
			transform: [{ rotateY: this.frontInterpolate }]
		};
		const backAnimatedStyle = {
			opacity: this.backOpacity,
			transform: [{ rotateY: this.backInterpolate }]
		};

		return (
			<Container style={[s.flex, s.bgBlack]}>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Left>
						<Button transparent onPress={() => navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title style={[s.white]}>{deck.title}</Title>
						<Subtitle>
							{counter + 1} of {deck.questions.length}
						</Subtitle>
					</Body>
					<Right />
				</Header>

				<Content padder contentContainerStyle={[s.flex, s.fJCC, s.fAIC]}>
					{!complete && (
						<View style={([s.flex], { flex: 3 })}>
							<Animated.View style={[s.flipCard, frontAnimatedStyle]}>
								<Text style={[s.cardTitle]}>Q</Text>
								<Text style={[s.cardText]}>
									{deck.questions[counter].question}
								</Text>
								<Text style={[s.cardTitle, s.flexEnd]}>Q</Text>
							</Animated.View>

							<Animated.View
								style={[s.flipCard, backAnimatedStyle, s.flipCardBack]}>
								<Text style={[s.cardTitle]}>A</Text>
								<Text style={[s.cardText]}>
									{deck.questions[counter].answer}
								</Text>
								<Text style={[s.cardTitle, s.flexEnd]}>A</Text>
							</Animated.View>
						</View>
					)}

					{showAnswerButtons ? (
						<View style={[s.flexRow, s.fJCC]}>
							<Button
								style={[s.mhs]}
								success
								block
								onPress={() => this.answer(this.correct)}>
								<Text>Correct</Text>
							</Button>
							<Button
								style={[s.mhs]}
								danger
								block
								onPress={() => this.answer(this.incorrect)}>
								<Text>Incorrect</Text>
							</Button>
						</View>
					) : (
						<View style={[s.flexRow, s.fJCC]}>
							<Button success onPress={() => this.showAnswerButtons(true)}>
								<Text>Show Answer</Text>
							</Button>
						</View>
					)}
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck.title]
	};
}

export default connect(mapStateToProps)(Quiz);
