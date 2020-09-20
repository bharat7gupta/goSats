import React, { useState } from 'react';
import { ViewStyle, View, Image } from 'react-native';
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

	return (
		<View
			style={props.style}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchCancel={handleTouchCancel}
		>
			<Neomorph
				inner={pressed}
				style={{ ...styleConstants.smallButtonShadowStyles, width: 36, height: 36, borderRadius: 36/2 }}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				<Image source={require('../../assets/images/share.png')} style={{ width: 16, height: 16 }}/>
			</Neomorph>
		</View>
	);
}
