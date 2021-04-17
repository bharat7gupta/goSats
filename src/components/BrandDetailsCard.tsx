import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from 'reanimated-bottom-sheet';
import colorConstants from '../constants/color';
import { DetailJson } from '../types/MerchantDetail';
import { ScrollView } from 'react-native-gesture-handler';
import Button from './common/Button';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';
import BrandDetailContent from './BrandDetailContent';

interface BrandDetailsCardProps {
	brandDetails: DetailJson[];
	buttonText: string;
	submitDisabled: boolean;
	onPurchaseClick: () => void;
}

export default function BrandDetailsCard(props: BrandDetailsCardProps) {
	const { brandDetails } = props;

	const bottomSheetRef = React.useRef(null);

	if (!brandDetails || brandDetails.length === 0) {
		return null;
	}

	const handleCardClick = () => {
		if (bottomSheetRef) {
			bottomSheetRef.current.snapTo(0);
		}
	};

	const renderBrandDetails = (headerColor, contentColor) => {
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
	};

	const renderBottomSheetContent = () => {
		return (
			<View style={styles.bottomSheetRoot}>
				<View style={styles.draggable} />

				<ScrollView contentContainerStyle={{ flexGrow: 1, padding: 12 }}>
					<Text style={styles.detailsHeaderText}>Details</Text>
					{renderBrandDetails('#939393', colorConstants.FONT_COLOR)}
				</ScrollView>

				<Button
					btnText={props.buttonText}
					onClick={props.onPurchaseClick}
					btnContainerStyle={styles.purchaseButtonStyle}
					disabled={props.submitDisabled}
				/>
			</View>
		);
	};

	return (
		<React.Fragment>
			<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} onPress={handleCardClick}>
				<View style={styles.details}>
					<View style={styles.detailsHeader}>
						<Text style={styles.detailsHeaderText}>Details</Text>
					</View>

					<BrandDetailContent
						brandDetails={brandDetails}
						headerColor={'#737373'}
						contentColor={'#939393'}
					/>

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
			</TouchableOpacity>

			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[400, 0]}
				borderRadius={10}
				renderContent={renderBottomSheetContent}
			/>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	details: {
		marginHorizontal: 20,
		paddingTop: 16,
		paddingHorizontal: 10,
		backgroundColor: '#403948',
		borderRadius: 10,
		marginTop: 6,
		marginBottom: 12,
		maxHeight: 120,
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
		marginBottom: 12,
	},
	detailsTextColor: {
		color: '#838383',
		fontSize: 14,
		lineHeight: 18,
		fontFamily: 'SFProText-Regular',
		marginRight: 6,
	},
	detailsBottomGradientContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 40,
	},
	bottomSheetRoot: {
		// flex: 1,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		paddingHorizontal: 12,
		height: 400,
		padding: 16,
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
