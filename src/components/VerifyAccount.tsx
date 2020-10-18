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
import * as ApiHelper from '../helpers/ApiHelper';
import Strings from '../constants/strings';
import { AuthStateContext, AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';
import ShadowButton from './common/ShadowButton';
import OtpInput from './common/OtpInput';

const RESEND_OTP_TIMEOUT = 15 * 1000; // 15 secs

export default function VerifyEmail(props) {
	const { params } = props.route;
	const { countryCode, phoneNumber, email } = params;
	const authState = useContext(AuthStateContext);
	const authDispatch = useContext(AuthDispatchContext);

	const [ header, setHeader ] = useState('');
	const [ subHeader, setSubHeader ] = useState('');
	const [ otp, setOtp ] = useState('');
	const [ otpValid, setOtpValidity ] = useState(false);
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const [ resendOtpVisible, setResendOtpVisibility ] = useState(true);
	const [ formErrorMessage, setFormErrorMessage ] = useState('');
	const [ continueButtonHintText, setContinueButtonHintText ] = useState('');

	useEffect(() => {
		let headerText;
		let subHeaderText;

		if (email) {
			headerText = 'Verify Email';
			subHeaderText = email;
		} else {
			headerText = 'Verify Number';
			subHeaderText = `(${countryCode}) ${phoneNumber}`;
		}

		setHeader(headerText);
		setSubHeader(`We have sent 4 digit code to ${subHeaderText}, please enter it below to complete verification.`);

		validateOtpInput('');
	}, []);

	const onVerifyClick = async () => {
		if (otpValid) {
			let verificationData;
			setSubmitDisabled(false);

			if (email) {
				verificationData = await ApiHelper.verifyPhone(`${countryCode}${phoneNumber}`, otp);
			} else {
				verificationData = await ApiHelper.verifyEmail(otp);
			}

			setSubmitDisabled(true);
			props.navigation.navigate('CreateAccount');
		}
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
		setResendOtpVisibility(false);
		Toast.show('Trying to send OTP code');
		const signInData = await ApiHelper.signIn(`${countryCode}${phoneNumber}`);

		if (signInData.message) {
			Toast.show(signInData.message);
		}

		setTimeout(() => {
			setResendOtpVisibility(true);
		}, RESEND_OTP_TIMEOUT);
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.root}>
			<Text style={styles.headerText}>{header}</Text>
			<Text style={styles.subText}>{subHeader}</Text>

			<OtpInput
				length={4}
				onOtpChange={handleOtpChange}
				style={styles.otpInputContainer}
			/>

			{resendOtpVisible && (
				<View style={styles.resendContainer}>
					<Text style={styles.codeNotReceivedText}>Didn’t receive the code?</Text>
					<TouchableOpacity activeOpacity={0.6} onPress={onResendOtp}>
						<Text style={styles.resendCode}>Resend Code</Text>
					</TouchableOpacity>
				</View>
			)}

			<View style={{ flex: 1 }} />

			<ShadowButton
				buttonText="Continue"
				disabled={!otpValid || submitDisabled}
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
