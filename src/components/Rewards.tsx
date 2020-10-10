import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colorConstants from '../constants/color';
import Header from './common/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LevelBadge from './common/LevelBadge';
import * as ApiHelper from '../helpers/ApiHelper';
import WalletFilledIcon from './common/icons/WalletFilledIcon';
import ProgressBar from './common/ProgressBar';
import * as UtilityHelper from '../helpers/UtilityHelper';
import LevelProgress from './LevelProgress';
import RewardsHistoryIcon from './common/icons/RewardsHistoryIcon';
import ReferAndEarnIcon from './common/icons/ReferAndEarnIcon';
// import userBalanceMockData from '../mock_jsons/user-balance.json';

export default function Rewards(props) {
	const [ balanceData, setBalanceData ] = useState(null);

	useEffect(() => {
		fetchUserBalance();
	}, []);

	const fetchUserBalance = async () => {
		const userBalance = await ApiHelper.fetchUserBalance();
		// const userBalance = userBalanceMockData;
		if (userBalance.error) {
			return;
		}

		setBalanceData(userBalance.data);
	};

	const earnedSats = balanceData && balanceData.balance.totalEarnedSats;
	const spendableSats = balanceData && balanceData.balance.spendableSats;
	const formattedEarnedSats = UtilityHelper.getFormattedNumber(earnedSats);
	const formattedSpendableSats = UtilityHelper.getFormattedNumber(spendableSats);

	return (
		<View style={styles.root}>
			<Header
				title="Rewards"
				showBackButton={true}
				navigation={props.navigation}
				style={styles.header}
			/>

			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.main}>
					<View style={styles.mainHeader}>
						<Text style={styles.earningsHeaderText}>
							Total Rewards Earrned
						</Text>

						<LevelBadge level={balanceData && balanceData.level} />
					</View>

					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.earningsText}>
							{formattedEarnedSats}
						</Text>
						<Text style={styles.earningsSubText}>
							sats
						</Text>
					</View>

					<View style={styles.balanceContainer}>
						<View style={styles.balanceChip}>
							<WalletFilledIcon />
							<Text style={styles.balanceStaticText}>Balance</Text>
						</View>

						<Text style={styles.balanceText}>{`${formattedSpendableSats} sats`}</Text>
					</View>

					<View style={styles.horizontalLine} />

					<View style={styles.levelContainer}>
						<Image
							source={{ uri: balanceData && balanceData.level && balanceData.level.badge }}
							style={styles.badgeIcon}
						/>

						<LevelProgress
							earnedSats={Number(earnedSats)}
							level={balanceData && balanceData.level}
							style={styles.progressBarContainer}
						/>
					</View>

					<Text style={styles.info}>
						Withdraw sats wont affect your progress to the next level.
					</Text>
				</View>

				<TouchableOpacity style={styles.menuButton}>
					<RewardsHistoryIcon />
					<Text style={styles.menuButtonText}>Rewards History</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuButton}>
					<ReferAndEarnIcon />
					<Text style={styles.menuButtonText}>Refer & Earn</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuButton}>
					<RewardsHistoryIcon />
					<Text style={styles.menuButtonText}>How It Works</Text>
				</TouchableOpacity>

				<View style={{ marginBottom: 50 }} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingTop: UtilityHelper.StatusBarHeight,
	},
	header: {
		paddingHorizontal: 20,
		paddingBottom: 20,
		marginTop: 0,
	},
	main: {
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		borderRadius: 10,
		padding: 20,
		marginHorizontal: 18,
		marginTop: 24,
	},
	mainHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	earningsHeaderText: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 16,
		color: '#737373',
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
	balanceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 9,
	},
	balanceChip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		borderRadius: 4,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	balanceStaticText: {
		color: '#737373',
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 19,
		marginLeft: 10,
	},
	balanceText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 16,
		marginLeft: 10,
	},
	horizontalLine: {
		height: 2,
		backgroundColor: '#000000',
		marginTop: 24,
		marginBottom: 14,
		borderRadius: 100,
	},
	levelContainer: {
		flexDirection: 'row',
	},
	badgeIcon: {
		width: 104,
		height: 114,
		marginLeft: -14,
		marginBottom: -8,
	},
	progressBarContainer: {
		flex: 1,
		marginTop: 12,
	},
	info: {
		fontSize: 12,
		lineHeight: 12,
		fontFamily: 'SFProText-Regular',
		color: '#5A4927',
		marginTop: 9,
	},
	menuButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		marginHorizontal: 20,
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		borderRadius: 10,
	},
	menuButtonText: {
		fontSize: 16,
		lineHeight: 28,
		fontFamily: 'SFProText-Regular',
		color: '#D0D0D0',
		marginLeft: 10,
	},
});
