import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import SpinWheelIcon from './common/icons/SpinWheelIcon';
import UserBalance from '../types/UserBalance';

interface RewardsSectionProps {
	balanceData: UserBalance;
}

export default function RewardsSection(props: RewardsSectionProps) {
	const { balanceData } = props;
	const userBalance = (balanceData && balanceData.balance.totalEarnedSats) || 0;
	const formattedBalance = userBalance.toLocaleString();
	const currentLevel = balanceData && balanceData.level.current;
	const levelImageUrl = balanceData && balanceData.level.icon;
	const textColorCode = balanceData && balanceData.level.colorCode;
	const bgColorCode = balanceData && balanceData.level.bgColorCode;

	return (
		<View style={styles.root}>
			<View style={styles.icon}>
				<Image source={{ uri: levelImageUrl }} style={{ width: 60, height: 90 }} />
			</View>

			<View style={styles.rewards}>
				<Text style={styles.rewardsHeaderText}>
					Total Bitcoin Earned
				</Text>

				<View style={styles.earningsTextContainer}>
					<Text style={styles.earningsText}>
						{formattedBalance}
					</Text>
					<Text style={styles.earningsSubText}>
						sats
					</Text>
				</View>

				<View style={styles.bottomRow}>
					<View style={{ ...styles.badge, borderColor: textColorCode, backgroundColor: bgColorCode }}>
						<Text style={{ color: textColorCode }}>{currentLevel}</Text>
					</View>

					<NeomorphFlex
						style={{ ...styleConstants.shadowStyles, flex: 0, borderRadius: 20 }}
						darkShadowColor={colorConstants.SHADOW_DARK}
						lightShadowColor={colorConstants.ACTION_BUTTON_SHADOW}
					>
						<View style={styles.spinButton}>
							<SpinWheelIcon />
							<Text style={styles.spinButtonText}>Spin</Text>
						</View>
					</NeomorphFlex>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		marginHorizontal: 18,
		marginTop: 24,
		marginBottom: 30,
		borderRadius: 10,
	},
	icon: {
		paddingVertical: 20,
		paddingLeft: 20,
		paddingRight: 14,
	},
	rewards: {
		flex: 1,
		paddingVertical: 18,
		paddingRight: 18,
	},
	rewardsHeaderText: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 17,
		color: colorConstants.GREY_FONT_COLOR,
	},
	earningsTextContainer: {
		flexDirection: 'row',
		marginTop: 4,
	},
	earningsText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 30,
		lineHeight: 36,
		color: colorConstants.FONT_COLOR,
	},
	earningsSubText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		marginLeft: 10,
		lineHeight: 40,
		color: colorConstants.FONT_COLOR,
		textAlignVertical: 'bottom',
	},
	bottomRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: -2,
	},
	badge: {
		borderStyle: 'dashed',
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 14,
		paddingVertical: 4,
	},
	spinButton: {
		flexDirection: 'row',
		backgroundColor: '#B58E37',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		alignItems: 'center',
	},
	spinButtonText : {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 17,
		opacity: 0.9,
		marginLeft: 6,
	},
});
