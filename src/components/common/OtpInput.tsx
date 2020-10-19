import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ViewStyle } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import colorConstants from '../../constants/color';

interface OtpInputProps {
	length: number;
	otpValues?: string[];
	onOtpChange: (otp: string) => void;
	style?: ViewStyle;
}

export default function OtpInput(props: OtpInputProps) {
	const [ currentIndex, setCurrentIndex ] = useState(0);
	const [ otpValues, setOtpValues ] = useState(props.otpValues || Array(props.length).fill(''));
	const refs = Array(props.length).fill(null);

	const setFocus = (index: number) => {
		if (refs && refs[index]) {
			refs[index].focus();
		}
	};

	const handleKeyPress = (event) => {
		const { text, key } = event.nativeEvent;

		// move to previous field on backspace
		if ((!text || text === '') && key === 'Backspace') {
			const index = Math.max(currentIndex - 1, 0);
			setFocus(index);
			setCurrentIndex(index);
		}
	};

	const handleChange = (event, index) => {
		const { text } = event.nativeEvent;
		const newOtpValues = otpValues.map((o, i) => i === index ? text : o);
		setOtpValues(newOtpValues);

		// move to next field on digit enter
		if (text && text.length === 1) {
			const nextIndex = Math.min(currentIndex + 1, props.length - 1);
			setCurrentIndex(nextIndex);
			setFocus(nextIndex);
		}

		props.onOtpChange(newOtpValues.map(o => o || ' ').join(''));
	};

	const handleFocus = (index: number) => {
		setCurrentIndex(index);
		setFocus(index);
	};

	return (
		<View style={[styles.root, props.style]}>
			{Array(props.length).fill(1).map((v, index) => (
				<Neomorph
					key={index}
					inner={true}
					style={styles.otpInput}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					<TextInput
						style={styles.input}
						value={otpValues[index]}
						underlineColorAndroid="transparent"
						keyboardType="numeric"
						autoCapitalize="none"
						maxLength={1}
						ref={ref => refs[index] = ref}
						onChange={(event) => handleChange(event, index)}
						onFocus={() => handleFocus(index)}
						onKeyPress={handleKeyPress}
					/>
				</Neomorph>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		justifyContent: 'center',
		flexDirection: 'row',
	},
	otpInput: {
		shadowRadius: 3,
		shadowOpacity: 0.8,
		flexDirection: 'row',
		borderRadius: 10,
		width: 46,
		height: 60,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 10,
		marginHorizontal: 5,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
	},
	input: {
		height: 56,
		backgroundColor: colorConstants.TEXTBOX_BACKGROUND,
		flex: 1,
		paddingHorizontal: 12,
		color: colorConstants.WHITE,
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 19,
		textAlign: 'center',
	},
});
