import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colorConstants from '../constants/color';
import NeoTile from './common/NeoTile';

export default function HotDeals() {
	return (
		<View>
			<Text style={styles.title}>Hot Deals</Text>

			<View style={styles.content}>
				<NeoTile style={styles.tileStyle} text="Amazon" />
				<NeoTile style={styles.tileStyle} text="Flipkart" />
				<NeoTile style={styles.tileStyle} text="Starbucks" />
				<NeoTile style={styles.tileStyle} text="Baskin Robbins" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 10,
	},
	title: {
		fontFamily: 'Gilroy-Bold',
		fontSize: 18,
		lineHeight: 28,
		color: colorConstants.FONT_COLOR,
		paddingHorizontal: 13,
		marginLeft: 12,
		marginTop: 16,
		marginBottom: 8,
	},
	tileStyle: {
		flexBasis: '50%',
	},
});
