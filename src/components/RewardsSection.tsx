import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import RewardsCup from './common/icons/RewardsCup';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import SpinWheelIcon from './common/icons/SpinWheelIcon';

export default function RewardsSection() {
	return (
		<View style={styles.root}>
			<View style={styles.icon}>
				<RewardsCup />
			</View>

			<View style={styles.rewards}>
				<Text style={styles.rewardsHeaderText}>
					Total Rewards Earned
				</Text>

				<View style={styles.earningsTextContainer}>
					<Text style={styles.earningsText}>
						20,000
					</Text>
					<Text style={styles.earningsSubText}>
						sats
					</Text>
				</View>

				<View style={styles.bottomRow}>
					<View style={styles.badge}>
						<Text style={styles.badgeText}>Bronze</Text>
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
		borderColor: colorConstants.BRONZE,
		borderRadius: 4,
		textTransform: 'capitalize',
		paddingHorizontal: 14,
		paddingVertical: 4,
		backgroundColor: 'rgba(169, 94, 20, 0.2)',
	},
	badgeText: {
		color: colorConstants.BRONZE,
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
