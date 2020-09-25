import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import TextBox from './common/TextBox';
import Button from './common/Button';
import * as CognitoHelper from '../helpers/CognitoHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import * as Utils from '../helpers/UtilityHelper';
import Strings from '../constants/strings';
import { AuthStateContext, AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';

export default function VerifyEmail(props) {
	const authState = useContext(AuthStateContext);
	const authDispatch = useContext(AuthDispatchContext);

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

		const username = authState.username;

		CognitoHelper.confirmUserByOtp({ username, otp }, (err, result) => {
			setVerifyDisabled(false);

			if (err) {
				console.log(err);
				setFormErrorMessage(err.message || Strings.SOMETHING_WENT_WRONG);
				return;
			}

			StorageHelper.setItem('hasVerifiedAccount', 'true');
			authDispatch({type: AuthActions.SET_ACCOUNT_VERIFIED});

			Toast.show(Strings.ACCOUNT_VERIFIED, Toast.LONG);
			props.navigation.navigate('SignUpReferralCode');
		});
	};

	const onResendOtp = async () => {
		const username = authState.username;

		CognitoHelper.resendConfirmationCode({ username }, (err) => {
			if (err) {
				const errorMessage = err.message || Strings.SOMETHING_WENT_WRONG;
				Toast.show(errorMessage, Toast.LONG);
				return;
			}

			Toast.show(Strings.OTP_SENT, Toast.LONG);
		});
	};

	const accountByText = Utils.isEmail(authState.username) ? 'email' : 'mobile number';

	return (
		<KeyboardAwareScrollView style={styles.root}>
			<Text style={styles.headerText}>Verify your account</Text>

			<Text style={styles.subText}>
				An OTP has been sent to your {accountByText}. Please enter that below.
			</Text>

			<TextBox
				placeholder="Enter OTP"
				onChange={handleOTPChange}
				errorText={formErrorMessage}
			/>

			<Button
				btnText="Verify"
				onClick={onVerifyClick}
				btnContainerStyle={styles.verifyButton}
				disabled={verifyDisabled}
			/>

			<View style={styles.resendOtpContainer}>
				<TouchableOpacity onPress={onResendOtp} style={styles.resendOtpButton}>
					<Text style={styles.resendOtpButtonText}>Resend OTP</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
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
		marginBottom: 52,
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
	resendOtpContainer: {
		marginVertical: 32,
		borderRadius: 10,
		alignItems: 'center',
	},
	resendOtpButton: {
		width: 110,
		paddingVertical: 8,
	},
	resendOtpButtonText: {
		textAlign: 'center',
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		color: colorConstants.FONT_COLOR,
	},
});
