import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Neomorph } from 'react-native-neomorph-shadows';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import BrandItem from '../types/BrandItem';

interface BrandCarouselProps {
	items: BrandItem[];
	heightFactor: number;
	onItemClick: (brandItem: BrandItem) => void;
}

const screen = Dimensions.get('screen');
const { width } = screen;
const carouselItemWidth = width - 20;

export default function BrandCarousel(props: BrandCarouselProps) {
	const { items, heightFactor, onItemClick } = props;
	const carouselItemHeight = carouselItemWidth * heightFactor;

	if (!items || items.length === 0) {
		return null;
	}

	const handleItemClick = (brandItem: BrandItem) => {
		if (onItemClick) {
			onItemClick(brandItem);
		}
	};

	const renderCarouselItem = ({ item }: { item: BrandItem }) => {
		return (
			<View style={styles.carouselContainer} onTouchEnd={() => handleItemClick(item)}>
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
						source={{ uri: item.imageURL }}
						style={{
							...styles.carouselImage,
							width: carouselItemWidth - 20,
							height: carouselItemHeight,
						}}
					/>
				</Neomorph>
			</View>
		);
	};

	return (
		<Carousel
			containerCustomStyle={{ paddingHorizontal: 10 }}
			data={items}
			renderItem={renderCarouselItem}
			sliderWidth={width}
			itemWidth={carouselItemWidth - 20}
			slideStyle={styles.carouselSlideStyle}
		/>
	);
}

const styles  = StyleSheet.create({
	carouselContainer: {
		width: carouselItemWidth - 20,
		marginBottom: 14,
		paddingVertical: 14,
	},
	carouselImage: {
		resizeMode: 'contain',
	},
	carouselSlideStyle: {
		marginLeft: -10,
		marginRight: 10,
	},
});
