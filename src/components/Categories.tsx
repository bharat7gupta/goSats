import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';

import * as ApiHelper from '../helpers/ApiHelper';
import colorConstants from '../constants/color';
import Brand from '../types/Brand';
import NeoTile from './common/NeoTile';
import PageLoader from './common/PageLoader';
import ErrorModal from './common/ErrorModal';
import Header from './common/Header';
import Strings from '../constants/strings';
import { StatusBarHeight } from '../helpers/UtilityHelper';
import ChevronLeft from './common/icons/ChevronLeft';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import PageHeader from './PageHeader';
// import brandList from '../mock_jsons/brand-list.json';

export default function Categories(props) {
	const authDispatch = useContext(AuthDispatchContext);

	const [ brandData, setBrandData ] = useState<Brand[]>([]);
	const [ categories, setCategories ] = useState<string[]>([]);
	const [ currentCategory, setCurrentCategory ] = useState<string>(null);
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');
	const [ coordsByCategory, setCoordsByCategory ] = useState({});

	let flatListRef;

	useEffect(() => {
		fetchBrands();
	}, []);

	const fetchBrands = async () => {
		try {
			setLoading(true);
			const data = await ApiHelper.fetchBrands();

			if (data.error) {
				setLoading(false);
				setShowError(true);
				setErrorMessage(Strings.SOMETHING_WENT_WRONG);
				return;
			}

			processData(data);
			setLoading(false);
		} catch (e) {
			authDispatch({
				type: AuthActions.UPDATE_LOGIN_STATUS,
				isLoggedIn: false,
			});
		}
	};

	const processData = (data) => {
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

		const brandsArray = categoriesList.map(category => transformedData[category]);
		const brandsArrayConcatenated = [].concat(...brandsArray);

		setCategories(categoriesList);
		setBrandData(brandsArrayConcatenated);
		setCurrentCategory(categoriesList[0]);
	};

	const handleProductClick = (brand: Brand) => {
		props.navigation.navigate('BrandDetail', { id: brand.merchantId || brand.id });
	};

	const handleDismissError = () => {
		setShowError(false);
		setErrorMessage('');
		props.navigation.goBack();
	};

	const handleCategoryChange = (category: string) => {
		setCurrentCategory(category);

		if (flatListRef && coordsByCategory[category]) {
			flatListRef.scrollTo({
				y: coordsByCategory[category],
				animated: true,
			});
		}
	};

	const onBrandLayout = (item, event) => {
		const { layout } = event.nativeEvent;
		const category = item.category[0];

		if (!coordsByCategory[category] || layout.y > coordsByCategory[category]) {
			setCoordsByCategory({
				...coordsByCategory,
				category: layout.y,
			});
		}
	};

	const renderBrand = ({ item }) => {
		return (
			<TouchableWithoutFeedback
				onPress={() => handleProductClick(item)}
				onLayout={(event) => onBrandLayout(item, event)}
			>
				<View>
					<NeoTile
						brand={item}
						style={{ margin: 10 }}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	return (
		<View style={styles.root}>
			<View style={styles.topSection}>
				<PageHeader title="Category" />
			</View>

			<View style={styles.container}>
				<View style={styles.categoryList}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						{categories.map(category => (
							<View key={category} style={styles.categoryItem} onTouchEnd={() => handleCategoryChange(category)}>
								<Text
									style={{
										...styles.categoryItemText,
										color: category === currentCategory ? colorConstants.FONT_COLOR : colorConstants.GREY_FONT_COLOR,
										borderRightWidth: category === currentCategory ? 3 : 0,
									}}
								>
									{category}
								</Text>
							</View>
						))}
					</ScrollView>
				</View>

				<View style={styles.itemsList}>
					<FlatList
						ref={(ref) => flatListRef = ref}
						data={brandData || []}
						renderItem={renderBrand}
						keyExtractor={item => item.id}
						style={{ flexGrow: 1 }}
					/>
				</View>
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
	topSection: {
		paddingTop: StatusBarHeight + 10,
		backgroundColor: colorConstants.PRIMARY,
		minHeight: 90,
	},
	header: {
		paddingHorizontal: 20,
		paddingBottom: 16,
	},
	container: {
		flex: 1,
		position: 'relative',
		flexDirection: 'row',
	},
	categoryList: {
		flex: 1,
		marginVertical: 18,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		overflow: 'hidden',
	},
	categoryItem: {
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		paddingVertical: 17,
		paddingLeft: 18,
		borderBottomWidth: 1,
		borderBottomColor: '#242424',
	},
	categoryItemText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 24,
		borderRightColor: '#C2622D',
	},
	itemsList: {
		flexGrow: 1,
		marginVertical: 18,
	},
});
