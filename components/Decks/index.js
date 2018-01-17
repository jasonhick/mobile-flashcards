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

	handleOnRefreshData = () => {
		this.props.getAllDecks();
	};

	render() {
		const { decks, navigation } = this.props;
		return (
			<Container>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Body>
						<Title style={[s.title]}>Mobile Flashcards</Title>
					</Body>
				</Header>
				<Content>
					<FlatList
						data={decks}
						keyExtractor={(item, index) => index}
						renderItem={({ item }) => (
							<DeckLink key={item.title} deck={item} navigation={navigation} />
						)}
					/>
				</Content>
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
	}
});

const mapStateToProps = state => ({
	decks: Object.keys(state.decks).map(deck => state.decks[deck])
});

const mapDispatchToProps = { getAllDecks };
export default connect(mapStateToProps, mapDispatchToProps)(Decks);
