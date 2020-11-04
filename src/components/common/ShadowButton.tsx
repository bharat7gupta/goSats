import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import Toast from 'react-native-simple-toast';
import colorConstants from '../../constants/color';

interface ShadowButtonProps {
	buttonText: string;
	disabled: boolean;
	onClick: () => void;
	hintText?: string;
	style?: ViewStyle;
}

export default function ShadowButton(props: ShadowButtonProps) {
	const [ lightShadowColor, setLightShadowColor ] = useState('#38342B');
	const [ backgroundColor, setBackgroundColor ] = useState(colorConstants.PRIMARY);
	const [ buttonTextColor, setButtonTextColor ] = useState('rgba(255, 255, 255, 0.5)');
	const touchableActiveOpacity = 0.5;

	useEffect(() => {
		const { disabled } = props;

		setLightShadowColor(disabled ? '#38342B' : colorConstants.ACTION_BUTTON_SHADOW);
		setBackgroundColor(disabled ? colorConstants.PRIMARY : colorConstants.ACTION_BUTTON);
		setButtonTextColor(disabled ? 'rgba(255, 255, 255, 0.5)' : colorConstants.WHITE);
	}, [props.disabled]);

	const handleClick = () => {
		const { disabled, hintText, onClick } = props;

		if (disabled && hintText) {
			Toast.show(hintText);
		}

		onClick();
	};

	return (
		<TouchableOpacity activeOpacity={touchableActiveOpacity} onPress={handleClick}>
			<View style={[styles.root, props.style]}>
				<NeomorphFlex
					style={{ ...styles.shadowContainer, backgroundColor }}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={lightShadowColor}
				>
					<View style={{ ...styles.button, backgroundColor }}>
						<Text style={{ ...styles.disabledText, color: buttonTextColor }}>
							{props.buttonText}
						</Text>
					</View>
				</NeomorphFlex>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingHorizontal: 18,
		paddingVertical: 14,
	},
	shadowContainer: {
		shadowRadius: 6,
		shadowOpacity: 0.8,
		flexDirection: 'row',
		borderRadius: 10,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	button: {
		width: '100%',
		borderRadius: 10,
	},
	disabledText: {
		color: 'rgba(255, 255, 255, 0.5)',
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 19,
		paddingVertical: 20,
		textAlign: 'center',
	},
});
