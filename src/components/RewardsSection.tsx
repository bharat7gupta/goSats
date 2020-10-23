import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import SpinWheelIcon from './common/icons/SpinWheelIcon';
import UserBalance from '../types/UserBalance';
import * as UtilityHelper from '../helpers/UtilityHelper';
import LevelBadge from './common/LevelBadge';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';

interface RewardsSectionProps {
	balanceData: UserBalance;
	navigation?: any;
	onRewardsClick: () => void;
	onSpinClick: () => void;
}

export default function RewardsSection(props: RewardsSectionProps) {
	const { balanceData } = props;
	const userBalance = balanceData && balanceData.balance.totalEarnedSats;
	const formattedBalance = UtilityHelper.getFormattedNumber(userBalance);
	const levelImageUrl = balanceData && balanceData.level.icon;

	return (
		<View style={styles.root}>
			<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} onPress={props.onRewardsClick}>
				<View style={styles.icon}>
					<Image source={{ uri: levelImageUrl }} style={{ width: 60, height: 90 }} />
				</View>
			</TouchableOpacity>

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
					{balanceData && <LevelBadge level={balanceData.level} onCLick={props.onRewardsClick} />}

					<NeomorphFlex
						style={{ ...styleConstants.shadowStyles, flex: 0, borderRadius: 20 }}
						darkShadowColor={colorConstants.SHADOW_DARK}
						lightShadowColor={colorConstants.ACTION_BUTTON_SHADOW}
					>
						<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} style={styles.spinButton} onPress={props.onSpinClick}>
							<SpinWheelIcon />
							<Text style={styles.spinButtonText}>Spin</Text>
						</TouchableOpacity>
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
		marginBottom: 14,
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
