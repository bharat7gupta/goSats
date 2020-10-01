import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Neomorph } from 'react-native-neomorph-shadows';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import BrandItem from '../types/BrandItem';

interface BrandCarouselProps {
	items: BrandItem[];
	height?: number;
}

const screen = Dimensions.get('screen');
const { width } = screen;
const carouselItemWidth = width - 20;
const carouselItemHeight = Math.min(240, carouselItemWidth / 2);

export default function BrandCarousel(props: BrandCarouselProps) {
	const { items } = props;

	if (!items || items.length === 0) {
		return null;
	}

	const renderCarouselItem = ({ item }: { item: BrandItem }) => {
		return (
			<View style={styles.carouselContainer}>
				<Neomorph
					style={{
						...styleConstants.shadowStyles,
						width: carouselItemWidth - 20,
						height: props.height || carouselItemHeight,
						overflow: 'hidden',
					}}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					<Image
						source={{ uri: item.imageURL }}
						width={carouselItemWidth}
						height={props.height || carouselItemHeight}
						style={styles.carouselImage}
					/>
				</Neomorph>
			</View>
		);
	};

	return (
		<Carousel
			containerCustomStyle={{ paddingHorizontal: 10 }}
			data={props.items}
			renderItem={renderCarouselItem}
			sliderWidth={width}
			itemWidth={carouselItemWidth - 20}
			slideStyle={styles.carouselSlideStyle}
		/>
	)
}

const styles  = StyleSheet.create({
	carouselContainer: {
		width: carouselItemWidth - 20,
		marginBottom: 14,
		paddingVertical: 14,
	},
	carouselImage: {
		resizeMode: 'cover',
	},
	carouselSlideStyle: {
		marginLeft: -10,
		marginRight: 10,
	},
});
