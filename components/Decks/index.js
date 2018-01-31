import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { getAllDecks } from '../../actions/decks';
import s from '../../utils/styles';

class Decks extends Component {
	componentDidMount() {
		this.props.getAllDecks();
	}

	render() {
		const { decks, navigation } = this.props;
		return (
			<Container style={[s.flex, s.bgBlack]}>
				<Header iosBarStyle="light-content" style={[s.bgBlack]}>
					<Body>
						<Title style={[s.white]}>Mobile Flashcards</Title>
					</Body>
				</Header>
				<Content padder>
					<FlatList
						data={decks}
						keyExtractor={item => item.id}
						numColumns={3}
						renderItem={({ item }) => (
							<DeckLink deck={item} navigation={navigation} />
						)}
					/>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	decks: Object.keys(state.decks).map(deck => state.decks[deck])
});

const mapDispatchToProps = { getAllDecks };
export default connect(mapStateToProps, mapDispatchToProps)(Decks);
