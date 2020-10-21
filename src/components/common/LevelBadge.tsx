import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UserLevel from '../../types/UserLevel';

interface LevelBadgeProps {
	level: UserLevel;
	onCLick?: () => void;
}

export default function LevelBadge(props: LevelBadgeProps) {
	const { level } = props;
	const currentLevel = level && level.current;
	const textColorCode = level && level.colorCode;
	const borderColorCode = level && level.borderColor;
	const bgColorCode = level && level.bgColorCode;

	const handleClick = () => {
		if (props.onCLick) {
			props.onCLick();
		}
	};

	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handleClick}>
			<View
				style={{
					...styles.badge,
					borderColor: borderColorCode,
					backgroundColor: bgColorCode,
				}}
				>
				<Text style={{ ...styles.badgeText, color: textColorCode }}>{currentLevel}</Text>
			</View>
		</TouchableOpacity>
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
