import React, { Component } from 'react';
import { Text, View, TextStyle, StyleProp, StyleSheet } from 'react-native';
import colorConstants from '../../constants/color';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
		<TouchableHighlight style={[styles.root, btnContainerStyle ]}>
			<View style={actionButtonStyle} onTouchEnd={handleButtonClick}>
				<Text style={[ styles.actionButtonText, btnTextStyle ]}>{btnText}</Text>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
	},
	actionButton: {
		flex: 1,
		width: '100%',
		// marginTop: 20,
		borderRadius: 10,
		backgroundColor: colorConstants.ACTION_BUTTON,
	},
	actionButtonText: {
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		lineHeight: 19,
		color: colorConstants.WHITE,
		textTransform: 'uppercase',
		paddingVertical: 16,
		textAlign: 'center',
	},
});
