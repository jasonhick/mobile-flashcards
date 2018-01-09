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
						<Title>{title}</Title>
						<Subtitle>{deck.questions.length} Questions</Subtitle>
					</Body>
					<Right />
				</Header>
				<Content padder>
					<FlatList
						data={deck.questions}
						keyExtractor={item => item.question}
						renderItem={({ item }) => <Text>{item.question}</Text>}
     />
					<Button block rounded bordered dark style={[s.button]}>
						<Text>Add question</Text>
					</Button>
					<Button block rounded dark style={[s.button]}>
						<Text>Start quiz</Text>
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
	button: {
		marginVertical: 10
	}
});

function mapStateToProps(state, { navigation }) {
	const { title } = navigation.state.params;
	return {
		deck: state.decks[title]
	};
}

export default connect(mapStateToProps)(Deck);
