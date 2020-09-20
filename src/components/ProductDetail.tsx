import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import * as ApiHelper from '../ApiHelper';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import BackButton from './common/BackButton';
import Merchant, { MerchantType } from '../types/Merchant';
import PageLoader from './common/PageLoader';
import ErrorModal from './common/ErrorModal';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import Button from './common/Button';
import merchantDetail from '../mock_jsons/merchant-detail.json';
import giftCardDetail from '../mock_jsons/giftcard-detail.json';

export default function ProductDetail(props) {
	const { route } = props;
	const { merchant }: { merchant: Merchant } = route.params;
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');
	const [ productData, setProductData ] = useState();

	useEffect(() => {
		fetchProductDetails(merchant.id);
	}, []);

	const fetchProductDetails = async (id: string) => {
		let data;
		setLoading(true);

		if (merchant.type === MerchantType.MERCHANT) {
			data = await ApiHelper.fetchMerchantDetail(id);
		} else if (merchant.type === MerchantType.GIFTCARD) {
			data = await ApiHelper.fetchGiftCardDetail(id);
		}

		// data = merchantDetail;
		// data = giftCardDetail;

		if (data.error) {
			setShowError(data.error);
			setErrorMessage(data.message);
			return;
		}

		setProductData(data.data);
		setLoading(false);
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
		return merchant && merchant.type === MerchantType.GIFTCARD ? 'Buy Voucher' : 'Shop Now';
	};

	const onPurchanseClick = () => {

	};

	return (
		<View style={styles.root}>
			<View style={styles.header}>
				<BackButton onClick={handleBackButtonClick} />
				<Text style={styles.headerText}>Details</Text>
			</View>

			{merchant && productData && (
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
									<Image source={{ uri: merchant.image }} style={styles.image}/>
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
