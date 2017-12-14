import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../../actions/decks';

class Home extends Component {
	componentDidMount() {
		this.props.getDecks();
	}

	render() {
		return (
			<View>
				<Text>HOME</Text>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
					porro quasi, ullam vero! Culpa in, ducimus doloremque nulla voluptatem
					odit sunt modi delectus amet vero molestias, vitae a nam placeat.
				</Text>
			</View>
		);
	}
}

const mapDispatchToProps = { getDecks };
export default connect(null, mapDispatchToProps)(Home);
