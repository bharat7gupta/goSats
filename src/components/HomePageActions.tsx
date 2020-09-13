import React from 'react';
import { StyleSheet, View } from 'react-native';
import NeoButton from './common/NeoButton';
import ShoppingBag from './common/icons/ShoppingBag';
import Star from './common/icons/ShiningStar';

export default function HomePageActions() {
	const handleCategoryCLick = () => {

	};

	const handleFavouritesClick = () => {

	};

	return (
		<View style={styles.content}>
			<NeoButton
				icon={<ShoppingBag />}
				text="Categories"
				style={styles.buttonStyle}
				onClick={handleCategoryCLick}
			/>

			<NeoButton
				icon={<Star />}
				text="Favourites"
				style={styles.buttonStyle}
				buttonContentStyle={styles.buttonContentStyle}
				onClick={handleFavouritesClick}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 10,
	},
	buttonStyle: {
		flexBasis: '50%',
	},
	buttonContentStyle: {
		paddingVertical: 14,
	},
});
