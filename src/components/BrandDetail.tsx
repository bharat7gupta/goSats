import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, Share, ShareContent } from 'react-native';

import * as ApiHelper from '../helpers/ApiHelper';
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
// import merchantDetail from '../mock_jsons/merchant-detail.json';
// import giftCardDetail from '../mock_jsons/giftcard-detail.json';

export default function BrandDetail(props) {
	const { route } = props;
	const { brand }: { brand: Brand } = route.params;
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');
	const [ brandData, setBrandData ] = useState<MerchantDetail | GiftCardDetail>();
	const [ isFavourite, setFavourite ] = useState(false);
	const [ currentDenomination, setCurrentDenomination ] = useState<string>();

	useEffect(() => {
		fetchBrandDetails(brand.id);
	}, []);

	const fetchBrandDetails = async (id: string) => {
		let responseData;
		setLoading(true);

		try {
			if (brand.type === BrandType.MERCHANT) {
				// responseData = merchantDetail;
				responseData = await ApiHelper.fetchMerchantDetail(id);
			} else if (brand.type === BrandType.GIFTCARD) {
				// responseData = giftCardDetail;
				responseData = await ApiHelper.fetchGiftCardDetail(id);
			}

			if (responseData.error) {
				setShowError(responseData.error);
				setErrorMessage(responseData.message);
				return;
			}

			setBrandData(responseData.data);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setShowError(true);
			setErrorMessage(Strings.SOMETHING_WENT_WRONG);
		}
	};

	const handleShareClick = async () => {
		let title;

		if (brand.type === BrandType.MERCHANT) {
			title = `Buy products on ${brand.name} to get Satsback`;
		} else if (brand.type === BrandType.GIFTCARD) {
			title = `${brand.name}`;
		}

		try {
			const result = await Share.share({
				message: `${title}${`
				`}${Config.SHARE_URL_BASE}${brand.type}/${brand.id}`,
				url: `${Config.SHARE_URL_BASE}${brand.type}/${brand.id}`,
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
		return brand && brand.type === BrandType.GIFTCARD ? 'Buy Voucher' : 'Shop Now';
	};

	const onPurchanseClick = () => {

	};

	const renderSubText = () => {
		const { subText } = brandData as MerchantDetail;

		if (!subText) {
			return null;
		}

		return (
			<Text style={styles.subText}>{subText}</Text>
		);
	};

	const renderVouchers = () => {
		const { price } = brandData as GiftCardDetail;

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

	return (
		<View style={styles.root}>
			<ScrollView>
				<Header
					title="Details"
					showBackButton={true}
					navigation={props.navigation}
					style={styles.header}
				/>

				<View style={styles.container}>
					{brand && brandData && (
						<React.Fragment>
							<View style={styles.content}>
								<NeomorphFlex
									style={styleConstants.shadowStyles}
									darkShadowColor={colorConstants.SHADOW_DARK}
									lightShadowColor={colorConstants.SHADOW_LIGHT}
								>
									<View style={styles.innerContent}>
										<View style={{ margin: 20, height: 250, overflow: 'hidden' }}>
											<NeomorphFlex
												inner={true}
												style={styleConstants.shadowStyles}
												darkShadowColor={colorConstants.SHADOW_DARK}
												lightShadowColor={colorConstants.SHADOW_LIGHT}
											>
												<ImageBackground
													source={require('../assets/images/pattern.png')}
													style={{ width: 300, height: 250 }}
													resizeMode="cover"
												/>
												<Image source={{ uri: brand.image }} style={styles.image} />
											</NeomorphFlex>
										</View>

										<View style={styles.brandDetail}>
											<BrandInfoWithOffer
												name={brandData.name}
												reward={brandData.reward}
											/>

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
											<Text style={styles.title}>{brandData.title}</Text>
											{renderSubText()}
										</View>

										{renderVouchers()}

										<BrandDetailsCard brandDetails={brandData.details} />
									</View>
								</NeomorphFlex>
							</View>

							<Button
								btnText={getButtonText()}
								onClick={onPurchanseClick}
								btnContainerStyle={styles.purchaseButtonStyle}
							/>
						</React.Fragment>
					)}

				</View>
			</ScrollView>

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
		paddingHorizontal: 10,
	},
	container: {
		flex: 1,
		width: '100%',
		position: 'relative',
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		alignSelf: 'stretch',
	},
	innerContent: {
		minHeight: 250,
		alignSelf: 'stretch',
		flex: 1,
		overflow: 'hidden',
		position: 'relative',
	},
	image: {
		position: 'absolute',
		justifyContent: 'center',
		width: 160,
		height: 80,
	},
	brandDetail: {
		paddingHorizontal: 20,
		flexDirection: 'row',
	},
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
		marginBottom: 20,
	},
	brandInfo: {
		marginTop: 16,
		paddingHorizontal: 20,
	},
	title: {
		fontFamily: 'Gilroy-Bold',
		color: colorConstants.ORANGE,
		fontSize: 22,
		lineHeight: 26,
	},
	subText: {
		fontFamily: 'Gilroy-Regular',
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
