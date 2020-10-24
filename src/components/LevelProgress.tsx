import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import ProgressBar from './common/ProgressBar';
import UserLevel from '../types/UserLevel';
import * as UtilityHelper from '../helpers/UtilityHelper';

interface LevelProgressProps {
	earnedSats: number;
	level: UserLevel;
	horizontalProgressBarGradient?: boolean;
	style?: ViewStyle;
}

export default function LevelProgress(props: LevelProgressProps) {
	const { level, earnedSats, horizontalProgressBarGradient, style } = props;

	if (!level) {
		return null;
	}

	return (
		<View style={[ styles.root, style ]}>
			<View style={styles.topProgressMarkers}>
				<Text style={styles.levelText}>{level.current}</Text>
				<Text style={styles.levelText}>{level.next}</Text>
			</View>

			<ProgressBar
				minValue={level.curMinSats}
				maxValue={level.curMaxSats}
				currValue={earnedSats}
				gradientColors={level.progressBarBgColor}
				horizontalGradient={horizontalProgressBarGradient}
			/>

			<View style={styles.bottomProgressMarkers}>
				<Text style={styles.satsLimitText}>
					{UtilityHelper.getFormattedNumber(level.curMinSats)} sats
				</Text>
				<Text style={styles.satsLimitText}>
					{UtilityHelper.getFormattedNumber(level.curMaxSats)} sats
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	topProgressMarkers: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 7,
	},
	bottomProgressMarkers: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 7,
	},
	levelText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 12,
		lineHeight: 16,
		color: '#939393',
	},
	satsLimitText: {
		fontFamily: 'SFProText-Regular',
		fontSize: 12,
		lineHeight: 16,
		color: '#939393',
	},
});
