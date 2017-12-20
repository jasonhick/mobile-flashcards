import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { styles as s } from 'react-native-style-tachyons';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { getDecks } from '../../actions/decks';

class Home extends Component {
	componentDidMount() {
		this.props.getDecks();
	}

	render() {
		const { decks } = this.props;
		return (
			<View>
				<FlatList
					data={this.props.decks}
					keyExtractor={item => item.title}
					renderItem={({ item }) => (
						<View
							style={[
								s.bg_gold,
								s.pa3,
								s.ma1,
								{
									display: 'flex',
									flexDirection: 'row'
								}
							]}>
							<Text style={[s.ba, s.f3, { flex: 3 }]}>{item.title}</Text>
							<Text style={[s.ba, s.f3, s.b, s.tr, { width: 50 }]}>
								{item.questions.length}
							</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	decks: Object.keys(state.decks).map(deck => state.decks[deck])
});

const mapDispatchToProps = { getDecks };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
