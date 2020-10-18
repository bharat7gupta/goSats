import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import PhoneInputBox from './common/PhoneInputBox';
import ShadowButton from './common/ShadowButton';
import Strings from '../constants/strings';

interface AccountLoginProps {
	navigation: any;
}

export default function AccountLogin(props: AccountLoginProps) {
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ continueButtonHintText, setContinueButtonHintText ] = useState('');
	const [ isValidPhoneNumber, setIsValidPhoneNumber ] = useState(false);
	const [ submitDisabled, setSubmitDisabled ] = useState(false);

	const phoneNumberRegEx = /^[0-9]{10}$/;

	useEffect(() => {
		validatePhoneNumber(phoneNumber);
	}, []);

	const handlePhoneNumberChange = (text: string) => {
		setPhoneNumber(text);
		validatePhoneNumber(text);
	};

	const validatePhoneNumber = (phoneNumber: string) => {
		const isValid = !!(phoneNumber && phoneNumberRegEx.test(phoneNumber));
		setIsValidPhoneNumber(isValid);

		if (!isValid) {
			setContinueButtonHintText('Enter valid phone number');
		} else {
			setContinueButtonHintText('');
		}
	};

	const handleSubmit = async () => {
		const countryCode = '+91';

		if (!isValidPhoneNumber || submitDisabled) {
			return;
		}

		try {
			setSubmitDisabled(true);
			const signInData = await ApiHelper.signIn(`${countryCode}${phoneNumber}`);
			setSubmitDisabled(false);

			if (signInData.message) {
				Toast.show(signInData.message);
			}

			if (!signInData.error) {
				props.navigation.navigate('VerifyAccount', { countryCode, phoneNumber });
			}
		} catch (e) {
			Toast.show(Strings.SOMETHING_WENT_WRONG);
			setSubmitDisabled(false);
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
					disabled={!isValidPhoneNumber || submitDisabled}
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
		paddingTop: UtilityHelper.StatusBarHeight + 20,
		paddingHorizontal: 18,
	},
	heading: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 28,
		textAlign: 'center',
		marginBottom: 12,
	},
	subText: {
		color: '#939393',
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 18,
		textAlign: 'center',
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
