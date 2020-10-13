import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as UtilityHelper from '../../../helpers/UtilityHelper';

import Confetti from './Confetti';
import Svg, { Path } from 'react-native-svg';

interface ConfettiData {
	key: number;
	content: JSX.Element;
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

function Tilde({ color }) {
	const size = UtilityHelper.randomIntValue(6, 15);

	return (
		<Svg width={size} height={size + 1}>
			<Path
				d="M0.409792 11.1844C4.83615 11.3492 5.71336 6.55381 9.98848 6.2407C10.2506 6.22422 9.83723 0.481277 9.98848 0.473038C5.71336 0.786139 4.83615 5.58154 0.409792 5.41675C0.460206 5.41675 0.248466 11.1762 0.409792 11.1844Z"
				fill={color}
			/>
		</Svg>
	);
}

function Triangle({ color }) {
	const size = UtilityHelper.randomIntValue(5, 15);

	return (
		<Svg width={size} height={size} viewBox="0 0 7 7" fill="none">
			<Path d="M1.17445 0.0619888L6.38644 4.2174L0.126648 6.59192L1.17445 0.0619888Z" fill={color} />
		</Svg>
	);
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
					confettis.push({
						key: this.confettiIndex,
						content: this.getConfettiElement()
					});

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

	randomColor = () => {
		const { colors } = this.props;
		return colors[UtilityHelper.randomIntValue(0, colors.length)];
	}

	getConfettiElement = () => {
		const random = UtilityHelper.randomIntValue(0, 2);
		const color = this.randomColor();

		return (
			random === 1 ? <Triangle color={color} /> : <Tilde color={color} />
		);
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
							content={confetti.content}
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
