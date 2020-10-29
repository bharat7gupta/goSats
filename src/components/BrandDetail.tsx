import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, Share, Dimensions } from 'react-native';
import Toast from 'react-native-simple-toast';

import * as ApiHelper from '../helpers/ApiHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import Brand, { BrandType } from '../types/Brand';
import PageLoader from './common/PageLoader';
import ErrorModal from './common/ErrorModal';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import Button from './common/Button';
import MerchantDetail from '../types/MerchantDetail';
import GiftCardDetail from '../types/GiftCardDetail';
import FavouriteButton from './common/FavouriteButton';
import ShareButton from './common/ShareButton';
import GiftVoucher from './common/GiftVoucher';
import BrandInfoWithOffer from './BrandInfoWithOffer';
import BrandDetailsCard from './BrandDetailsCard';
import Header from './common/Header';
import Strings from '../constants/strings';
import * as Config from '../constants/config';
import { StatusBarHeight } from '../helpers/UtilityHelper';
import ChevronLeft from './common/icons/ChevronLeft';
import OrderStatusModal from './OrderStatusModal';
import RazorpayCheckout from 'react-native-razorpay';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
// import merchantDetail from '../mock_jsons/merchant-detail.json';
// import orderStatusWithCongrats from '../mock_jsons/order-status-with-congrats.json';
// import orderStatusWithoutCongrats from '../mock_jsons/order-status-without-congrats.json';

const screen = Dimensions.get('screen');
const { width } = screen;
const logoContainerWidth = width - 44; // 24: outer margin; 20: inner padding
const logoContainerHeight = logoContainerWidth * 0.73;

