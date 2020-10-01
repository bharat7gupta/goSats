import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Loader from './icons/Loader';
import colorConstants from '../../constants/color';

interface PageLoaderProps {
	showLoader: boolean;
}

export default function PageLoader(props: PageLoaderProps) {
	const spinValue = new Animated.Value(0);

	useEffect(() => {
		if (props.showLoader) {
			Animated.timing(
				spinValue,
				{
					toValue: 1,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: true,
				},
			).start();
		}
	}, [props.showLoader]);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	if (!props.showLoader) {
		return null;
	}

	return (
		<View style={styles.root}>
			<Animated.View style={{ transform: [{rotate: spin}] }}>
				<Loader />
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		backgroundColor: colorConstants.OVERLAY,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
