import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import TextBox from './common/TextBox';
import Button from './common/Button';
import * as StorageHelper from '../helpers/StorageHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import Strings from '../constants/strings';
import { AuthStateContext, AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';
import ShadowButton from './common/ShadowButton';
import OtpInput from './common/OtpInput';
import { ScrollView } from 'react-native-gesture-handler';

const EMAIL_OTP_LENGTH = 6;
const PHONE_OTP_LENGTH = 4;
const RESEND_OTP_TIMEOUT = 15 * 1000; // 15 secs

export default function VerifyEmail(props) {
	const { params } = props.route;
	const { countryCode, phoneNumber, email, totalSats } = params;
	const authState = useContext(AuthStateContext);
	const authDispatch = useContext(AuthDispatchContext);

	const [ header, setHeader ] = useState('');
	const [ subHeader, setSubHeader ] = useState('');
	const [ otp, setOtp ] = useState('');
	const [ otpValid, setOtpValidity ] = useState(false);
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const [ resendOtpVisible, setResendOtpVisibility ] = useState(true);
	const [ continueButtonHintText, setContinueButtonHintText ] = useState('');
	const otpLength = email ? EMAIL_OTP_LENGTH : PHONE_OTP_LENGTH;

	useEffect(() => {
		if (email) {
			const formattedRewardSats = UtilityHelper.getFormattedNumber(totalSats);
			setHeader('Verify Email');
			setSubHeader(`You have won a total reward of ${formattedRewardSats} sats during the pre-launch phase! An OTP has been sent to your email ‘${email}’. Enter it below to verify and claim your reward.`);
		} else {
			setHeader('Verify Number');
			setSubHeader(`A 4 digit code has been sent to (${countryCode}) ${phoneNumber}. Please enter it below.`);
		}

		validateOtpInput('');
	}, [params]);

	const onVerifyClick = async () => {
		if (otpValid) {
			let verificationData;
			setSubmitDisabled(true);

			if (email) {
				verificationData = await ApiHelper.verifyEmail(otp);
			} else {
				verificationData = await ApiHelper.verifyPhone(`${countryCode}${phoneNumber}`, otp);
			}

			Toast.show(verificationData.message);
			setSubmitDisabled(false);

			// console.log(verificationData);

			if (verificationData.error) {
				StorageHelper.setItem('sessionToken', verificationData.data.session);
			} else {
				if (phoneNumber) {
					StorageHelper.setItem('accessToken', verificationData.data.AccessToken);
					StorageHelper.setItem('refreshToken', verificationData.data.RefreshToken);
				}

				if (phoneNumber && verificationData.data.isNewUser) {
					props.navigation.replace('CreateAccount');
				} else {
					StorageHelper.setItem('isLoggedIn', 'true');

					authDispatch({
						type: AuthActions.UPDATE_LOGIN_STATUS,
						isLoggedIn: true,
					});
				}
			}
		}
	};

	const validateOtpInput = (otp: string) => {
		const otpRegex = new RegExp('^\\d{' + otpLength + '}$');
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
		let signInData;
		setResendOtpVisibility(false);
		Toast.show('Trying to send OTP code');

		if (email) {
			signInData = await ApiHelper.requestEmailOtp();
		} else {
			signInData = await ApiHelper.signIn(`${countryCode}${phoneNumber}`);
		}

		const { error, message } = signInData;
		message && Toast.show(signInData.message);

		if (!error) {
			const { session } = signInData.data;
			StorageHelper.setItem('sessionToken', session);
		}

		setTimeout(() => {
			setResendOtpVisibility(true);
		}, RESEND_OTP_TIMEOUT);
	};

	return (
		<View style={styles.root}>
			<Text style={styles.headerText}>{header}</Text>

			<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
				<Text style={styles.subText}>{subHeader}</Text>

				<OtpInput
					length={otpLength}
					otpValues={Array(otpLength).fill('')}
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
			</KeyboardAwareScrollView>

			<View style={{ marginTop: 40 }} />

			<ShadowButton
				buttonText="Continue"
				disabled={!otpValid || submitDisabled}
				hintText={continueButtonHintText}
				onClick={onVerifyClick}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		justifyContent: 'space-between',
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
