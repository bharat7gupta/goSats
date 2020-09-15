import React, { Component } from 'react';
import {
	StatusBar,
	StyleSheet,
	ScrollView,
} from 'react-native';

import Home from './components/Home';
import colorConstants from './constants/color';

class App extends Component {
	render(): React.ReactNode {
		return (
			<ScrollView style={styles.root} contentContainerStyle={{flexGrow: 1}}>
				<StatusBar barStyle="dark-content" backgroundColor={colorConstants.PRIMARY_DARK} />
				<Home />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
});

export default App;
