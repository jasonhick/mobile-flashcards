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
import * as c from '../../utils/colors';

class Quiz extends Component {
	state = {
		counter: 0,
		score: 0,
		showAnswer: false
	};

	componentWillMount() {
		this.animatedValue = new Animated.Value(0);
		this.value = 0;

		this.animatedValue.addListener(({ value }) => {
			this.value = value;
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
		// answer correct/incorrect
		which();
		// hide the correct/incorrect buttons
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
			showAnswer: which
		});
	};

	render() {
		const { deck, navigation } = this.props;
		const { counter, score, showAnswer } = this.state;

		const frontAnimatedStyle = {
			transform: [{ rotateY: this.frontInterpolate }]
		};
		const backAnimatedStyle = {
			transform: [{ rotateY: this.backInterpolate }]
		};

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
						<Subtitle>{deck.title}</Subtitle>
					</Body>
					<Right />
				</Header>

				<Content style={[s.content]}>
					<Text style={[s.count]}>
						{counter + 1} of {deck.questions.length}
					</Text>

					<View style={[s.container]}>
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
							<Text style={[s.cardText]}>{deck.questions[counter].answer}</Text>
							<Text style={[s.cardTitle, s.flexEnd]}>A</Text>
						</Animated.View>
					</View>
				</Content>

				<Footer style={[s.footer]}>
					{showAnswer ? (
						<View style={[s.container, s.rows]}>
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
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	rows: {
		flexDirection: 'row'
	},
	flipCard: {
		justifyContent: 'space-between',
		width: 260,
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
	header: {
		backgroundColor: c.black
	},
	title: {
		color: c.white
	},
	count: {
		marginVertical: 30,
		color: c.white,
		textAlign: 'center'
	},
	content: {
		backgroundColor: c.black
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
		backgroundColor: c.black
	},
	flexEnd: {
		alignSelf: 'flex-end',
		transform: [{ rotateX: '180deg' }, { rotateY: '180deg' }]
	}
});

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck.title]
	};
}

export default connect(mapStateToProps)(Quiz);
