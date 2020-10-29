import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, AppState } from 'react-native';
import colorConstants from '../constants/color';
import Header from './common/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import LevelBadge from './common/LevelBadge';
import * as ApiHelper from '../helpers/ApiHelper';
import WalletFilledIcon from './common/icons/WalletFilledIcon';
import ProgressBar from './common/ProgressBar';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import LevelProgress from './LevelProgress';
import RewardsHistoryIcon from './common/icons/RewardsHistoryIcon';
import ReferAndEarnIcon from './common/icons/ReferAndEarnIcon';
import ChevronLeft from './common/icons/ChevronLeft';
import HowItWorksIcon from './common/icons/HowItWorksIcon';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
// import userBalanceMockData from '../mock_jsons/user-balance.json';

const REWARDS_PAGE_FETCH_TIMESTAMP_KEY = 'rewardsDataFetchTimestamp';

export default function Rewards(props) {
	const authDispatch = useContext(AuthDispatchContext);

	const [ balanceData, setBalanceData ] = useState(null);

	useEffect(() => {
		fetchUserBalance();

		AppState.addEventListener('change', fetchPageDataOnResume);

		return () => {
			AppState.removeEventListener('change', fetchPageDataOnResume);
		};
	}, []);

	const fetchPageDataOnResume = async (nextAppState: string) => {
		const shouldRefresh = await UtilityHelper.shouldRefreshPageData(REWARDS_PAGE_FETCH_TIMESTAMP_KEY);

		if (nextAppState === 'active' && shouldRefresh) {
			fetchUserBalance();
		}
	};

	const fetchUserBalance = async () => {
		try {
			const userBalance = await ApiHelper.fetchUserBalance();
			// const userBalance = userBalanceMockData;

			await StorageHelper.setItem(REWARDS_PAGE_FETCH_TIMESTAMP_KEY, UtilityHelper.getTimestampString());

			if (userBalance.error) {
				return;
			}

			setBalanceData(userBalance.data);
		} catch (e) {
			authDispatch({
				type: AuthActions.UPDATE_LOGIN_STATUS,
				isLoggedIn: false,
			});
		}
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
				backButtonContent={<ChevronLeft />}
				navigation={props.navigation}
				style={styles.header}
			/>

			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.main}>
					<View style={styles.mainHeader}>
						<Text style={styles.earningsHeaderText}>
							Total Bitcoin Earned
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
						Withdrawing bitcoin will not affect your progress to the next level.
					</Text>
				</View>

				<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} style={styles.menuButton}>
					<RewardsHistoryIcon />
					<Text style={styles.menuButtonText}>Rewards History</Text>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} style={styles.menuButton}>
					<ReferAndEarnIcon />
					<Text style={styles.menuButtonText}>Refer & Earn</Text>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} style={styles.menuButton}>
					<HowItWorksIcon />
					<Text style={styles.menuButtonText}> Levels</Text>
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
