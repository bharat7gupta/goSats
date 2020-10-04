import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import HotDeals from './HotDeals';
import colorConstants from '../constants/color';
import ShopHeader from './ShopHeader';
import BrandCarousel from './BrandCarousel';
import * as ApiHelper from '../helpers/ApiHelper';
import RewardsSection from './RewardsSection';
import Strings from '../constants/strings';
import ErrorModal from './common/ErrorModal';
import PageLoader from './common/PageLoader';
import { StatusBarHeight } from '../helpers/UtilityHelper';
import masterDataSet from '../mock_jsons/master-data.json';

const spotLightHeightFactor = 0.5;
const editorsPickHeightFactor = 0.764;

export default function Shop(props) {
	const [ spotlight, setSpotlight ] = useState([]);
	const [ merchants, setMerchants ] = useState([]);
	const [ editorsPicks, setEditorsPicks ] = useState([]);
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');

	useEffect(() => {
		fetchMasterData();
	}, []);

	const fetchMasterData = async () => {
		try {
			setLoading(true);
			const masterData = await ApiHelper.fetchMasterData();
			// const masterData = masterDataSet;
			processData(masterData);
			// console.log(masterData);
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

	const handleBrandItemClick = (brand) => {
		props.navigation.navigate('BrandDetail', { brand });
	};

	const handleDismissError = () => {
		setShowError(false);
		setErrorMessage('');
		props.navigation.goBack();
	};

	return (
		<View style={styles.root}>
			<ScrollView contentContainerStyle={styles.containerStyle} stickyHeaderIndices={[0]}>
				<View style={styles.topSection}>
					<ShopHeader />
				</View>

				{!loading && (
					<React.Fragment>
						<RewardsSection />

						<BrandCarousel
							items={spotlight}
							heightFactor={spotLightHeightFactor}
							onItemClick={handleBrandItemClick}
							onCaroselImageLoad={() => SplashScreen.hide()}
						/>

						<HotDeals
							merchants={merchants}
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
		paddingTop: StatusBarHeight,
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
