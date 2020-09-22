import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import BitcoinOffer from './common/icons/BitcoinOffer';
import colorConstants from '../constants/color';

interface BrandInfoWithOfferProps {
	name: string;
	reward: string;
	containerStyle?: ViewStyle;
	brandNameStyle?: ViewStyle;
}

export default function BrandInfoWithOffer(props: BrandInfoWithOfferProps) {
	return (
		<View style={[styles.brandNameAndOffer, props.containerStyle]}>
			<Text style={[styles.brandName, props.brandNameStyle]}>
				{props.name}
			</Text>
			<View style={styles.rewardLine}>
				<BitcoinOffer />
				<Text style={styles.rewardLineText}>{props.reward}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	brandNameAndOffer: {
		flex: 1,
	},
	brandName: {
		fontFamily: 'Gilroy-Bold',
		fontSize: 22,
		lineHeight: 28,
		color: colorConstants.FONT_COLOR,
		marginBottom: 4,
	},
	rewardLine: {
		flexDirection: 'row',
	},
	rewardLineText: {
		color: colorConstants.DARK_GREY,
		fontSize: 11,
		lineHeight: 13,
		marginTop: 1,
		marginLeft: 7,
	},
});
