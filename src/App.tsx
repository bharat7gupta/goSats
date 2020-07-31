import React, { Component } from 'react';
import {
	StatusBar,
	View,
} from 'react-native';

import Button from './components/common/Button';
import Reward from './components/Reward';

interface AppState {
	isVisible: boolean;
}

class App extends Component<{}, AppState> {

	state = {
		isVisible: false,
	};

	onButtonPress = () => {
		this.setState({ isVisible: true });
	}

	onContinue = () => {
		this.setState({ isVisible: false });
	}

	render(): React.ReactNode {
		const { isVisible } = this.state;

		return (
			<View style={{ fontFamily: 'Roboto' }}>
				<StatusBar barStyle="dark-content" />
				<Button
					onClick={this.onButtonPress}
					content={'Click!'}
				/>

				<Reward
					isVisible={isVisible}
					onContinue={this.onContinue}
				/>
			</View>
		);
	}
}

export default App;
