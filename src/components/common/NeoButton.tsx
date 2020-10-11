import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';

interface NeoButtonProps {
	children?: JSX.Element;
	style?: ViewStyle;
	containerStyle?: ViewStyle; // can set width and height in this prop
	onClick?: () => void;
}

function NeoButton(props: NeoButtonProps) {
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

	const buttonContentStyle = {
		...styleConstants.shadowStyles,
		...props.containerStyle,
	};

	return (
		<View style={[styles.root, props.style]}>
			<TouchableWithoutFeedback
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onPress={handlePress}
			>
				<NeomorphFlex
					inner={pressed}
					style={buttonContentStyle}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					{props.children}
				</NeomorphFlex>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		padding: 10,
		flexDirection: 'row',
	},
});

export default NeoButton;
