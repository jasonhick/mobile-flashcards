import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
	Container,
	Left,
	Right,
	Header,
	Title,
	Subtitle,
	Content,
	Icon,
	List,
	ListItem,
	Label,
	Button,
	Body,
	Text
} from 'native-base';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as c from '../../utils/colors';
import CardLink from '../CardLink';

class Deck extends Component {
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
						<Title style={[s.title]}>{deck.title}</Title>
						<Subtitle style={[s.subtitle]}>
							{deck.questions.length} questions
						</Subtitle>
					</Body>
					<Right />
				</Header>
				<Content padder>
					<Button
						block
						dark
						bordered
						style={[s.button]}
						onPress={() =>
							navigation.navigate('AddCard', {
								title: 'Add a new card',
								deck
							})
						}>
						<Text>Add Card</Text>
					</Button>

					{deck.questions.length > 0 ? (
						<Content>
							<Button
								block
								dark
								bordered
								style={[s.button]}
								onPress={() => navigation.navigate('Quiz', { deck })}>
								<Text>Start Quiz</Text>
							</Button>

							<FlatList
								style={[s.list]}
								data={deck.questions}
								keyExtractor={item => item.id}
								renderItem={({ item }) => (
									<CardLink deck={deck} card={item} navigation={navigation} />
								)}
							/>
						</Content>
					) : (
						<Content>
							<Text style={[s.text]}>
								You don't have any cards in this deck.
							</Text>
							<Text style={[s.text]}>
								Add at least 1 card to enable the quiz.
							</Text>
						</Content>
					)}
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
	},
	subtitle: {
		color: c.white
	},
	button: {
		marginVertical: 5,
		backgroundColor: c.gold
	},
	list: {
		marginVertical: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: c.midgrey,
		backgroundColor: c.white
	},
	text: {
		marginVertical: 10,
		marginHorizontal: 100,
		textAlign: 'center'
	}
});

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck.title]
	};
}

export default connect(mapStateToProps)(Deck);
