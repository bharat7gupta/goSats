import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Confetti from './Confetti';

interface ConfettiData {
	key: number;
}

interface IConfettiViewProps {
	colors: string[];
	confettiCount: number;
	timeout: number;
	untilStopped: boolean;
}

interface IConfettiViewState {
	confettis: ConfettiData[];
	onComplete?: () => void;
}

class ConfettiView extends Component<IConfettiViewProps, IConfettiViewState> {
	static defaultProps = {
		confettiCount: 100,
		timeout: 30,
		untilStopped: false,
	};

	confettiIndex: number;
	shouldStop: boolean;

	constructor(props: IConfettiViewProps) {
		super(props);
		this.state = { confettis: [] };
		this.confettiIndex = 0;
		this.shouldStop = false;
	}

	startConfetti = (onComplete?: () => void) => {
		const { confettis } = this.state;
		const { confettiCount, timeout, untilStopped } = this.props;
		this.shouldStop = false;
		if (untilStopped || this.confettiIndex < confettiCount) {
			setTimeout(() => {
				if (this.shouldStop) {
					return;
				} else {
					confettis.push({ key: this.confettiIndex });
					this.confettiIndex++;

					if (onComplete) {
						this.setState({ onComplete });
					}

					this.setState({ confettis });
					this.startConfetti();
				}
			}, timeout);
		}
	}

	removeConfetti = (key) => {
		const { confettis, onComplete } = this.state;
		const { confettiCount } = this.props;
		const index = confettis.findIndex((confetti: ConfettiData) => confetti.key === key );

		confettis.splice(index, 1);

		this.setState({ confettis });

		if (key === confettiCount - 1) {
			this.confettiIndex = 0;
		}

		if (confettis.length === 0 && onComplete && typeof onComplete === 'function') {
			onComplete();
		}
	}

	stopConfetti = () => {
		this.shouldStop = true;
		this.confettiIndex = 0;
		const { onComplete } = this.state;
		if (onComplete && typeof onComplete === 'function') {
			onComplete();
		}
		this.setState({ confettis: [], onComplete: null });
	}

	render(): React.ReactNode {
		const { confettis } = this.state;
		const { ...otherProps } = this.props;
		return (
			<View style={styles.container}>
				{confettis.map((confetti: ConfettiData) => {
					return (
						<Confetti
							key={confetti.key}
							index={confetti.key}
							onAnimationComplete={this.removeConfetti.bind(this, confetti.key)}
							colors={this.props.colors} {...otherProps}
						/>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
});

export default ConfettiView;
