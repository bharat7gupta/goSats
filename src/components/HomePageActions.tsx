import React from 'react';
import { StyleSheet, View } from 'react-native';
import NeoButton from './common/NeoButton';
import ShoppingBag from './common/icons/ShoppingBag';
import Star from './common/icons/ShiningStar';

interface HomePageActionsProps {
	onCategoriesClick: () => void;
	onFavouritesClick: () => void;
}

export default function HomePageActions(props: HomePageActionsProps) {
	return (
		<View style={styles.content}>
			<NeoButton
				icon={<ShoppingBag />}
				text="Categories"
				style={styles.buttonStyle}
				onClick={props.onCategoriesClick}
			/>

			<NeoButton
				icon={<Star />}
				text="Favourites"
				style={styles.buttonStyle}
				buttonContentStyle={styles.buttonContentStyle}
				onClick={props.onFavouritesClick}
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
