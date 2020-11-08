import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, AppState } from 'react-native';
import Toast from 'react-native-simple-toast';
import { StatusBarHeight } from '../helpers/UtilityHelper';
import PageHeader from './PageHeader';
import colorConstants from '../constants/color';
import LevelProgress from './LevelProgress';
import * as StorageHelper from '../helpers/StorageHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import ShadowButton from './common/ShadowButton';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';

const WALLET_PAGE_FETCH_TIMESTAMP_KEY = 'walletDataFetchTimestamp';

interface WalletProps {
	navigation?: any;
}

export default function Wallet(props: WalletProps) {
	const authDispatch = useContext(AuthDispatchContext);

	const [ balanceData, setBalanceData ] = useState(null);
	let scrollViewRef;

	useEffect(() => {
		AppState.addEventListener('change', fetchPageDataOnResume);

		const removeNavigationListener = props.navigation.addListener('focus', e => {
			fetchUserBalance();
			setTimeout(() => scrollToTop(), 10);
		});

		return () => {
			AppState.removeEventListener('change', fetchPageDataOnResume);
			removeNavigationListener();
		};
	}, []);

	const fetchPageDataOnResume = async (nextAppState: string) => {
		const shouldRefresh = await UtilityHelper.shouldRefreshPageData(WALLET_PAGE_FETCH_TIMESTAMP_KEY);

		if (nextAppState === 'active' && shouldRefresh) {
			fetchUserBalance();
		}
	};

	const fetchUserBalance = async () => {
		try {
			const userBalance = await ApiHelper.fetchUserBalance();
			// const userBalance = userBalanceMockData;

			await StorageHelper.setItem(WALLET_PAGE_FETCH_TIMESTAMP_KEY, UtilityHelper.getTimestampString());

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

	const scrollToTop = () => {
		if (scrollViewRef) {
			scrollViewRef.scrollTo({ x: 0, y: 0, animated: true });
		}
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
		'You need to stack a minimum of 50,000 sats to withdraw.',
		'Withdrawals are processed every Wednesday at 6pm IST.',
		'Any valid bitcoin address can be used for withdrawal.',
		'There are absolutely NO fees for withdrawals! We absorb the bitcoin network fees ourselves.',
	];

	const spendableSats = balanceData && balanceData.balance.spendableSats;
	const minWithdrawSats = balanceData && balanceData.minWithdrawSats;
	const formattedSpendableSats = UtilityHelper.getFormattedNumber(spendableSats);
	const balanceInINR = balanceData && balanceData.balanceInINR;
	const canWithdraw = spendableSats && minWithdrawSats && spendableSats >= minWithdrawSats;
	const level = {
		progressBarBgColor: ['#2D8841', '#5BA94E'],
		curMinSats: 0,
		curMaxSats: minWithdrawSats,
	};

	return (
		<View style={styles.root}>
			<ScrollView
				contentContainerStyle={styles.containerStyle}
				stickyHeaderIndices={[0]}
				ref={(ref) => scrollViewRef = ref}
			>
				<PageHeader title="Wallet" navigation={props.navigation} />

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

					{!!minWithdrawSats && (
						<LevelProgress
							level={level}
							earnedSats={spendableSats}
							horizontalProgressBarGradient={true}
							style={{ marginTop: 10, paddingHorizontal: 20 }}
						/>
					)}

					<View style={styles.withdrawTermsContainer}>
						<Text style={styles.withdrawTermsHeaderText}>
							Withdrawal Terms :
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
							style={styles.bottomButton}
						/>
					) : (
						<ShadowButton
							buttonText="Keep Shopping"
							disabled={false}
							onClick={handleKeepShopping}
							style={styles.bottomButton}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	containerStyle: {
		flexGrow: 1,
		paddingBottom: 30,
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
	bottomButton: {
		padding: 20,
		paddingTop: 28,
		marginBottom: 12,
	},
	keepShoppingText: {
		color: colorConstants.YELLOW_GOLD,
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 19,
		paddingVertical: 16,
	},
});
