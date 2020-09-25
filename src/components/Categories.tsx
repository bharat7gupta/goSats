import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import * as ApiHelper from '../helpers/ApiHelper';
import colorConstants from '../constants/color';
import Brand from '../types/Brand';
import NeoTile from './common/NeoTile';
import PageLoader from './common/PageLoader';
import ErrorModal from './common/ErrorModal';
import Header from './common/Header';
import Strings from '../constants/strings';
// import brandList from '../mock_jsons/brand-list.json';

export default function Categories(props) {
	const [ brandData, setBrandData ] = useState<{key?: Brand[]}>({});
	const [ categories, setCategories ] = useState<string[]>([]);
	const [ currentCategory, setCurrentCategory ] = useState<string>(null);
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');

	useEffect(() => {
		fetchBrands();
	}, []);

	const fetchBrands = async () => {
		try {
			setLoading(true);
			const data = await ApiHelper.fetchBrands();
			processData(data);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setShowError(true);
			setErrorMessage(Strings.SOMETHING_WENT_WRONG);
		}
	};

	const processData = (data) => {
		// data = brandList;
		if (data.error) {
			setShowError(data.error);
			setErrorMessage(data.message);
			return;
		}

		const brands = data.data;
		const transformedData = brands.reduce((result, current) => {
			if (current.category) {
				current.category.forEach(c => {
					result[c] = result[c] || [];
					result[c].push(current);
				});
			}

			return result;
		}, {});

		const categoriesList = Object.keys(transformedData);
		setCategories(categoriesList);
		setBrandData(transformedData);
		setCurrentCategory(categoriesList[0]);
		// console.log(transformedData);
	};

	const handleProductClick = (brand: Brand) => {
		props.navigation.navigate('BrandDetail', { brand });
	};

	const handleDismissError = () => {
		setShowError(false);
		setErrorMessage('');
		props.navigation.goBack();
	};

	const currentBrands = brandData[currentCategory];

	return (
		<View style={styles.root}>
			<Header
				title="Categories"
				showBackButton={true}
				navigation={props.navigation}
				style={styles.header}
			/>

			<View style={styles.container}>
				<View style={styles.categoryList}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						{categories.map(category => (
							<View key={category} style={styles.categoryItem} onTouchEnd={() => setCurrentCategory(category)}>
								<Text
									style={{
										...styles.categoryItemText,
										color: category === currentCategory ? colorConstants.ORANGE : colorConstants.FONT_COLOR,
										opacity: category === currentCategory ? 1 : 0.3,
									}}
								>
									{category}
								</Text>
							</View>
						))}
					</ScrollView>
				</View>

				<View style={styles.itemsList}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						{currentBrands && currentBrands.map((brand, index: number) => (
							<View key={brand.id} onTouchEnd={() => handleProductClick(brand)}>
								{index === 0 && <View style={{ paddingTop: 10 }} />}
								<NeoTile
									brand={brand}
									style={{ margin: 10 }}
								/>
								{(index === currentBrands.length - 1) && <View style={{ marginBottom: 100 }} />}
							</View>
						))}
					</ScrollView>
				</View>

				<PageLoader showLoader={loading} />
			</View>

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
		position: 'relative',
		flexDirection: 'row',
	},
	categoryList: {
		paddingLeft: 18,
		paddingVertical: 20,
		flex: 1,
	},
	categoryItem: {
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 10,
		marginBottom: 10,
	},
	categoryItemText: {
		fontFamily: 'Gilroy-Bold',
		fontSize: 14,
		lineHeight: 22,
	},
	itemsList: {
		flexGrow: 1,
	},
});
