import React, { Component } from 'react';
import { Text, View, TextStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';
import colorConstants from '../../constants/color';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { DEFAULT_TOUCHABLE_OPACITY } from '../../constants/config';

interface ButtonProps {
  onClick: () => void;
  btnText: string;
  btnContainerStyle?: StyleProp<TextStyle>;
  btnTextStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
	const { btnText, btnContainerStyle, btnTextStyle, disabled = false, onClick } = props;

	const handleButtonClick = () => {
		if (!disabled && onClick) {
			onClick();
		}
	};

	const actionButtonStyle = {
		...styles.actionButton,
		backgroundColor: disabled ? colorConstants.SHADOW_LIGHT : styles.actionButton.backgroundColor,
	};

	return (
		<View style={[styles.root, btnContainerStyle ]}>
			<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} style={actionButtonStyle} onPress={handleButtonClick}>
				<Text style={[ styles.actionButtonText, btnTextStyle ]}>{btnText}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
	},
	actionButton: {
		flex: 1,
		width: '100%',
		borderRadius: 10,
		backgroundColor: colorConstants.ACTION_BUTTON,
	},
	actionButtonText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 19,
		color: colorConstants.WHITE,
		paddingVertical: 16,
		textAlign: 'center',
	},
});
