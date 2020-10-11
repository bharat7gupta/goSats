import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
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

	const handleTouchStart = () => {
		setPressed(true);
	};

	const handleTouchEnd = () => {
		setPressed(false);

		if (props.onClick) {
			props.onClick();
		}
	};

	const handleTouchCancel = () => {
		setPressed(false);
	};

	const buttonContentStyle = {
		...styleConstants.shadowStyles,
		...props.containerStyle,
	};

	return (
		<View style={[styles.root, props.style]}>
			<View
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				onTouchCancel={handleTouchCancel}
			>
				<NeomorphFlex
					inner={pressed}
					style={buttonContentStyle}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					{props.children}
				</NeomorphFlex>
			</View>
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
