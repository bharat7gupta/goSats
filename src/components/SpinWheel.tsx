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
import BackButton from './common/BackButton';
import Cross from './common/icons/Cross';

export default function SpinWheel(props) {
	const handleSpinClick = () => {

	};

	const handleBackButtonClick = () => {
		props.navigation.goBack();
	};

	return (
		<View style={styles.root}>
			<View style={[styles.header, props.style]}>
				<Text style={styles.headerText}>
					Sats Spin
				</Text>

				<BackButton
					onClick={handleBackButtonClick}
					style={styles.buttonStyle}
				>
					<Cross />
				</BackButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'relative',
		paddingVertical: 10,
		paddingRight: 6,
		backgroundColor: colorConstants.PRIMARY,
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		paddingBottom: 8,
		justifyContent: 'center',
		position: 'relative',
	},
	buttonStyle: {
		marginRight: 10,
		position: 'absolute',
		top: 0,
		left: 10,
	},
	headerText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 18,
		lineHeight: 28,
		marginTop: 10,
	},
});
