import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colorConstants from '../../constants/color';

export default function ComingSoon() {
	return (
		<View style={styles.root}>
			<Text style={styles.text}>Coming Soon</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontFamily: 'SFProText-Bold',
		fontSize: 28,
		color: colorConstants.FONT_COLOR,
	},
});
