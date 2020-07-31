import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View, Text, Image } from 'react-native';
import Button from './common/Button';

import styles from './Reward.style';

interface IRewardProps {
	isVisible: boolean;
	onContinue: () => void;
}

export default class Reward extends Component<IRewardProps> {

	render(): React.ReactNode {
		const { isVisible, onContinue } = this.props;

		return (
			<Modal
				isVisible={isVisible}
				coverScreen={true}
			>
				<View style={styles.contentStyle}>
					<Text style={styles.heading}>You won!</Text>

					<View style={styles.medalLogoContainer}>
						<Image
							style={styles.medalLogo}
							source={require('../assets/images/medal.png')}
						/>
					</View>

					<Text style={styles.win}>20,000 sats</Text>
					<Text style={styles.message}>Keep shopping &amp; win more bitcoin.</Text>

					<Button
						onClick={onContinue}
						content="Continue"
						btnStyle={styles.continueButtonStyle}
					/>
				</View>
			</Modal>
		);
	}
}
