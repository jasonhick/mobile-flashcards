import React, { Component } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
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
		answer: ''
	};

	submitCard() {
		const { deck, navigation, saveCard } = this.props;
		const id = cuid();
		const { question, answer } = this.state;
		const card = {
			parentId: deck.id,
			parentTitle: deck.title,
			id,
			question,
			answer
		};

		saveCard(card);
		navigation.goBack();
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
					<Text>{deck.id}</Text>
					<Form style={[s.form]}>
						<Label>Question</Label>
						<Item style={[s.item]}>
							<Input
								multiline={true}
								onChangeText={question => this.setState({ question })}
								value={this.state.question}
							/>
						</Item>
						<Label>Answer</Label>
						<Item style={[s.item]}>
							<Input
								multiline={true}
								onChangeText={answer => this.setState({ answer })}
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
