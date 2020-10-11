import React, { useState } from 'react';
import { ViewStyle, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';

interface ShareButtonProps {
	buttonSize?: number;
	iconSize?: number;
	style?: ViewStyle;
	onClick: () => void;
}

export default function ShareButton(props: ShareButtonProps) {
	const [ pressed, setPressed ] = useState(false);

	const handlePressIn = () => {
		setPressed(true);
	};

	const handlePressOut = () => {
		setPressed(false);
	};

	const handlePress = () => {
		if (props.onClick) {
			props.onClick();
		}
	};

	return (
		<TouchableWithoutFeedback
			style={props.style}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={handlePress}
		>
			<Neomorph
				inner={pressed}
				style={{ ...styleConstants.smallButtonShadowStyles, width: 36, height: 36, borderRadius: 36/2 }}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				<Image source={{
					uri: 'https://res.cloudinary.com/dm5xyhl7v/image/upload/v1601829750/sats/share_gapnih.png' }} style={{ width: 16, height: 16 }}/>
			</Neomorph>
		</TouchableWithoutFeedback>
	);
}
