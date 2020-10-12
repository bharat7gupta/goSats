import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Neomorph } from 'react-native-neomorph-shadows';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import BrandItem from '../types/BrandItem';

interface BrandCarouselProps {
	items: BrandItem[];
	heightFactor: number;
	onItemClick: (brandItem: BrandItem) => void;
	onCaroselImageLoad?: () => void;
}

const screen = Dimensions.get('screen');
const { width } = screen;
const carouselItemWidth = width - 20; // deduct 20 (10 * 2) for space between the carousels

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

	const onCaroselImageLoad = (index: number) => {
		if (index === 0 && props.onCaroselImageLoad) {
			props.onCaroselImageLoad();
		}
	};

	const renderCarouselItem = ({ item, index }: { item: BrandItem, index: number }) => {
		return (
			<View style={styles.carouselContainer}>
				<TouchableWithoutFeedback onPress={() => handleItemClick(item)}>
					<Neomorph
						style={{
							...styleConstants.shadowStyles,
							width: carouselItemWidth - 20, // deduct 20 (10 * 2) to leave space for shadows
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
								width: carouselItemWidth - 28, // 20 for the shadows and 8 for the margin
								height: carouselItemHeight - 8, // 8 for the margin
							}}
							onLoad={() => onCaroselImageLoad(index)}
						/>
					</Neomorph>
				</TouchableWithoutFeedback>
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
			inactiveSlideScale={0.94}
		/>
	);
}

const styles  = StyleSheet.create({
	carouselContainer: {
		width: carouselItemWidth - 20,
		marginBottom: 4,
		paddingVertical: 14,
	},
	carouselImage: {
		borderRadius: 10,
		margin: 4,
	},
	carouselSlideStyle: {
		marginLeft: -10,
		marginRight: 10,
	},
});
