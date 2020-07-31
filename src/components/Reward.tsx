import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View, Text, Image } from 'react-native';
import Confetti from 'react-native-confetti';
import Button from './common/Button';

import styles from './Reward.style';

interface IRewardProps {
	messages: string[];
	winAmount: number;
	currency: string;
	onContinue: () => void;
}

export default class Reward extends Component<IRewardProps> {
	private _confettiView: any;

	componentDidMount(): void {
		if (this._confettiView) {
		   this._confettiView.startConfetti();
		}
	}

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

	onContinue = () => {
		this._confettiView.stopConfetti();
		this.props.onContinue();
	}

	render(): React.ReactNode {
		const { messages } = this.props;

		return (
			<Modal
				isVisible={true}
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
						onClick={this.onContinue}
						content="Continue"
						btnContainerStyle={styles.continueButtonContainerStyle}
						btnStyle={styles.continueButtonStyle}
					/>

					<View style={styles.confettiContainer}>
						<Confetti
							ref={node => this._confettiView = node}
							colors={['#ED302F', '#5475B9', '#FFD330']}
							confettiCount={300}
							timeout={0}
							bsize={0.1}
						/>
					</View>
				</View>
			</Modal>
		);
	}
}
