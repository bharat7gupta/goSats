import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, AppState } from 'react-native';
import { StatusBarHeight } from '../helpers/UtilityHelper';
import PageHeader from './PageHeader';
import styleConstants from '../constants/style';
import colorConstants from '../constants/color';
import LevelProgress from './LevelProgress';
import NeoButton from './common/NeoButton';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import * as StorageHelper from '../helpers/StorageHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import ShadowButton from './common/ShadowButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';

const WALLET_PAGE_FETCH_TIMESTAMP_KEY = 'walletDataFetchTimestamp';
const SATS_WITHDRAW_LIMIT = 50000;

interface WalletProps {
	navigation?: any;
}

export default function Wallet(props: WalletProps) {
	const [ balanceData, setBalanceData ] = useState(null);

	useEffect(() => {
		fetchUserBalance();

		AppState.addEventListener('change', fetchPageDataOnResume);

		return () => {
			AppState.removeEventListener('change', fetchPageDataOnResume);
		};
	}, []);

	const fetchPageDataOnResume = async (nextAppState: string) => {
		const shouldRefresh = await UtilityHelper.shouldRefreshPageData(WALLET_PAGE_FETCH_TIMESTAMP_KEY);

		if (nextAppState === 'active' && shouldRefresh) {
			fetchUserBalance();
		}
	};

	const fetchUserBalance = async () => {
		const userBalance = await ApiHelper.fetchUserBalance();
		// const userBalance = userBalanceMockData;

		await StorageHelper.setItem(WALLET_PAGE_FETCH_TIMESTAMP_KEY, UtilityHelper.getTimestampString());

		if (userBalance.error) {
			return;
		}

		setBalanceData(userBalance.data);
	};

	const handleKeepShopping = () => {
		props.navigation.navigate('Categories');
	};

	const handleWithdrawInit = () => {
		props.navigation.navigate('Withdraw', {
			availableSats: (balanceData && balanceData.balance.spendableSats) || 0,
			inrPerBTC: (balanceData && balanceData.inrPriceforOneBTC) || 1,
		});
	};

	const withdrawalTerms = [
		'You need 50,000 sats to withdraw. keep shopping and stack the sats!',
		'Deposit is done every Tuesday.',
		'0% withdrawl fee.',
	];

	const spendableSats = balanceData && balanceData.balance.spendableSats;
	const formattedSpendableSats = UtilityHelper.getFormattedNumber(spendableSats);
	const balanceInINR = balanceData && balanceData.balanceInINR;
	const canWithdraw = spendableSats && spendableSats >= SATS_WITHDRAW_LIMIT;
	const level = {
		progressBarBgColor: ['#2D8841', '#5BA94E'],
		curMinSats: balanceData && balanceData.level.curMinSats,
		curMaxSats: balanceData && balanceData.level.curMaxSats,
	};

	return (
		<ScrollView contentContainerStyle={styles.containerStyle} stickyHeaderIndices={[0]}>
			<View style={styles.topSection}>
				<PageHeader title="Wallet" />
			</View>

			<View style={styles.content}>
				<View style={styles.mainHeader}>
					<Text style={styles.earningsHeaderText}>
						Available Sats
					</Text>
				</View>

				<View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
					<Text style={styles.earningsText}>
						{formattedSpendableSats}
					</Text>
					<Text style={styles.earningsSubText}>
						sats
					</Text>
				</View>

				<View style={styles.inrValueTextContainer}>
					<View style={styles.valueTextChip}>
						<Text style={styles.valueText}>INR Value</Text>
					</View>

					<Text style={styles.inrValue}>₹ {balanceInINR}</Text>
				</View>

				<LevelProgress
					level={level}
					earnedSats={spendableSats}
					horizontalProgressBarGradient={true}
					style={{ marginTop: 10, paddingHorizontal: 20 }}
				/>

				<View style={styles.withdrawTermsContainer}>
					<Text style={styles.withdrawTermsHeaderText}>
						Withdraw Terms :
					</Text>

					{withdrawalTerms.map((term, index) => (
						<View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
							<Text style={styles.bulletPoint}>{'\u2022'}</Text>
							<Text style={styles.withdrawTermText}>{term}</Text>
						</View>
					))}
				</View>

				{canWithdraw ? (
					<ShadowButton
						buttonText="Withdraw"
						disabled={false}
						onClick={handleWithdrawInit}
						style={styles.withdrawButton}
					/>
				) : (
					<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} onPress={handleKeepShopping}>
						<View style={styles.keepShopping}>
							<NeomorphFlex
								style={styleConstants.shadowStyles}
								darkShadowColor={colorConstants.SHADOW_DARK}
								lightShadowColor={colorConstants.SHADOW_LIGHT}
							>
								<Text style={styles.keepShoppingText}>Keep Shopping</Text>
							</NeomorphFlex>
						</View>
					</TouchableOpacity>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	containerStyle: {
		flexGrow: 1,
		paddingBottom: 30,
		backgroundColor: colorConstants.PRIMARY,
	},
	topSection: {
		paddingTop: StatusBarHeight + 10,
		backgroundColor: colorConstants.PRIMARY,
	},
	content: {
		marginTop: 12,
		marginHorizontal: 18,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		borderRadius: 10,
	},
	mainHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 20,
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
	inrValueTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 9,
		paddingHorizontal: 20,
	},
	valueTextChip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		borderRadius: 4,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	valueText: {
		color: '#737373',
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 17,
	},
	inrValue: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 16,
		marginLeft: 10,
	},
	withdrawTermsContainer: {
		padding: 16,
		backgroundColor: '#242D33',
		marginTop: 24,
		marginBottom: 10,
		borderRadius: 10,
		marginHorizontal: 20,
	},
	withdrawTermsHeaderText: {
		fontSize: 14,
		lineHeight: 18,
		fontFamily: 'SFProText-Bold',
		color: colorConstants.WHITE,
		opacity: 0.3,
		marginBottom: 10,
	},
	bulletPoint: {
		color: colorConstants.WHITE,
		opacity: 0.6,
		marginRight: 10,
	},
	withdrawTermText: {
		color: colorConstants.WHITE,
		opacity: 0.6,
		flex: 1,
	},
	keepShopping: {
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 20
	},
	keepShoppingText: {
		color: colorConstants.YELLOW_GOLD,
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 19,
		paddingVertical: 16,
	},
	withdrawButton: {
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 20,
		height: 98,
	},
});
