import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import colorConstants from '../constants/color';
import * as UtilityHelper from '../helpers/UtilityHelper';
import PhoneInputBox from './common/PhoneInputBox';
import ShadowButton from './common/ShadowButton';

interface AccountLoginProps {
	navigation: any;
}

export default function AccountLogin(props: AccountLoginProps) {
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ continueButtonHintText, setContinueButtonHintText ] = useState('');
	const [ isValidPhoneNumber, setIsValidPhoneNumber ] = useState(false);

	const phoneNumberRegEx = /^[0-9]{10}$/;

	const handlePhoneNumberChange = (text: string) => {
		setPhoneNumber(text);

		// validate
		const isValid = !!(phoneNumber && phoneNumberRegEx.test(text));
		setIsValidPhoneNumber(isValid);
		console.log('isValid', isValid);

		if (!isValid) {
			setContinueButtonHintText('Enter valid phone number');
		} else {
			setContinueButtonHintText('');
		}
	};

	const handleSubmit = () => {
		if (isValidPhoneNumber) {
			// TODO: initiate login
		}
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.root}>
			<View style={styles.topSection}>
				<Text style={styles.heading}>Enter your mobile number</Text>
				<Text style={styles.subText}>We will send a verificaion code to your number.</Text>
			</View>

			<View style={styles.phoneInputBox}>
				<PhoneInputBox onChange={handlePhoneNumberChange} />
			</View>

			<View style={styles.buttonContainer}>
				<ShadowButton
					buttonText="Continue"
					hintText={continueButtonHintText}
					disabled={!isValidPhoneNumber}
					onClick={handleSubmit}
				/>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	topSection: {
		paddingTop: UtilityHelper.StatusBarHeight,
		paddingHorizontal: 18,
	},
	heading: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 28,
	},
	subText: {
		color: '#939393',
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 18,
	},
	phoneInputBox: {
		marginTop: 40,
		paddingHorizontal: 18,
		flex: 1,
		justifyContent: 'flex-start',
	},
	buttonContainer: {
		marginVertical: 10,
	},
});
