import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import HotDeals from './HotDeals';
import HomePageActions from './HomePageActions';
import BottomMenu from './common/BottomMenu';
import colorConstants from '../constants/color';

export default function Home(props) {
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

			<BottomMenu />
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
});
