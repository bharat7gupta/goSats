import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colorConstants from '../constants/color';
import Notepad from './common/icons/Notepad';
import { DetailJson } from '../types/MerchantDetail';

interface BrandDetailsCardProps {
	brandDetails: DetailJson[];
}

export default function BrandDetailsCard(props: BrandDetailsCardProps) {
	const { brandDetails } = props;
	const [ collapsed, setCollapsed ] = useState<boolean>(true);

	if (!brandDetails || brandDetails.length === 0) {
		return null;
	}

	const handleCardClick = () => {
		setCollapsed(!collapsed);
	};

	return (
		<View style={[styles.details, !collapsed && styles.expand]} onTouchEnd={handleCardClick}>
			<View style={styles.detailsHeader}>
				<Notepad />
				<Text style={styles.detailsHeaderText}>Details</Text>
			</View>

			<View style={{ marginLeft: 30 }}>
				{brandDetails && brandDetails.map(brandDetail => (
					<View key={brandDetail.title}>
						<Text style={{...styles.detailsTextColor, marginBottom: 4 }}>{brandDetail.title}</Text>
						{brandDetail.description && brandDetail.description.map(desc => (
							<View key={desc} style={{ flexDirection: 'row', marginBottom: 8 }}>
								<Text style={styles.detailsTextColor}>{'\u2022'}</Text>
								<Text style={{ ...styles.detailsTextColor, flex: 1 }}>{desc}</Text>
							</View>
						))}
					</View>
				))}
			</View>

			{collapsed && (
				<LinearGradient
					colors={[
						'rgba(64, 57, 72, 0)',
						'rgba(64, 57, 72, 0.6)',
						'rgba(64, 57, 72, 1)',
					]}
					locations={[ 0, 0.1, 1 ]}
					style={styles.detailsBottomGradientContainer}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	details: {
		position: 'relative',
		marginHorizontal: 20,
		paddingTop: 16,
		paddingHorizontal: 10,
		backgroundColor: '#403948',
		borderRadius: 10,
		marginTop: 6,
		marginBottom: 12,
		overflow: 'hidden',
		maxHeight: 120,
	},
	detailsHeader: {
		flexDirection: 'row',
	},
	detailsHeaderText: {
		fontSize: 15,
		lineHeight: 16,
		fontFamily: 'SFProText-Regular',
		color: 'rgba(255, 255, 255, 0.5)',
		opacity: 0.9,
		marginLeft: 10,
		marginBottom: 8,
	},
	detailsTextColor: {
		color: '#FFFFFF',
		fontSize: 14,
		lineHeight: 18,
		fontFamily: 'SFProText-Regular',
	},
	detailsLineItem: {
		fontSize: 15,
		lineHeight: 16,
		fontFamily: 'SFProText-Regular',
		color: colorConstants.FONT_COLOR,
		opacity: 0.9,
		marginBottom: 16,
	},
	detailsBottomGradientContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 40,
	},
	expand: {
		overflow: 'visible',
		maxHeight: 9000000,
	},
});
