import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colorConstants from '../constants/color';
import NeoTile from './common/NeoTile';
import merchantList from '../mock_jsons/merchant-list.json';

export default function HotDeals() {
	return (
		<View>
			<Text style={styles.title}>Hot Deals</Text>

			<View style={styles.content}>
				{merchantList.data.map(merchant => (
					<NeoTile
						key={merchant.id}
						merchant={merchant}
						style={styles.tileStyle}
					/>
				))}
			</View>
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
	title: {
		fontFamily: 'Gilroy-Bold',
		fontSize: 18,
		lineHeight: 28,
		color: colorConstants.FONT_COLOR,
		paddingHorizontal: 13,
		marginLeft: 9,
		marginTop: 16,
		marginBottom: 8,
	},
	tileStyle: {
		flexBasis: '50%',
		flex: 0,
		marginBottom: 20,
	},
});
