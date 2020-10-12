import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';
import ChevronLeft from './icons/ChevronLeft';

interface BackButtonProps {
	children: JSX.Element;
	style?: ViewStyle;
	onClick?: () => void;
}

function BackButton(props: BackButtonProps) {
	const [ pressed, setPressed ] = useState(false);

	const handlePressIn = () => {
		setPressed(true);
	};

	const handlePressOut = () => {
		setPressed(false);
	};

	const handlePress = () => {
		if (props.onClick) {
			props.onClick();
		}
	};

	return (
		<TouchableWithoutFeedback
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={handlePress}
		>
			<View style={[styles.root, props.style]}>
				<View style={styles.container}>
					<NeomorphFlex
						inner={pressed}
						style={{ ...styleConstants.smallButtonShadowStyles, width: 32, height: 32, borderRadius: 20 }}
						darkShadowColor={colorConstants.SHADOW_DARK}
						lightShadowColor={colorConstants.SHADOW_LIGHT}
					>
						{props.children}
					</NeomorphFlex>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingVertical: 10,
		paddingHorizontal: 4,
	},
	container: {
		flex: 1,
	},
});

export default BackButton;
