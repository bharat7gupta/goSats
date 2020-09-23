import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colorConstants from '../constants/color';
import Notepad from './common/icons/Notepad';

interface BrandDetailsCardProps {
	brandDetails: string[];
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
				<Text style={styles.detailsLineItem}>
					{brandDetails}
				</Text>
			</View>

			{collapsed && (
				<LinearGradient
					colors={['rgba(30, 30, 30, 0)', 'rgba(30, 30, 30, 0.6)', 'rgba(30, 30, 30, 1)']}
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
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		borderRadius: 10,
		marginTop: 6,
		marginBottom: 24,
		overflow: 'hidden',
		maxHeight: 90,
	},
	detailsHeader: {
		flexDirection: 'row',
	},
	detailsHeaderText: {
		fontSize: 15,
		lineHeight: 16,
		fontFamily: 'Gilroy-Regular',
		color: 'rgba(255, 255, 255, 0.5)',
		opacity: 0.9,
		marginLeft: 10,
		marginBottom: 10,
	},
	detailsLineItem: {
		fontSize: 15,
		lineHeight: 16,
		fontFamily: 'Gilroy-Regular',
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
