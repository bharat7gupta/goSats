import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import colorConstants from '../../constants/color';
import India from './icons/flags/India';
import { TextInput } from 'react-native-gesture-handler';

interface PhoneInputBoxProps {
	onChange: (text: string) => void;
}

export default function PhoneInputBox(props: PhoneInputBoxProps) {
	const handleChange = (event) => {
		const { text } = event.nativeEvent;
		props.onChange(text);
	};

	return (
		<NeomorphFlex
			inner={true}
			style={styles.root}
			darkShadowColor={colorConstants.SHADOW_DARK}
			lightShadowColor={colorConstants.SHADOW_LIGHT}
		>
			<View style={styles.flag}>
				<India />
			</View>

			<Text style={styles.countryCode}>(+91)</Text>

			<TextInput
				style={styles.input}
				underlineColorAndroid="transparent"
				placeholder="90909 09090"
				placeholderTextColor={colorConstants.TEXTBOX_PLACEHOLDER_TEXT_COLOR}
				keyboardType="numeric"
				autoCapitalize="none"
				maxLength={10}
				onChange={handleChange}
			/>
		</NeomorphFlex>
	);
}

const styles = StyleSheet.create({
	root: {
		shadowRadius: 3,
		shadowOpacity: 0.8,
		flexDirection: 'row',
		borderRadius: 10,
		height: 60,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
	},
	flag: {
		marginLeft: 14,
		marginRight: 8,
		borderRadius: 10,
		overflow: 'hidden',
	},
	countryCode: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		lineHeight: 19,
		color: colorConstants.WHITE,
		paddingRight: 10,
		paddingVertical: 8,
		borderRightColor: 'rgba(255, 255, 255, 0.2)',
		borderRightWidth: 1,
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
	},
});
