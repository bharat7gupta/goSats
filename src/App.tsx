import React, { Component } from 'react';
import {
	StatusBar,
	View,
	Text,
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

	getMessages = () => {
		return [
			'20% satsback will be added to your wallet.',
			'keep shopping & win more sats.',
		];
	}

	render(): React.ReactNode {
		const { isVisible } = this.state;

		return (
			<View>
				<StatusBar barStyle="dark-content" />
				<Button
					onClick={this.onButtonPress}
					content={'Click!'}
				/>

				<Reward
					isVisible={isVisible}
					messages={this.getMessages()}
					onContinue={this.onContinue}
					winAmount={20000}
					currency={'sats'}
				/>
			</View>
		);
	}
}

export default App;
