import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';

interface NeoButtonProps {
	text?: string;
	icon?: JSX.Element;
	style?: ViewStyle;
	buttonContentStyle?: ViewStyle; // can set width and height in this prop
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

	const handleTouchCancel = () => {
		setPressed(false);
	};

	const buttonContentStyle = {
		...styleConstants.shadowStyles,
		...props.buttonContentStyle,
	};

	const buttonTextStyle = {
		...props.buttonTextStyle,
		...styles.buttonTextStyle,
		color: pressed ? colorConstants.WARM_GREY : colorConstants.FONT_COLOR,
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
					{props.icon && (
						<View style={{ marginRight: 10 }}>{props.icon}</View>
					)}
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
	},
	buttonTextStyle: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		lineHeight: 18,
		paddingTop: 4,
	},
});

export default NeoButton;
