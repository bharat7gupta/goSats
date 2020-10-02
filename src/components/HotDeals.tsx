import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colorConstants from '../constants/color';
import NeoTile from './common/NeoTile';
import Brand from '../types/Brand';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
// import brandList from '../mock_jsons/brand-list.json';

const screen = Dimensions.get('screen');
const { width } = screen;

interface HotDealsProps {
	merchants: Brand[];
	onItemClick: (brand: Brand) => void;
}

export default function HotDeals(props: HotDealsProps) {
	const handleShopAllPress = () => {

	};

	const handleItemClick = (brand: Brand) => {
		if (props.onItemClick) {
			props.onItemClick(brand);
		}
	};

	return (
		<View>
			<View style={styles.header}>
				<Text style={styles.title}>Hot Deals</Text>

				<TouchableHighlight onPress={handleShopAllPress}>
					<Text style={styles.shopAllText}>Shop All</Text>
				</TouchableHighlight>
			</View>

			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={true}
				alwaysBounceHorizontal={true}
				contentContainerStyle={styles.content}
			>
				{props.merchants.map(brand => (
					<NeoTile
						key={brand.id}
						brand={brand}
						style={styles.tileStyle}
						onClick={() => handleItemClick(brand)}
					/>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingRight: 24,
		paddingLeft: 14,
		alignItems: 'center',
	},
	title: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 28,
		color: colorConstants.GREY_FONT_COLOR,
		marginLeft: 8,
		marginBottom: 4,
	},
	shopAllText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 28,
		color: '#D1A33A',
	},
	tileStyle: {
		width: (width - 20 ) / 2,
	},
});
