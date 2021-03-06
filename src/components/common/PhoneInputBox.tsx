import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import colorConstants from '../../constants/color';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import CaretDown from './icons/CaretDown';
import { DEFAULT_TOUCHABLE_OPACITY, ALLOWED_COUNTRIES_LIST } from '../../constants/config';

interface PhoneInputBoxProps {
	onCountryChange: (code: string) => void;
	onNumberChange: (text: string) => void;
}

export default function PhoneInputBox(props: PhoneInputBoxProps) {
	const [ country, setCountry ] = useState({ cca2: 'IN', callingCode: ['91'] });
	const [ countryModalVisibility, setCountryModalVisibility ] = useState(false);

	const handleChange = (event) => {
		const { text } = event.nativeEvent;
		props.onNumberChange(text);
	};

	const onCountryChange = (selectedCountry) => {
		setCountry(selectedCountry);
		props.onCountryChange(selectedCountry.callingCode[0]);
	};

	return (
		<NeomorphFlex
			inner={true}
			style={styles.root}
			darkShadowColor={colorConstants.SHADOW_DARK}
			lightShadowColor={colorConstants.SHADOW_LIGHT}
		>
			<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} onPress={() => setCountryModalVisibility(true)}>
				<View style={styles.countryCodeContainer}>
					<View style={styles.flagContainer}>
						<View style={styles.flag}>
							<CountryPicker
								theme={DARK_THEME}
								countryCode={country.cca2}
								withFlag={true}
								withEmoji={false}
								withFlagButton={true}
								onSelect={onCountryChange}
								visible={countryModalVisibility}
								onClose={() => setCountryModalVisibility(false)}
								countryCodes={ALLOWED_COUNTRIES_LIST}
							/>
						</View>

					</View>

					<Text style={styles.countryCode}>(+{country.callingCode[0]})</Text>

					<CaretDown />
				</View>
			</TouchableOpacity>

			<TextInput
				style={styles.input}
				underlineColorAndroid="transparent"
				placeholder="9090909090"
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
	countryCodeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 10,
		borderRightColor: 'rgba(255, 255, 255, 0.2)',
		borderRightWidth: 1,
	},
	flagContainer: {
		marginLeft: 14,
		marginRight: 8,
		marginTop: 2,
		width: Platform.OS === 'ios' ? 19 : 20,
		height: Platform.OS === 'ios' ? 19 : 20,
		borderRadius: 12,
		overflow: 'hidden',
	},
	flag: {
		marginLeft: Platform.OS === 'ios' ? -5.5 : -5,
		marginTop: Platform.OS === 'ios' ? -10 : -5,
	},
	countryCode: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		lineHeight: 19,
		color: colorConstants.WHITE,
		paddingRight: 8,
		paddingVertical: 8,
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
