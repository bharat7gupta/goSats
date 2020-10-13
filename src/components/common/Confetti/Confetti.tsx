import React, { Component } from 'react';
import { StyleSheet, Animated, Dimensions, Easing, Text } from 'react-native';
import * as UtilityHelper from '../../../helpers/UtilityHelper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface IConfettiProps {
	colors: string[];
	duration: number; // time in ms
	index: number;
	content: JSX.Element;
	onAnimationComplete: () => void;
	left?: number;
}

class Confetti extends Component<IConfettiProps> {
	public static defaultProps = {
		duration: 6000,
		colors: [
			'rgb(242.2, 102, 68.8)',
			'rgb(255, 198.9, 91.8)',
			'rgb(122.4, 198.9, 163.2)',
			'rgb(76.5, 193.8, 216.7)',
			'rgb(147.9, 99.4, 140.2)',
		],
	};

	left: number;
	xAnimation;
	yAnimation;
	xRotateAnimation;
	yRotateAnimation;

	constructor(props: IConfettiProps) {
		super(props);
		this.left = UtilityHelper.randomValue(0, windowWidth);

		this.yAnimation = new Animated.Value(0);
		const xRotationOutput = UtilityHelper.randomValue(-120, 120) + 'deg';
		const yRotationOutput = UtilityHelper.randomValue(-220, 220) + 'deg';

		this.yRotateAnimation = this.yAnimation.interpolate({
			inputRange: [0, windowHeight / 2, windowHeight],
			outputRange: ['0deg', yRotationOutput, yRotationOutput],
		});

		// maximum allowed distance along x axis - one third of screen width
		const xMoveAllowed = windowWidth / 3;
		const xDistance = UtilityHelper.randomIntValue(xMoveAllowed * -1, xMoveAllowed);

		this.xAnimation = this.yAnimation.interpolate({
			inputRange: [0, windowHeight],
			outputRange: [0, xDistance],
		});

		this.xRotateAnimation = this.yAnimation.interpolate({
			inputRange: [0, windowWidth / 2, windowWidth],
			outputRange: ['0deg', xRotationOutput, xRotationOutput],
		});
	}

	componentDidMount(): void {
		const { duration } = this.props;
		Animated.timing(this.yAnimation, {
			duration: duration + UtilityHelper.randomIntValue(duration * .2, duration * -.2),
			toValue: windowHeight + 1.25,
			useNativeDriver: true,
		}).start(this.props.onAnimationComplete);
	}

	getTransformStyle = () => {
		return {
			transform: [
				{ translateX: this.xAnimation },
				{ translateY: this.yAnimation },
				{ rotateX: this.xRotateAnimation },
				{ rotateY: this.yRotateAnimation },
			],
		};
	}

	render(): React.ReactNode {
		const { left, content, ...otherProps } = this.props;

		return (
			<Animated.View
				style={[
					styles.confetti,
					this.getTransformStyle(),
					{ marginLeft: this.left },
				]}
				{...otherProps}
			>
				{content}
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	confetti: {
		position: 'absolute',
		marginTop: 0,
	},
});

export default Confetti;
