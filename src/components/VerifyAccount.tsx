import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import TextBox from './common/TextBox';
import Button from './common/Button';
import * as CognitoHelper from '../helpers/CognitoHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import Strings from '../constants/strings';
import { AuthStateContext, AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';
import ShadowButton from './common/ShadowButton';
import OtpInput from './common/OtpInput';

export default function VerifyEmail(props) {
	const { params } = props.route;
	const { countryCode, phoneNumber } = params;
	const authState = useContext(AuthStateContext);
	const authDispatch = useContext(AuthDispatchContext);

	const [ otp, setOtp ] = useState('');
	const [ otpValid, setOtpValidity ] = useState(false);
	const [ formErrorMessage, setFormErrorMessage ] = useState('');
	const [ continueButtonHintText, setContinueButtonHintText ] = useState('');

	useEffect(() => {
		validateOtpInput('');
	}, []);

	const handleOTPChange = (text) => {
		setOtp(text);
		setFormErrorMessage('');
	};

	const onVerifyClick = () => {
		if (otpValid) {
			props.navigation.navigate('CreateAccount');
		}

		// setFormErrorMessage('');

		// if (!otp || otp.trim().length === 0) {
		// 	setFormErrorMessage('Please enter OTP');
		// 	return;
		// }

		// setVerifyDisabled(true);

		// const username = authState.username;

		// CognitoHelper.confirmUserByOtp({ username, otp }, (err, result) => {
		// 	setVerifyDisabled(false);

		// 	if (err) {
		// 		console.log(err);
		// 		setFormErrorMessage(err.message || Strings.SOMETHING_WENT_WRONG);
		// 		return;
		// 	}

		// 	StorageHelper.setItem('hasVerifiedAccount', 'true').then(() => {
		// 		authDispatch({type: AuthActions.SET_ACCOUNT_VERIFIED});
		// 		Toast.show(Strings.ACCOUNT_VERIFIED, Toast.LONG);
		// 		props.navigation.navigate('SignUpReferralCode');
		// 	});
		// });
	};

	const validateOtpInput = (otp: string) => {
		const otpRegex = new RegExp(`^\\d{4}$`);
		const validity = otpRegex.test(otp);
		const hintText = validity ? '' : 'Enter valid code to complete verification';
		setOtpValidity(validity);
		setContinueButtonHintText(hintText);
	};

	const handleOtpChange = (otp: string) => {
		setOtp(otp);
		validateOtpInput(otp);
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

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.root}>
			<Text style={styles.headerText}>Verify Number</Text>

			<Text style={styles.subText}>
				We have sent 4 digit code to ({countryCode}) {phoneNumber}, please enter it below to complete verification.
			</Text>

			<OtpInput
				length={4}
				onOtpChange={handleOtpChange}
				style={styles.otpInputContainer}
			/>

			<View style={styles.resendContainer}>
				<Text style={styles.codeNotReceivedText}>Didn’t receive the code?</Text>
				<TouchableOpacity activeOpacity={0.6} onPress={onResendOtp}>
					<Text style={styles.resendCode}>Resend Code</Text>
				</TouchableOpacity>
			</View>

			<ShadowButton
				buttonText="Continue"
				disabled={!otpValid}
				hintText={continueButtonHintText}
				onClick={onVerifyClick}
			/>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	headerText: {
		fontSize: 16,
		lineHeight: 28,
		fontFamily: 'SFProText-Bold',
		color: colorConstants.FONT_COLOR,
		paddingTop: UtilityHelper.StatusBarHeight + 20,
		marginBottom: 12,
		textAlign: 'center',
		paddingHorizontal: 20,
	},
	subText: {
		fontSize: 15,
		lineHeight: 30,
		fontFamily: 'SFProText-Regular',
		color: '#939393',
		textAlign: 'center',
		paddingHorizontal: 20,
		marginBottom: 18,
		opacity: 0.7,
	},
	otpInputContainer: {
		marginVertical: 10,
	},
	verifyButtonContainer: {
		marginTop: 24,
		paddingHorizontal: 24,
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
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		color: colorConstants.FONT_COLOR,
	},
	resendContainer: {
		marginTop: 18,
		justifyContent: 'center',
		flexDirection: 'row',
		flex: 1,
	},
	codeNotReceivedText: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 19,
		color: '#939393',
	},
	resendCode: {
		marginLeft: 4,
		fontFamily: 'SFProText-Bold',
		textDecorationLine: 'underline',
		fontSize: 14,
		lineHeight: 19,
		color: '#939393',
	},
});
