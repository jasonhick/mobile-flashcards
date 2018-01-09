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
	Body,
	Text
} from 'native-base';
import { connect } from 'react-redux';
import DeckLink from '../DeckLink';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { getAllDecks } from '../../actions/decks';

class Decks extends Component {
	componentDidMount() {
		this.props.getAllDecks();
	}

	render() {
		const { decks, navigation } = this.props;
		return (
			<Container>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Body>
						<Title>Mobile Flashcards</Title>
					</Body>
				</Header>
				<Content padder>
					<FlatList
						data={decks}
						keyExtractor={item => item.title}
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
	header: {
		paddingTop: 0
	}
});

const mapStateToProps = state => ({
	decks: Object.keys(state.decks).map(deck => state.decks[deck])
});

const mapDispatchToProps = { getAllDecks };
export default connect(mapStateToProps, mapDispatchToProps)(Decks);
