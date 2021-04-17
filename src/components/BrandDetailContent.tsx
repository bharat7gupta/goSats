import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DetailJson } from '../types/MerchantDetail';

interface BrandDetailContentProps {
	brandDetails: DetailJson[];
	headerColor: string;
	contentColor: string;
}

export default function BrandDetailContent(props: BrandDetailContentProps) {
	const { brandDetails, headerColor, contentColor } = props;

	return (
		<View>
			{brandDetails && brandDetails.map(brandDetail => (
				<View key={brandDetail.title}>
					{!!brandDetail.title && (
						<Text style={{
							...styles.detailsTextColor,
							color: headerColor,
							marginBottom: 4,
						}}>
							{brandDetail.title}
						</Text>
					)}
					{brandDetail.description && brandDetail.description.map(desc => (
						<View key={desc} style={{ flexDirection: 'row', marginBottom: 8 }}>
							<Text style={{ ...styles.detailsTextColor, color: contentColor }}>{'\u2022'}</Text>
							<Text style={{ ...styles.detailsTextColor, flex: 1, color: contentColor }}>{desc}</Text>
						</View>
					))}

					<View style={{ marginBottom: 12 }} />
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	detailsTextColor: {
		color: '#838383',
		fontSize: 14,
		lineHeight: 18,
		fontFamily: 'SFProText-Regular',
		marginRight: 6,
	},
});
