import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import HomePageActions from './HomePageActions';
import HotDeals from './HotDeals';
import BottomMenu from './common/BottomMenu';
import colorConstants from '../constants/color';

export default function Shop(props) {
	const handleCategoryCLick = () => {
		props.navigation.navigate('Categories');
	};

	const handleFavouritesClick = () => {

	};

	return (
		<View style={styles.root}>
			<ScrollView contentContainerStyle={{flexGrow: 1}}>
				<HomePageActions
					onCategoriesClick={handleCategoryCLick}
					onFavouritesClick={handleFavouritesClick}
				/>
				<HotDeals />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
});
