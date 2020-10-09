import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserLevel from '../../types/UserLevel';

interface LevelBadgeProps {
	level: UserLevel;
}

export default function LevelBadge(props: LevelBadgeProps) {
	const { level } = props;
	const currentLevel = level && level.current;
	const textColorCode = level && level.colorCode;
	const borderColorCode = level && level.borderColor;
	const bgColorCode = level && level.bgColorCode;

	return (
		<View
			style={{
				...styles.badge,
				borderColor: borderColorCode,
				backgroundColor: bgColorCode,
			}}
		>
			<Text style={{ ...styles.badgeText, color: textColorCode }}>{currentLevel}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		borderStyle: 'dashed',
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 14,
		paddingVertical: 3,
	},
	badgeText: {
		fontSize: 12,
		lineHeight: 14,
	},
});
