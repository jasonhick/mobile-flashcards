import React, { Component } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import {
	Container,
	Header,
	Title,
	Content,
	Form,
	Item,
	Label,
	Input,
	Button,
	Body,
	Text
} from 'native-base';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import cuid from 'cuid';
import DeckLink from '../DeckLink';
import { saveDeck } from '../../actions/decks';

class AddDeck extends Component {
	state = {
		id: '',
		title: '',
		isValid: false
	};

	saveDeck() {
		const { navigation, saveDeck } = this.props;
		const { id, title } = this.state;
		const deck = {
			id: cuid(),
			title
		};

		Keyboard.dismiss();
		saveDeck(deck);
		navigation.navigate('Decks');
	}

	render() {
		return (
			<Container>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Body>
						<Title>Add a New Deck</Title>
					</Body>
				</Header>
				<Content padder>
					<Form style={[s.form]}>
						<Item underline>
							<Label>Deck title</Label>
							<Input
								onChangeText={title => this.setState({ title })}
								value={this.state.title}
							/>
						</Item>
					</Form>
					<Button block success onPress={this.saveDeck.bind(this)}>
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
	form: {
		marginBottom: 20
	}
});

const mapDispatchToProps = { saveDeck };
export default connect(null, mapDispatchToProps)(AddDeck);
