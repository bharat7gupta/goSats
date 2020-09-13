import React from 'react';
import { ViewStyle, View } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';

import Star from './icons/ShiningStarSmall';
import DimStar from './icons/DimStar';

import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';

interface FavouriteButtonProps {
	isSelected: boolean;
	style?: ViewStyle;
	onClick: () => void;
}

export default function FavouriteButton(props) {
	return (
		<View style={props.style} onTouchEnd={props.onClick}>
			<Neomorph
				inner={props.isSelected}
				style={styleConstants.smallButtonShadowStyles}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				{props.isSelected && <Star />}
				{!props.isSelected && <DimStar />}
			</Neomorph>
		</View>
	);
}
