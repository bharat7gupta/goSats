import React from 'react';
import { ViewStyle } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import colorConstants from '../../constants/color';
import styleConstants from '../../constants/style';
import Button from './Button';

interface AcitonButtonWithShadowProps {
	buttonText: string;
	disabled: boolean;
	btnContainerStyle?: ViewStyle;
	onClick: () => void;
}

export default function AcitonButtonWithShadow(props: AcitonButtonWithShadowProps) {
	return (
		<NeomorphFlex
			style={styleConstants.shadowStyles}
			darkShadowColor={colorConstants.SHADOW_DARK}
			lightShadowColor={props.disabled ? colorConstants.PRIMARY : colorConstants.ACTION_BUTTON_SHADOW}
		>
			<Button
				btnText="Sign Up"
				onClick={props.onClick}
				disabled={props.disabled}
				btnContainerStyle={props.btnContainerStyle}
			/>
		</NeomorphFlex>
	);
}
