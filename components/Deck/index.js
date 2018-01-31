import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
	Text,
	H1,
	H2,
	H3
} from 'native-base';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import CardLink from '../CardLink';
import s from '../../utils/styles';

class Deck extends Component {
	render() {
		const { deck, navigation } = this.props;
		return (
			<Container style={[s.flex, s.bgBlack]}>
				<Header iosBarStyle="light-content" style={[s.bgBlack]}>
					<Left>
						<Button transparent onPress={() => navigation.navigate('Decks')}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title style={[s.white]}>{deck.title}</Title>
						<Subtitle style={[s.white]}>
							{deck.questions.length} questions
						</Subtitle>
					</Body>
					<Right />
				</Header>
				<Content contentContainerStyle={[s.flex]} padder>
					{deck.questions.length > 0 ? (
						<View style={[s.flex]}>
							<Button
								block
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
						</View>
					) : (
						<View style={[s.flex, s.fJCC, s.fAIC]}>
							<H3 style={[s.mhl, s.white, s.tc]}>
								You don't have any cards in this deck yet. Add at least 1 card
								to enable the quiz.
							</H3>
						</View>
					)}

					<View>
						<Button
							block
							onPress={() =>
								navigation.navigate('AddCard', {
									title: 'Add a new card',
									deck
								})
							}>
							<Text>Add Card</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state, { navigation }) {
	const { deck } = navigation.state.params;
	return {
		deck: state.decks[deck.title]
	};
}

export default connect(mapStateToProps)(Deck);
