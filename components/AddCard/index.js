import React, { Component } from 'react';
import { Keyboard, StyleSheet, Alert } from 'react-native';
import {
	Container,
	Left,
	Right,
	Header,
	Title,
	Subtitle,
	Content,
	Form,
	Item,
	Label,
	Input,
	Icon,
	List,
	ListItem,
	Button,
	Body,
	Text
} from 'native-base';
import { connect } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import cuid from 'cuid';
import { saveCard } from '../../actions/cards';

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
		isCardValid: false
	};

	handleQuestionChangeText(question) {
		const isCardValid =
			this.state.question.length > 0 && this.state.answer.length > 0;
		this.setState({
			question,
			isCardValid
		});
	}

	handleAnswerChangeText(answer) {
		const isCardValid =
			this.state.question.length > 0 && this.state.answer.length > 0;
		this.setState({
			answer,
			isCardValid
		});
	}

	submitCard() {
		const { deck, navigation, saveCard } = this.props;
		const id = cuid();
		const { question, answer, isCardValid } = this.state;
		const card = {
			parentId: deck.id,
			parentTitle: deck.title,
			id,
			question,
			answer
		};

		if (!isCardValid) {
			Alert.alert(
				'Invalid form',
				"Please make sure you've added both a question and an answer",
				[{ text: 'OK' }],
				{
					cancelable: true
				}
			);
		} else {
			saveCard(card);
			navigation.goBack();
		}
	}

	render() {
		const { deck, navigation } = this.props;
		return (
			<Container>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Left>
						<Button transparent onPress={() => navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title style={[s.title]}>Add Card</Title>
						<Subtitle>{deck.title}</Subtitle>
					</Body>
					<Right />
				</Header>
				<Content padder>
					<Form style={[s.form]}>
						<Label>Question</Label>
						<Item style={[s.item]}>
							<Input
								multiline={true}
								onChangeText={this.handleQuestionChangeText.bind(this)}
								value={this.state.question}
							/>
						</Item>
						<Label>Answer</Label>
						<Item style={[s.item]}>
							<Input
								multiline={true}
								onChangeText={this.handleAnswerChangeText.bind(this)}
								value={this.state.answer}
							/>
						</Item>
					</Form>
					<Button block success onPress={this.submitCard.bind(this)}>
						<Text>Save</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	header: {
		paddingTop: 0
	},
	title: {
		width: 200
	},
	form: {
		marginBottom: 20
	},
	multi: {
		height: 50
	},
	item: {
		marginBottom: 20,
		marginLeft: 0
	}
});

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck.title]
	};
}

const mapDispatchToProps = { saveCard };
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
