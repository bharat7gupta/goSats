import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import colorConstants from '../../constants/color';
import { NeomorphFlex } from 'react-native-neomorph-shadows';

interface NeoButtonProps {
	text: string;
	icon?: JSX.Element;
	style?: ViewStyle;
	buttonContentStyle?: ViewStyle;
	buttonTextStyle?: ViewStyle;
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

	const buttonContentStyle = {
		...styles.shadow,
		...props.buttonContentStyle,
	};

	const buttonTextStyle = {
		...props.buttonTextStyle,
		...styles.buttonTextStyle,
		color: pressed ? colorConstants.LIGHT_GREY : colorConstants.FONT_COLOR,
	};

	return (
		<View style={[styles.root, props.style]}>
			<View
				style={styles.container}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<NeomorphFlex
					inner={pressed}
					style={buttonContentStyle}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					{props.icon}
					<Text style={buttonTextStyle}>{props.text}</Text>
				</NeomorphFlex>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		padding: 10,
		flexDirection: 'row',
		flex: 1,
	},
	container: {
		flex: 1,
	},
	shadow: {
		shadowRadius: 6,
		borderRadius: 10,
		backgroundColor: colorConstants.PRIMARY,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonTextStyle: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		lineHeight: 18,
		marginLeft: 10,
		paddingTop: 4,
	},
});

export default NeoButton;
