import React, { Component } from 'react';
import { Keyboard, StyleSheet, Alert } from 'react-native';
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

	handleOnChangeText(title) {
		const isValid = title || false;
		this.setState({
			title,
			isValid
		});
	}

	btnSaveDeck() {
		const { navigation, saveDeck } = this.props;
		const { id, title, isValid } = this.state;
		const deck = {
			id: cuid(),
			title,
			questions: []
		};

		if (!isValid) {
			Alert.alert(
				'Invalid form',
				'Please enter a deck title',
				[{ text: 'OK' }],
				{
					cancelable: true
				}
			);
		} else {
			Keyboard.dismiss();
			saveDeck(deck);

			// Add a slight delay before navigating as the item may not have been created yet
			setTimeout(function() {
				navigation.navigate('Deck', { deck });
			}, 200);
		}
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
								onChangeText={this.handleOnChangeText.bind(this)}
								value={this.state.title}
							/>
						</Item>
					</Form>
					<Button block success onPress={this.btnSaveDeck.bind(this)}>
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
