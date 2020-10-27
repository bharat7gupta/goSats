import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Cup from './common/icons/Cup';
import colorConstants from '../constants/color';

export default function EarnedRewards() {
	return (
		<View style={styles.root}>
			<Cup />
			<Text style={styles.earningsTitle}>
				Total Bitcoin Earned
			</Text>
			<View style={styles.earningsTextContainer}>
				<Text style={styles.earningsText}>
					10,000
				</Text>
				<Text style={styles.earningsSubText}>
					SATS
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingVertical: 30,
	},
	earningsTitle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 15,
		lineHeight: 18,
		color: colorConstants.EARNINGS_TITLE_GREY,
		marginTop: 4,
	},
	earningsTextContainer: {
		flexDirection: 'row',
	},
	earningsText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 46,
		lineHeight: 54,
		color: colorConstants.FONT_COLOR,
	},
	earningsSubText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 18,
		marginLeft: 10,
		lineHeight: 40,
		color: colorConstants.FONT_COLOR,
		textAlignVertical: 'bottom',
	},
});
