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
		const { title } = navigation.state.params;
		return (
			<Container>
				<Header iosBarStyle="light-content" style={[s.header]}>
					<Left>
						<Button transparent onPress={() => navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title style={[s.title]}>{title}</Title>
						<Subtitle style={[s.subtitle]}>
							{deck.questions.length} questions
						</Subtitle>
					</Body>
					<Right />
				</Header>
				<Content padder>
					<Button
						block
						rounded
						bordered
						dark
						style={[s.button]}
						onPress={() =>
							navigation.navigate('AddCard', {
								title: 'Add a new card',
								deck: title
							})
						}>
						<Text>Add a {title} question</Text>
					</Button>

					<Button block rounded dark style={[s.button]}>
						<Text>Start quiz</Text>
					</Button>

					<FlatList
						style={[s.list]}
						data={deck.questions}
						keyExtractor={(item, index) => index}
						renderItem={({ item }) => (
							<CardLink deck={deck} card={item} navigation={navigation} />
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
	},
	subtitle: {
		color: c.white
	},
	button: {
		marginVertical: 5
	},
	list: {
		marginVertical: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: c.midgrey,
		backgroundColor: c.white
	}
});

function mapStateToProps(state, { navigation }) {
	const { title } = navigation.state.params;
	return {
		deck: state.decks[title]
	};
}

export default connect(mapStateToProps)(Deck);
