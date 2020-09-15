import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import colorConstants from '../../constants/color';
import { NeomorphFlex, Neomorph } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import FavouriteButton from './FavouriteButton';

interface NeoTileProps {
	text: string;
	icon?: JSX.Element;
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

	const handleFavouriteClick = () => {
		setFavourite(!isFavourite);
	};

	const buttonTextStyle = {
		...styles.buttonTextStyle,
		color: pressed ? colorConstants.WARM_GREY : colorConstants.FONT_COLOR,
	};

	return (
		<View style={[styles.root, props.style]}>
			<View
				style={styles.container}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<NeomorphFlex
					inner={pressed}
					style={styleConstants.shadowStyles}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					{props.icon}
					<Text style={buttonTextStyle}>{props.text}</Text>
				</NeomorphFlex>
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
		padding: 10,
		flexDirection: 'row',
		flex: 1,
		minHeight: 130,
	},
	container: {
		flex: 1,
	},
	buttonTextStyle: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		lineHeight: 18,
		marginLeft: 10,
		paddingTop: 4,
	},
	favourite: {
		position: 'absolute',
		top: 20,
		right: 20,
	},
});
