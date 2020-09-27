import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NeoButton from './common/NeoButton';
import ShoppingBag from './common/icons/ShoppingBag';
import Star from './common/icons/ShiningStar';
import colorConstants from '../constants/color';

interface HomePageActionsProps {
	onCategoriesClick: () => void;
	onFavouritesClick: () => void;
}

enum ButtonType {
	CATEGORIES = 'CATEGORIES',
	FAVOURITES = 'FAVOURITES',
}

const buttons = [
	{ type: ButtonType.CATEGORIES, icon: <ShoppingBag />, text: 'Categories' },
	{ type: ButtonType.FAVOURITES, icon: <Star />, text: 'Favourites' },
];

export default function HomePageActions(props: HomePageActionsProps) {

	const getButtonClickHandler = (buttonType: ButtonType) => {
		switch (buttonType) {
			case ButtonType.CATEGORIES:
				return props.onCategoriesClick;
			case ButtonType.FAVOURITES:
				return props.onFavouritesClick;
		}
	};

	return (
		<View style={styles.content}>
			{buttons.map(button => (
				<NeoButton
					key={button.text}
					style={styles.buttonRootStyle}
					onClick={getButtonClickHandler(button.type)}
				>
					<View style={styles.buttonContentStyle}>
						{button.icon}
						<Text style={styles.buttonTextStyle}>{button.text}</Text>
					</View>
				</NeoButton>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 10,
	},
	buttonRootStyle: {
		flexBasis: '50%',
	},
	buttonContentStyle: {
		width: '100%',
		paddingVertical: 16,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	buttonTextStyle: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		lineHeight: 18,
		marginLeft: 10,
		marginTop: 2,
	},
});
