import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import HotDeals from './HotDeals';
import colorConstants from '../constants/color';
import ShopHeader from './ShopHeader';
import BrandCarousel from './BrandCarousel';
import * as ApiHelper from '../helpers/ApiHelper';
import RewardsSection from './RewardsSection';

export default function Shop(props) {
	const [ spotlight, setSpotlight ] = useState([]);
	const [ merchants, setMerchants ] = useState([]);
	const [ editorsPicks, setEditorsPicks ] = useState([]);

	useEffect(() => {
		fetchMasterData();
	}, []);

	const fetchMasterData = async () => {
		try {
			const masterData = await ApiHelper.fetchMasterData();
			processData(masterData);
			console.log(JSON.stringify(masterData));
		} catch (e) {

		}
	};

	const processData = (masterData) => {
		if (masterData.error) {
			return;
		}

		setSpotlight(masterData.data.spotlight);
		setMerchants(masterData.data.merchant);
		setEditorsPicks(masterData.data.editors_pic);
	};

	return (
		<View style={styles.root}>
			<ScrollView contentContainerStyle={{flexGrow: 1}}>
				<ShopHeader />

				<RewardsSection />

				<BrandCarousel items={spotlight} />

				<HotDeals merchants={merchants} />

				<Text style={styles.editorsPickTitleText}>Editor’s Pick</Text>
				<BrandCarousel items={editorsPicks} height={250} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingBottom: 20,
	},
	topSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 20,
		marginBottom: -12,
	},
	editorsPickTitleText: {
		fontFamily: 'Gilroy-Regular',
		fontSize: 14,
		lineHeight: 28,
		color: colorConstants.GREY_FONT_COLOR,
		paddingHorizontal: 20,
		marginTop: 24,
		marginBottom: 4,
	},
});
