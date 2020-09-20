import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import * as ApiHelper from '../ApiHelper';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import BackButton from './common/BackButton';
import Brand, { BrandType } from '../types/Brand';
import PageLoader from './common/PageLoader';
import ErrorModal from './common/ErrorModal';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import Button from './common/Button';
import MerchantDetail from '../types/MerchantDetail';
import GiftCardDetail from '../types/GiftCardDetail';
import merchantDetail from '../mock_jsons/merchant-detail.json';
import giftCardDetail from '../mock_jsons/giftcard-detail.json';

export default function BrandDetail(props) {
	const { route } = props;
	const { brand }: { brand: Brand } = route.params;
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');
	const [ productData, setProductData ] = useState<MerchantDetail | GiftCardDetail>();

	useEffect(() => {
		fetchBrandDetails(brand.id);
	}, []);

	const fetchBrandDetails = async (id: string) => {
		let responseData;
		let data: MerchantDetail | GiftCardDetail;
		setLoading(true);

		try {
			if (brand.type === BrandType.MERCHANT) {
				responseData = await ApiHelper.fetchMerchantDetail(id);
				data = responseData.data;
			} else if (brand.type === BrandType.GIFTCARD) {
				responseData = await ApiHelper.fetchGiftCardDetail(id);
				data = responseData.data[0];
			}

			if (responseData.error) {
				setShowError(responseData.error);
				setErrorMessage(responseData.message);
				return;
			}

			setProductData(data);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setShowError(true);
			setErrorMessage('Something went wrong. Please try again!');
		}
	};

	const handleBackButtonClick = () => {
		props.navigation.goBack();
	};

	const handleDismissError = () => {
		setShowError(false);
		setErrorMessage('');
		props.navigation.goBack();
	};

	const getButtonText = () => {
		return brand && brand.type === BrandType.GIFTCARD ? 'Buy Voucher' : 'Shop Now';
	};

	const onPurchanseClick = () => {

	};

	return (
		<View style={styles.root}>
			<View style={styles.header}>
				<BackButton onClick={handleBackButtonClick} />
				<Text style={styles.headerText}>Details</Text>
			</View>

			{brand && productData && (
				<View style={styles.container}>
					<View style={styles.content}>
						<NeomorphFlex
							style={styleConstants.shadowStyles}
							darkShadowColor={colorConstants.SHADOW_DARK}
							lightShadowColor={colorConstants.SHADOW_LIGHT}
						>
							<View style={styles.innerContent}>
								<NeomorphFlex
									inner={true}
									style={styleConstants.shadowStyles}
									darkShadowColor={colorConstants.SHADOW_DARK}
									lightShadowColor={colorConstants.SHADOW_LIGHT}
								>
									<Image source={{ uri: brand.image }} style={styles.image}/>
								</NeomorphFlex>
							</View>
						</NeomorphFlex>
					</View>

					<Button
						btnText={getButtonText()}
						onClick={onPurchanseClick}
						btnContainerStyle={styles.purchaseButtonStyle}
					/>
				</View>
			)}

			<PageLoader showLoader={loading} />

			<ErrorModal
				showError={showError}
				errorMessage={errorMessage}
				onDismissError={handleDismissError}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		position: 'relative',
	},
	header: {
		flexDirection: 'row',
		paddingVertical: 20,
		paddingHorizontal: 10,
		alignItems: 'center',
	},
	headerText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'Gilroy-Bold',
		fontSize: 20,
		lineHeight: 28,
		marginLeft: 10,
		marginTop: 10,
	},
	container: {
		flex: 1,
		width: '100%',
		position: 'relative',
		marginTop: 20,
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		alignSelf: 'stretch',
	},
	innerContent: {
		margin: 20,
		height: 250,
		alignSelf: 'stretch',
		flex: 1,
	},
	image: {
		width: 160,
		height: 80,
	},
	purchaseButtonStyle: {
		marginHorizontal: 24,
		marginBottom: 20,
	},
});
