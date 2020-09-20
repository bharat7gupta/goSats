import React, { Component } from 'react';
import { Text, View, TextStyle, StyleProp, StyleSheet } from 'react-native';
import colorConstants from '../../constants/color';

interface ButtonProps {
  onClick: () => void;
  btnText: string;
  btnContainerStyle?: StyleProp<TextStyle>;
  btnTextStyle?: StyleProp<TextStyle>;
}

export default function Button(props: ButtonProps) {
	const { btnText, btnContainerStyle, btnTextStyle, onClick } = props;

	return (
		<View style={[styles.root, btnContainerStyle ]}>
			<View style={styles.actionButton} onTouchEnd={props.onClick}>
				<Text style={[ styles.actionButtonText, btnTextStyle ]}>{btnText}</Text>
			</View>
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
		marginTop: 20,
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
