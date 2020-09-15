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
		<View>
			<ScrollView style={styles.root} contentContainerStyle={{flexGrow: 1}}>
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
		backgroundColor: colorConstants.PRIMARY,
	},
});
