import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import colorConstants from '../constants/color';
import Notepad from './common/icons/Notepad';
import { DetailJson } from '../types/MerchantDetail';
import { ScrollView } from 'react-native-gesture-handler';
import Button from './common/Button';

interface BrandDetailsCardProps {
	brandDetails: DetailJson[];
	buttonText: string;
	submitDisabled: boolean;
	onPurchaseClick: () => void;
	style?: ViewStyle;
}

export default function BrandDetailsCard(props: BrandDetailsCardProps) {
	const { brandDetails } = props;

	let bottomSheetRef;

	if (!brandDetails || brandDetails.length === 0) {
		return null;
	}

	const handleCardClick = () => {
		if (bottomSheetRef) {
			bottomSheetRef.open();
		}
	};

	const renderBrandDetails = () => {
		return (
			<View>
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
		);
	};

	return (
		<React.Fragment>
			<TouchableWithoutFeedback onPress={handleCardClick}>
				<View style={styles.details}>
					<View style={styles.detailsHeader}>
						<Text style={styles.detailsHeaderText}>Details</Text>
					</View>

					{renderBrandDetails()}

					<LinearGradient
						colors={[
							'rgba(64, 57, 72, 0)',
							'rgba(64, 57, 72, 0.6)',
							'rgba(64, 57, 72, 1)',
						]}
						locations={[ 0, 0.1, 1 ]}
						style={styles.detailsBottomGradientContainer}
					/>
				</View>
			</TouchableWithoutFeedback>

			<RBSheet
				height={400}
				dragFromTopOnly={true}
				closeOnPressMask={true}
				animationType="slide"
				ref={(ref) => bottomSheetRef = ref}
				customStyles={{
					wrapper: {
					  backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
				  }}
			>
				<View style={styles.bottomSheetRoot}>
					<View style={styles.draggable} onTouchEnd={bottomSheetRef && bottomSheetRef.close()} />

					<ScrollView contentContainerStyle={{ flexGrow: 1, padding: 12 }}>
						<Text style={styles.detailsHeaderText}>Details</Text>
						{renderBrandDetails()}
					</ScrollView>

					<Button
						btnText={props.buttonText}
						onClick={props.onPurchaseClick}
						btnContainerStyle={styles.purchaseButtonStyle}
						disabled={props.submitDisabled}
					/>
				</View>
			</RBSheet>
		</React.Fragment>
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
	},
	detailsHeader: {
		flexDirection: 'row',
	},
	detailsHeaderText: {
		fontSize: 14,
		lineHeight: 16,
		fontFamily: 'SFProText-Bold',
		color: '#838383',
		marginBottom: 8,
	},
	detailsTextColor: {
		color: '#838383',
		fontSize: 14,
		lineHeight: 18,
		fontFamily: 'SFProText-Regular',
		marginRight: 6,
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
	bottomSheetRoot: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		paddingHorizontal: 12,
	},
	draggable: {
		alignSelf: 'center',
		borderRadius: 2,
		opacity: 0.2,
		backgroundColor: '#A7ACB3',
		width: 70,
		height: 4,
		marginTop: 8,
		marginBottom: 36,
	},
	purchaseButtonStyle: {
		marginHorizontal: 12,
		marginTop: 8,
		marginBottom: 20,
	},
});
