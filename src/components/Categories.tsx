import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import * as ApiHelper from '../../src/ApiHelper';
import colorConstants from '../constants/color';
import BackButton from './common/BackButton';
import Merchant from '../types/Merchant';
import NeoTile from './common/NeoTile';
import merchantList from '../mock_jsons/merchant-list.json';

export default function Categories(props) {
	const [ merchantData, setMerchantData ] = useState<{key?: Merchant[]}>({});
	const [ categories, setCategories ] = useState<string[]>([]);
	const [ currentCategory, setCurrentCategory ] = useState<string>(null);

	useEffect(() => {
		fetchMerchants();
	}, []);

	const fetchMerchants = async () => {
		const data = await ApiHelper.fetchMerchants();
		processData(data);
	};

	const processData = (data) => {
		if (data.error) {
			// TODO: Show toast here
			return;
		}

		const merchants = merchantList.data;
		// const merchants = data.data;
		const transformedData = merchants.reduce((result, current) => {
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
		setMerchantData(transformedData);
		setCurrentCategory(categoriesList[0]);
		// console.log(transformedData);
	};

	const handleBackButtonClick = () => {
		props.navigation.goBack();
	};

	const currentMerchants = merchantData[currentCategory];

	return (
		<View style={styles.root}>
			<View style={styles.header}>
				<BackButton onClick={handleBackButtonClick} />
				<Text style={styles.headerText}>Categories</Text>
			</View>

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
						{currentMerchants && currentMerchants.map((merchant, index: number) => (
							<View key={merchant.id}>
								{index === 0 && <View style={{ paddingTop: 10 }} />}
								<NeoTile
									merchant={merchant}
									style={{ margin: 10 }}
								/>
								{(index === currentMerchants.length - 1) && <View style={{ marginBottom: 100 }} />}
							</View>
						))}
					</ScrollView>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
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
