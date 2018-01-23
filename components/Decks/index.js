import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
	Left,
	Body,
	Right,
	Text
} from 'native-base';
import { connect } from 'react-redux';
import DeckLink from '../DeckLink';
import { Constants } from 'expo';
import * as c from '../../utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { getAllDecks } from '../../actions/decks';

class Decks extends Component {
	componentDidMount() {
		this.props.getAllDecks();
	}

	render() {
		const { decks, navigation } = this.props;
		return (
			<Container style={[s.container]}>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Body>
						<Title style={[s.title]}>Mobile Flashcards</Title>
					</Body>
				</Header>
				<Content contentContainerStyle={[s.content]}>
					<FlatList
						data={decks}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<DeckLink deck={item} navigation={navigation} />
						)}
					/>
				</Content>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	container: {
		borderStyle: 'solid',
		borderWidth: 1
	},
	header: {
		backgroundColor: c.black
	},
	content: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center'
	},
	title: {
		color: c.white
	}
});

const mapStateToProps = state => ({
	decks: Object.keys(state.decks).map(deck => state.decks[deck])
});

const mapDispatchToProps = { getAllDecks };
export default connect(mapStateToProps, mapDispatchToProps)(Decks);
