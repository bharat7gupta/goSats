import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { DEFAULT_TOUCHABLE_OPACITY } from '../../constants/config';
import colorConstants from '../../constants/color';

interface MenuButtonProps {
	icon: JSX.Element;
	text: string;
	textStyle?: ViewStyle;
	onClick: () => void;
}

export default function MenuButton(props: MenuButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={DEFAULT_TOUCHABLE_OPACITY}
			style={styles.menuButton}
			onPress={props.onClick}
		>
			{props.icon}
			<Text style={[styles.menuButtonText, props.textStyle]}>{props.text}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	menuButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		marginHorizontal: 18,
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		borderRadius: 10,
	},
	menuButtonText: {
		fontSize: 16,
		lineHeight: 28,
		fontFamily: 'SFProText-Regular',
		color: '#D0D0D0',
		marginLeft: 10,
	},
});
