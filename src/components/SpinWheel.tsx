import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WheelBoundary from './common/icons/WheelBoundary';
import LuckyWheel from './common/icons/LuckyWheel';
import styleConstants from '../constants/style';
import colorConstants from '../constants/color';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';
import { Neomorph } from 'react-native-neomorph-shadows';
import Button from './common/Button';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function SpinWheel() {
	const handleSpinClick = () => {

	};

	return (
		<View style={styles.root}>
			<WheelBoundary />

			<View style={styles.luckyWheel}>
				<LuckyWheel />
				<Text style={styles.label}>Bronze</Text>
			</View>

			<Neomorph
				style={{...styleConstants.shadowStyles, ...styles.spinButtonContainer}}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.ACTION_BUTTON_SHADOW}
			>
				<TouchableHighlight style={styles.spinButton}>
					<Text style={styles.spinButtonText}>Spin</Text>
				</TouchableHighlight>
			</Neomorph>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'relative',
		paddingVertical: 10,
		paddingRight: 6,
	},
	luckyWheel: {
		position: 'absolute',
		top: 50,
		left: 51,
	},
	label: {
		fontSize: 12,
		lineHeight: 12,
		fontFamily: 'Gilroy-Regular',
		color: colorConstants.BRONZE,
		marginTop: 6,
	},
	spinButtonContainer: {
		top: -30,
		left: 28,
		width: 80,
		height: 30,
		borderRadius: 40,
		backgroundColor: colorConstants.ACTION_BUTTON,
	},
	spinButton: {
	},
	spinButtonText: {
		fontFamily: 'Gilroy-Bold',
		fontSize: 14,
		lineHeight: 18,
		color: colorConstants.FONT_COLOR,
		textTransform: 'uppercase',
	},
});
