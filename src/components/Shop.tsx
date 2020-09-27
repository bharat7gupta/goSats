import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import HomePageActions from './HomePageActions';
import HotDeals from './HotDeals';
import styleConstants from '../constants/style';
import colorConstants from '../constants/color';
import EarnedRewards from './EarnedRewards';
import SpinWheel from './SpinWheel';
import { Neomorph } from 'react-native-neomorph-shadows';

const screen = Dimensions.get('screen');
const { width } = screen;
const carouselItemWidth = width - 20;
const carouselItemHeight = carouselItemWidth / 2;

export default function Shop(props) {
	const [ carouselItems, setCarouselItems ] = useState([1, 2, 3, 4, 5]);

	const handleCategoryCLick = () => {
		props.navigation.navigate('Categories');
	};

	const handleFavouritesClick = () => {

	};

	const renderCarouselItem = () => {
		return (
			<View style={styles.carouselContainer}>
				<Neomorph
					style={{
						...styleConstants.shadowStyles,
						width: carouselItemWidth - 20,
						height: carouselItemHeight,
						overflow: 'hidden',
					}}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					<Image
						source={require('../assets/images/amazon-pay-giftcard.jpg')}
						width={carouselItemWidth}
						height={carouselItemHeight}
						style={styles.carouselImage}
					/>
				</Neomorph>
			</View>
		);
	};

	return (
		<View style={styles.root}>
			<ScrollView contentContainerStyle={{flexGrow: 1}}>
				<View style={styles.topSection}>
					<EarnedRewards />
					<SpinWheel />
				</View>

				<Carousel
					data={carouselItems}
					renderItem={renderCarouselItem}
					sliderWidth={width}
					itemWidth={carouselItemWidth}
				/>

				<HomePageActions
					onCategoriesClick={handleCategoryCLick}
					onFavouritesClick={handleFavouritesClick}
				/>
				<HotDeals />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	topSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 20,
		marginBottom: -12,
	},
	carouselContainer: {
		marginBottom: 14,
		paddingVertical: 14,
		paddingHorizontal: 10,
	},
	carouselImage: {
		resizeMode: 'cover',
	},
});
