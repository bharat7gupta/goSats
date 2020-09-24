import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colorConstants from '../constants/color';
import TextBox from './common/TextBox';
import Button from './common/Button';
import * as CognitoHelper from '../CognitoHelper';

export default function VerifyEmail() {
	const [ otp, setOtp ] = useState('');
	const [ formErrorMessage, setFormErrorMessage ] = useState('');
	const [ verifyDisabled, setVerifyDisabled ] = useState(false);

	const handleOTPChange = (text) => {
		setOtp(text);
		setFormErrorMessage('');
	};

	const onVerifyClick = () => {
		setFormErrorMessage('');

		if (!otp || otp.trim().length === 0) {
			setFormErrorMessage('Please enter OTP');
			return;
		}

		setVerifyDisabled(true);

		// TODO: to provide actual username passed via navigation route from signup page
		CognitoHelper.confirmUserByOtp({ userName: 'Bharat', otp }, (err, result) => {
			setVerifyDisabled(false);

			if (err) {
				setFormErrorMessage(err.message || 'Something went wrong. Please try again!');
				return;
			}

			console.log('call result: ' + result);
		});
	};

	return (
		<View style={styles.root}>
			<Text style={styles.headerText}>Verify your email</Text>

			<Text style={styles.subText}>
				An OTP has been sent to your email. Please enter that below.
			</Text>

			<TextBox
				placeholder="Enter Email OTP"
				onChange={handleOTPChange}
				errorText={formErrorMessage}
			/>

			<Button
				btnText="Verify"
				onClick={onVerifyClick}
				btnContainerStyle={styles.verifyButton}
				disabled={verifyDisabled}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingHorizontal: 20,
	},
	headerText: {
		fontSize: 25,
		lineHeight: 28,
		fontFamily: 'Gilroy-Bold',
		color: colorConstants.FONT_COLOR,
		marginTop: 72,
		marginBottom: 48,
		textAlign: 'center',
	},
	subText: {
		fontSize: 15,
		lineHeight: 30,
		fontFamily: 'Gilroy-Regular',
		color: colorConstants.FONT_COLOR,
		textAlign: 'center',
		paddingHorizontal: 28,
		marginBottom: 72,
		opacity: 0.7,
	},
	formErrorMessage: {
		fontSize: 12,
		lineHeight: 16,
		color: colorConstants.VALIDATION_TEXT_COLOR,
		marginBottom: 4,
	},
	verifyButton: {
		marginTop: 24,
	},
});
