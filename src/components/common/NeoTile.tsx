import React, { useState } from 'react';
import { StyleSheet, View, Text, ViewStyle, Image } from 'react-native';
import colorConstants from '../../constants/color';
import { NeomorphFlex, Neomorph } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import FavouriteButton from './FavouriteButton';
import Brand from '../../types/Brand';
import BitcoinOffer from './icons/BitcoinOffer';

interface NeoTileProps {
	brand: Brand;
	style?: ViewStyle;
	onClick?: () => void;
}

export default function NeoTile(props: NeoTileProps) {
	const [ pressed, setPressed ] = useState(false);
	const [ isFavourite, setFavourite ] = useState(false);

	const handleTouchStart = () => {
		setPressed(true);
	};

	const handleTouchEnd = () => {
		setPressed(false);

		if (props.onClick) {
			props.onClick();
		}
	};

	const handleTouchCancel = () => {
		setPressed(false);
	};

	const handleFavouriteClick = () => {
		setFavourite(!isFavourite);
	};

	const { brand, style } = props;

	if (!brand) {
		return null;
	}

	return (
		<View style={[styles.root, style]}>
			<View style={styles.container}>
				<View
					style={styles.tileContainer}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
					onTouchCancel={handleTouchCancel}
				>
					<NeomorphFlex
						inner={pressed}
						style={styleConstants.shadowStyles}
						darkShadowColor={colorConstants.SHADOW_DARK}
						lightShadowColor={colorConstants.SHADOW_LIGHT}
					>
						<Image source={{ uri: brand.image }} style={styles.image}/>
					</NeomorphFlex>
				</View>

				<Text style={styles.name}>{brand.name}</Text>

				<View style={styles.rewardLine}>
					<BitcoinOffer />
					<Text style={styles.rewardLineText}>{brand.reward}</Text>
				</View>
			</View>

			<FavouriteButton
				isSelected={isFavourite}
				style={styles.favourite}
				onClick={handleFavouriteClick}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'relative',
		flexDirection: 'row',
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 10,
	},
	tileContainer: {
		height: 130,
	},
	buttonTextStyle: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		lineHeight: 18,
		paddingTop: 4,
	},
	favourite: {
		position: 'absolute',
		top: 10,
		right: 20,
	},
	image: {
		width: 100,
		height: 50,
	},
	name: {
		marginTop: 8,
		color: colorConstants.FONT_COLOR,
		opacity: 0.85,
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		lineHeight: 28,
	},
	rewardLine: {
		flexDirection: 'row',
	},
	rewardLineText: {
		color: colorConstants.DARK_GREY,
		fontSize: 11,
		lineHeight: 13,
		marginLeft: 4,
		marginTop: 1,
	},
});
