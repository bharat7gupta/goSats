import React from 'react';
import { ViewStyle, View } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';

import Star from './icons/ShiningStar';
import DimStar from './icons/DimStar';

import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';

interface FavouriteButtonProps {
	isSelected: boolean;
	size?: number;
	iconSize?: number;
	style?: ViewStyle;
	onClick: () => void;
}

export default function FavouriteButton(props: FavouriteButtonProps) {
	const { size = 28, iconSize = 12 } = props;

	return (
		<View style={props.style} onTouchEnd={props.onClick}>
			<Neomorph
				inner={props.isSelected}
				style={{ ...styleConstants.smallButtonShadowStyles, width: size, height: size, borderRadius: size/2 }}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				{props.isSelected && <Star size={iconSize} />}
				{!props.isSelected && <DimStar size={iconSize} />}
			</Neomorph>
		</View>
	);
}
