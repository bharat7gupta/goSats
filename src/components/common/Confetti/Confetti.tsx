import React, { Component } from 'react';
import { StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface IConfettiProps {
	colors: string[];
	duration: number; // time in ms
	index: number;
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

	color: string;
	left: number;
	xAnimation;
	yAnimation;
	xRotateAnimation;
	yRotateAnimation;

	constructor(props: IConfettiProps) {
		super(props);
		this.color = this.randomColor(this.props.colors);
		this.left = this.randomValue(0, windowWidth);

		this.yAnimation = new Animated.Value(0);
		const xRotationOutput = this.randomValue(-120, 120) + 'deg';
		const yRotationOutput = this.randomValue(-220, 220) + 'deg';

		this.yRotateAnimation = this.yAnimation.interpolate({
			inputRange: [0, windowHeight / 2, windowHeight],
			outputRange: ['0deg', yRotationOutput, yRotationOutput],
		});

		// maximum allowed distance along x axis - one third of screen width
		const xMoveAllowed = windowWidth / 3;
		const xDistance = this.randomIntValue(xMoveAllowed * -1, xMoveAllowed);

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
			duration: duration + this.randomIntValue(duration * .2, duration * -.2),
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

	randomValue = (min: number, max: number): number  => {
		return Math.random() * (max - min) + min;
	}

	randomIntValue = (min: number, max: number) => {
		return Math.floor(this.randomValue(min, max));
	}

	randomColor = (colors: string[]) => {
		return colors[this.randomIntValue(0, colors.length)];
	}

	render(): React.ReactNode {
		const { left, ...otherProps } = this.props;

		return (
			<Animated.View
				style={[
					styles.confetti,
					this.getTransformStyle(),
					{ marginLeft: this.left },
				]}
				{...otherProps}
			>
				<Svg width={11} height={12}>
					<Path
						d="M0.409792 11.1844C4.83615 11.3492 5.71336 6.55381 9.98848 6.2407C10.2506 6.22422 9.83723 0.481277 9.98848 0.473038C5.71336 0.786139 4.83615 5.58154 0.409792 5.41675C0.460206 5.41675 0.248466 11.1762 0.409792 11.1844Z"
						fill={this.color}
					/>
				</Svg>
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
