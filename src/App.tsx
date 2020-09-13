import React, { Component } from 'react';
import {
	StatusBar,
	View,
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { Shadow, Neomorph, NeomorphFlex } from 'react-native-neomorph-shadows';

import colorConstants from './constants/color';
import NeuButton from './components/common/NeoButton';
import NeoButton from './components/common/NeoButton';
import ShoppingBag from './components/common/icons/ShoppingBag';
import Star from './components/common/icons/Star';

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	content: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 20,
	},
	buttonStyle: {
		flexBasis: '50%',
	},
});

class App extends Component {
	render(): React.ReactNode {
		return (
			<ScrollView style={styles.root}>
				<StatusBar barStyle="dark-content" backgroundColor={colorConstants.PRIMARY_DARK} />

				<View style={styles.content}>
					<NeoButton style={styles.buttonStyle} text="Categories" icon={<ShoppingBag />} />
					<NeoButton style={styles.buttonStyle} text="Favourites" icon={<Star />} />
				</View>
			</ScrollView>
		);
	}
}

export default App;