export default function BrandDetail(props) {
	const authDispatch = useContext(AuthDispatchContext);

	const { route } = props;
	const { id }: { id: string } = route.params;
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');
	const [ brandData, setBrandData ] = useState<MerchantDetail | GiftCardDetail>();
	const [ isFavourite, setFavourite ] = useState(false);
	const [ currentDenomination, setCurrentDenomination ] = useState<string>();
	const [ isModalVisible, setModalVisibility ] = useState(false);
	const [ orderStatus, setOrderStatusData ] = useState(null);
	const [ submitDisabled, setSubmitDisabled ] = useState(false);

	useEffect(() => {
		fetchBrandDetails();
	}, []);

	const fetchBrandDetails = async () => {
		let responseData;

		try {
			responseData = await ApiHelper.fetchMerchantDetail(id);
			// console.log(responseData);

			if (responseData.error) {
				setShowError(responseData.error);
				setErrorMessage(responseData.message);
				return;
			}

			setBrandData(responseData.data);
		} catch (e) {
			authDispatch({
				type: AuthActions.UPDATE_LOGIN_STATUS,
				isLoggedIn: false,
			});
		}
	};

	const handleShareClick = async () => {
		let title;
		let type;

		if (!brandData) {
			return;
		}

		if (brandData.isGiftCard) {
			title = `${brandData.name}`;
			type = 'giftcard';
		} else {
			title = `Buy products on ${brandData.name} to get Satsback`;
			type = 'merchant';
		}

		try {
			const result = await Share.share({
				message: `${title}${`
				`}${Config.SHARE_URL_BASE}${type}/${id}`,
				url: `${Config.SHARE_URL_BASE}${type}/${id}`,
			});
		} catch (error) {}
	};

	const handleFavouriteClick = () => {
		setFavourite(!isFavourite);
	};

	const handleDismissError = () => {
		setShowError(false);
		setErrorMessage('');
		props.navigation.goBack();
	};

	const getButtonText = () => {
		return brandData && brandData.isGiftCard ? 'Buy Voucher' : brandData && `Shop on ${brandData.name}`;
	};

	const onPurchanseClick = async () => {
		if (submitDisabled) {
			return;
		}

		const isGiftCard = brandData && brandData.isGiftCard;

		if (isGiftCard && !currentDenomination) {
			Toast.show('Please select an amount to continue buying the voucher');
			return;
		}

		setLoading(true);
		setSubmitDisabled(true);

		const amount = Number(currentDenomination);

		try {
			const createOrderResponse = await ApiHelper.createOrder(
				id,
				isGiftCard && !isNaN(amount) ? amount : 0,
			);

			if (createOrderResponse.error) {
				Toast.show(createOrderResponse.message);
				setSubmitDisabled(false);
				setLoading(false);
				return;
			}

			const { orderId, redirectURL } = createOrderResponse.data;

			StorageHelper.setItem('orderId', orderId);

			if (isGiftCard) {
				RazorpayCheckout.open(createOrderResponse.data.gatewayDetails).then(async (data) => {
					const verifyPaymentResponse = await ApiHelper.giftCardVerifyPaymant(
						data.razorpay_order_id,
						data.razorpay_payment_id,
						data.razorpay_signature,
						orderId,
					);

					Toast.show(verifyPaymentResponse.message);

					if (!verifyPaymentResponse.error) {
						setOrderStatusData(verifyPaymentResponse.data);
						setModalVisibility(true);
					}

					setSubmitDisabled(false);
					setLoading(false);
				}).catch(() => {
					Toast.show(Strings.SOMETHING_WENT_WRONG);
					setSubmitDisabled(false);
					setLoading(false);
				});
			} else {
				const result = await UtilityHelper.openInAppBrowser(redirectURL);
				setSubmitDisabled(false);

				if (result.type === 'cancel') {
					const orderStatusResponse = await ApiHelper.getOrderStatus(orderId);
					// const orderStatusResponse = orderStatusWithCongrats;
					setOrderStatusData(orderStatusResponse.data);
					setModalVisibility(true);
					setLoading(false);
				} else {
					Toast.show('Order not placed');
					setLoading(false);
				}
			}
		} catch (e) {
			Toast.show(Strings.SOMETHING_WENT_WRONG);
			setSubmitDisabled(false);

			authDispatch({
				type: AuthActions.UPDATE_LOGIN_STATUS,
				isLoggedIn: false,
			});
		}
	};

	const handleOrderStatusModalClose = () => {
		setModalVisibility(false);
		props.navigation.navigate('History', { category: 'Voucher' });
	};

	const renderSubText = () => {
		const { subText } = (brandData || {}) as MerchantDetail;

		if (!subText) {
			return null;
		}

		return (
			<Text style={styles.subText}>{subText}</Text>
		);
	};

	const renderVouchers = () => {
		const { price } = (brandData || {}) as GiftCardDetail;

		if (!price || !price.denominations) {
			return null;
		}

		return (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={true}
				alwaysBounceHorizontal={true}
				contentContainerStyle={styles.giftVoucherContainer}
			>
				{price.denominations.map((denomination, index) => (
					<GiftVoucher
						key={denomination}
						denomination={denomination}
						isSelected={denomination === currentDenomination}
						onClick={() => setCurrentDenomination(denomination)}
						style={{
							...styles.giftVoucher,
							paddingLeft: index === 0 ? 0 : styles.giftVoucher.paddingHorizontal,
						}}
					/>
				))}
			</ScrollView>
		);
	};

	const {
		image: brandImageUrl = '',
		name: brandName = '',
		reward: brandReward = '',
		title: brandTitle = '',
		detailsInJson = [],
	} = brandData || {};

	return (
		<View style={styles.root}>
			<Header
				title="Details"
				showBackButton={true}
				backButtonContent={<ChevronLeft />}
				navigation={props.navigation}
				style={styles.header}
			/>

			<View style={{ paddingHorizontal: 24, paddingVertical: 8, flex: 1 }}>
				<NeomorphFlex
					style={{...styleConstants.shadowStyles, overflow: 'hidden'}}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					<ScrollView contentContainerStyle={styles.container}>
						<View style={styles.innerContent}>
							<View style={{ margin: 20, height: logoContainerHeight, overflow: 'hidden' }}>
								<NeomorphFlex
									inner={true}
									style={styleConstants.shadowStyles}
									darkShadowColor={colorConstants.SHADOW_DARK}
									lightShadowColor={colorConstants.SHADOW_LIGHT}
								>
									<ImageBackground
										source={{ uri: 'https://res.cloudinary.com/dm5xyhl7v/image/upload/v1601829751/sats/pattern_n6dqxr.png'}}
										style={{ width: logoContainerWidth, height: logoContainerHeight }}
										resizeMode="cover"
									/>
									<Image source={{ uri: brandImageUrl }} style={styles.image} />
								</NeomorphFlex>
							</View>

							<View style={styles.brandDetail}>
								<BrandInfoWithOffer name={brandName} reward={brandReward} />

								<View style={styles.actions}>
									<ShareButton
										style={styles.brandDetailActionButton}
										onClick={handleShareClick}
									/>
									<FavouriteButton
										style={styles.brandDetailActionButton}
										onClick={handleFavouriteClick}
										isSelected={isFavourite}
										size={36}
										iconSize={16}
									/>
								</View>
							</View>

							<View style={styles.brandInfo}>
								<Text style={styles.title}>{brandTitle}</Text>
								{renderSubText()}
							</View>

							{renderVouchers()}

							<BrandDetailsCard
								brandDetails={detailsInJson}
								buttonText={getButtonText()}
								submitDisabled={submitDisabled}
								onPurchaseClick={onPurchanseClick}
							/>
						</View>
					</ScrollView>
				</NeomorphFlex>
			</View>

			<Button
				btnText={getButtonText()}
				onClick={onPurchanseClick}
				btnContainerStyle={styles.purchaseButtonStyle}
				disabled={submitDisabled}
			/>

			<PageLoader showLoader={loading} />

			<ErrorModal
				showError={showError}
				errorMessage={errorMessage}
				onDismissError={handleDismissError}
			/>

			<OrderStatusModal
				isVisible={isModalVisible}
				orderStatus={orderStatus}
				onOkayClick={handleOrderStatusModalClose}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		position: 'relative',
		paddingTop: StatusBarHeight,
	},
	header: {
		marginHorizontal: 10,
		backgroundColor: colorConstants.PRIMARY,
	},
	container: {
		flexGrow: 1,
		width: '100%',
		position: 'relative',
	},
	innerContent: {
		minHeight: 250,
		alignSelf: 'stretch',
		position: 'relative',
	},
	image: {
		position: 'absolute',
		justifyContent: 'center',
		width: 160,
		height: 80,
		resizeMode: 'contain',
	},
	brandDetail: {
		paddingHorizontal: 20,
		flexDirection: 'row',
	},
	rewardLine: {
		flexDirection: 'row',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexBasis: 90,
		marginLeft: 10,
	},
	brandDetailActionButton: {
		width: 36,
		height: 36,
	},
	purchaseButtonStyle: {
		marginHorizontal: 24,
		marginTop: 8,
		marginBottom: 20,
	},
	brandInfo: {
		marginTop: 16,
		paddingHorizontal: 20,
	},
	title: {
		fontFamily: 'SFProText-Bold',
		color: colorConstants.ORANGE,
		fontSize: 22,
		lineHeight: 26,
	},
	subText: {
		fontFamily: 'SFProText-Regular',
		fontSize: 15,
		color: colorConstants.FONT_COLOR,
		opacity: 0.7,
		marginTop: 8,
		marginBottom: 10,
	},
	giftVoucherContainer: {
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 10,
		flexDirection: 'row',
	},
	giftVoucher: {
		paddingHorizontal: 10,
	},
});
