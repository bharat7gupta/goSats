import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import HotDeals from './HotDeals';
import colorConstants from '../constants/color';
import ShopHeader from './ShopHeader';
import BrandCarousel from './BrandCarousel';
import * as ApiHelper from '../helpers/ApiHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import RewardsSection from './RewardsSection';
import Strings from '../constants/strings';
import ErrorModal from './common/ErrorModal';
import { StatusBarHeight } from '../helpers/UtilityHelper';
import Brand from '../types/Brand';
import Toast from 'react-native-simple-toast';
import masterDataSet from '../mock_jsons/master-data.json';
import BrandItem from '../types/BrandItem';

const spotLightHeightFactor = 0.5;
const editorsPickHeightFactor = 0.764;
const SHOP_PAGE_FETCH_TIMESTAMP_KEY = 'shopDataFetchTimestamp';

export default function Shop(props) {
	const [ spotlight, setSpotlight ] = useState([]);
	const [ merchants, setMerchants ] = useState([]);
	const [ editorsPicks, setEditorsPicks ] = useState([]);
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');
	const [ balanceData, setBalanceData ] = useState(null);

	useEffect(() => {
		fetchMasterData();
		AppState.addEventListener('change', fetchPageDataOnResume);

		return () => {
			AppState.removeEventListener('change', fetchPageDataOnResume);
		};
	}, []);

	const fetchPageDataOnResume = async (nextAppState: string) => {
		const shouldRefresh = await UtilityHelper.shouldRefreshPageData(SHOP_PAGE_FETCH_TIMESTAMP_KEY);

		if (nextAppState === 'active' && shouldRefresh) {
			fetchMasterData();
		}
	};

	const fetchMasterData = async () => {
		try {
			setLoading(true);
			const masterData = await ApiHelper.fetchMasterData();
			const userBalance = await ApiHelper.fetchUserBalance();
			await StorageHelper.setItem(SHOP_PAGE_FETCH_TIMESTAMP_KEY, UtilityHelper.getTimestampString());

			// const masterData = masterDataSet;
			// console.log(masterData);
			// console.log(userBalance);
			processData(masterData);
			setBalanceData(userBalance.data);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setShowError(true);
			setErrorMessage(Strings.SOMETHING_WENT_WRONG);
		}
	};

	const filterBrands = item => (item.isActive || item.active);

	const processData = (masterData) => {
		if (masterData.error) {
			setShowError(masterData.error);
			setErrorMessage(masterData.message);
			return;
		}

		const emptyArray = [];
		setSpotlight((masterData.data.spotlight || emptyArray).filter(filterBrands));
		setMerchants((masterData.data.merchant || emptyArray).filter(filterBrands));
		setEditorsPicks((masterData.data.editors_pic || emptyArray).filter(filterBrands));
	};

	const handleBrandItemClick = (brand: BrandItem) => {
		props.navigation.navigate('BrandDetail', { id: brand.merchantId || brand.id });
	};

	const handleDismissError = () => {
		setShowError(false);
		setErrorMessage('');
		props.navigation.goBack();
	};

	const handleRewardsClick = () => {
		props.navigation.navigate('Rewards');
	};

	const handleSpinClick = () => {
		Toast.show('Coming soon!');
		// props.navigation.navigate('SatsSpin');
	};

	const handleShopAllClick = () => {
		props.navigation.navigate('Categories');
	};

	return (
		<View style={styles.root}>
			<ScrollView contentContainerStyle={styles.containerStyle} stickyHeaderIndices={[0]}>
				<View style={styles.topSection}>
					<ShopHeader />
				</View>

				{!loading && (
					<React.Fragment>
						<RewardsSection
							balanceData={balanceData}
							onRewardsClick={handleRewardsClick}
							onSpinClick={handleSpinClick}
						/>

						<BrandCarousel
							items={spotlight}
							heightFactor={spotLightHeightFactor}
							onItemClick={handleBrandItemClick}
							onCaroselImageLoad={() => SplashScreen.hide()}
						/>

						<HotDeals
							merchants={merchants}
							onShopAllClick={handleShopAllClick}
							onItemClick={handleBrandItemClick}
						/>

						<Text style={styles.editorsPickTitleText}>Editor’s Pick</Text>
						<BrandCarousel
							items={editorsPicks}
							heightFactor={editorsPickHeightFactor}
							onItemClick={handleBrandItemClick}
						/>
					</React.Fragment>
				)}

			</ScrollView>

			<ErrorModal
				showError={showError}
				errorMessage={errorMessage}
				onDismissError={handleDismissError}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		position: 'relative',
	},
	containerStyle: {
		flexGrow: 1,
		paddingBottom: 30,
	},
	topSection: {
		paddingTop: StatusBarHeight + 10,
		backgroundColor: colorConstants.PRIMARY,
	},
	editorsPickTitleText: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 28,
		color: colorConstants.GREY_FONT_COLOR,
		paddingHorizontal: 20,
		marginTop: 24,
		marginBottom: 4,
	},
});
