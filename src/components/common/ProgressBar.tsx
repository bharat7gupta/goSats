import React, { useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';
import LinearGradient from 'react-native-linear-gradient';

interface ProgressBarProps {
	minValue: number;
	maxValue: number;
	currValue: number;
	gradientColors: string[];
}

const PROGRESS_BAR_WIDTH_ADJUST = 5;
const PROGRESS_BAR_HEIGHT_ADJUST = 3;

export default function ProgressBar(props: ProgressBarProps) {
	const slideValue = new Animated.Value(0);
	const [ progressBarWidth, setProgressBarWidth ] = useState(null);

	const handleLayoutDone = (event) => {
		if (progressBarWidth) {
			return;
		}

		const { width } = event.nativeEvent.layout;
		const calculatedProgressBarWidth = width - (2 * styles.progressBar.left);
		setProgressBarWidth(calculatedProgressBarWidth);
	};

	const { minValue, maxValue, currValue } = props;
	const userValueRange = currValue - minValue;
	const levelValueRange = maxValue - minValue;
	const finalWidth = Math.min(
		((userValueRange / levelValueRange) * progressBarWidth) + PROGRESS_BAR_WIDTH_ADJUST,
		progressBarWidth,
	);

	Animated.timing(
		slideValue,
		{
			toValue: finalWidth,
			duration: 400,
			easing: Easing.linear,
			useNativeDriver: false,
		},
	).start();
	let finalHeight = styles.progressBar.height;
	let finalTop = styles.progressBar.top;

	if (userValueRange < 10) {
		finalHeight = styles.progressBar.height - PROGRESS_BAR_HEIGHT_ADJUST;
		finalTop = styles.progressBar.top + (PROGRESS_BAR_HEIGHT_ADJUST / 2);
	}

	const animatedStyle = { width: slideValue, height: finalHeight, top: finalTop };

	return (
		<NeomorphFlex
			inner={true}
			style={{
				...styleConstants.smallButtonShadowStyles,
				...styles.progressBarContainer,
			}}
			darkShadowColor={colorConstants.SHADOW_DARK}
			lightShadowColor={colorConstants.SHADOW_LIGHT}
			onLayout={handleLayoutDone}
		>
			<Animated.View style={[ styles.progressBar, animatedStyle ]}>
				<LinearGradient
					colors={props.gradientColors}
					locations={[ 0, 0.9 ]}
					style={{ flexGrow: 1 }}
				/>
			</Animated.View>
		</NeomorphFlex>
	);
}

const styles = StyleSheet.create({
	progressBarContainer: {
		position: 'relative',
		width: '100%',
		height: 26,
		borderRadius: 20,
	},
	progressBar: {
		position: 'absolute',
		top: 3,
		left: 4,
		height: 20,
		borderRadius: 10,
		overflow: 'hidden',
	},
});
