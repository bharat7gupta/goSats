import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View, Text, Image } from 'react-native';
import Button from './common/Button';

import styles from './Reward.style';

interface IRewardProps {
	isVisible: boolean;
	messages: string[];
	winAmount: number;
	currency: string;
	onContinue: () => void;
}

export default class Reward extends Component<IRewardProps> {

	getWinAmount = () => {
		const { winAmount, currency } = this.props;

		if (winAmount && winAmount > 0) {
			const formattedWinAmount = winAmount.toLocaleString();
			return (
				<View style={styles.winAmount}>
					<Text style={styles.win}>{formattedWinAmount}</Text>
					<Text style={styles.currency}>{currency}</Text>
				</View>
			);
		}

		return null;
	}

	render(): React.ReactNode {
		const { isVisible, messages, winAmount, onContinue } = this.props;

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

					{this.getWinAmount()}

					<Text style={styles.message}>{messages.join('\n')}</Text>

					<Button
						onClick={onContinue}
						content="Continue"
						btnContainerStyle={styles.continueButtonContainerStyle}
						btnStyle={styles.continueButtonStyle}
					/>
				</View>
			</Modal>
		);
	}
}
