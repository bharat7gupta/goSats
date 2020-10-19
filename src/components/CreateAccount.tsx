import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import TextBox from './common/TextBox';
import * as StorageHelper from '../helpers/StorageHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import Strings from '../constants/strings';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import ShadowButton from './common/ShadowButton';

export default function CreateAccount(props) {
	const authDispatch = useContext(AuthDispatchContext);

	const [ userDisplayName, setUserDisplayName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ referralCode, setReferralCode ] = useState('');
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const [ validations, setValidation ] = useState<any>({});
	const [ formErrorMessage, setFormErrorMessage ] = useState('');

	let emailRef;
	let referralRef;

	useEffect(() => {
		checkIfCanEnableSubmitButton('', '', '');
	}, []);

	const validateUserDisplayName = (currentUserDisplayName) => {
		let errorMessage = '';

		if (!currentUserDisplayName || currentUserDisplayName.trim().length < 2) {
			errorMessage = Strings.ENTER_VALID_DISPLAY_NAME;
		}

		setValidation((prevState) => ({ ...prevState, userDisplayName: errorMessage }));
	};

	const validateEmail = (currentEmail: string) => {
		let errorMessage = '';

		if (!UtilityHelper.isEmail(currentEmail)) {
			errorMessage = Strings.ENTER_VALID_EMAIL;
		}

		setValidation((prevState) => ({ ...prevState, email: errorMessage }));
	};

	const validateReferral = (currentReferralCode: string) => {
		let errorMessage = '';
		const isValueEntered = currentReferralCode && currentReferralCode.trim().length > 0;

		if (isValueEntered && !UtilityHelper.isReferralCode(currentReferralCode)) {
			errorMessage = Strings.ENTER_VALID_REFERRAL_CODE;
		}

		setValidation((prevState) => ({ ...prevState, referral: errorMessage }));
	};

	const checkIfCanEnableSubmitButton = (un, em, ref) => {
		const invalidUsername = !un || un.trim().length < 2;
		const invalidEmail = !UtilityHelper.isEmail(em);
		const invalidReferralCode = (
			ref && ref.trim().length > 0 &&
			!UtilityHelper.isReferralCode(ref)
		);

		setSubmitDisabled(invalidUsername || invalidEmail || invalidReferralCode);
	};

	const handleUserDisplayNameChange = (text: string) => {
		setUserDisplayName(text);
		setValidation((prevState) => ({ ...prevState, userDisplayName: '' }));
		setFormErrorMessage('');

		checkIfCanEnableSubmitButton(text, email, referralCode);
	};

	const handleEmailChange = (text: string) => {
		setEmail(text);
		setValidation((prevState) => ({ ...prevState, email: '' }));
		setFormErrorMessage('');

		checkIfCanEnableSubmitButton(userDisplayName, text, referralCode);
	};

	const handleReferralChange = (text: string) => {
		setReferralCode(text);
		setValidation((prevState) => ({ ...prevState, referral: '' }));
		setFormErrorMessage('');

		checkIfCanEnableSubmitButton(userDisplayName, email, text);
	};

	const onSubmit = async () => {
		setFormErrorMessage('');

		validateUserDisplayName(userDisplayName);
		validateEmail(email);
		validateReferral(referralCode);

		if (submitDisabled) {
			return;
		}

		setSubmitDisabled(true);

		const userDetailsResponse = await ApiHelper.updateUserDetails(email, userDisplayName, referralCode);

		if (userDetailsResponse.error) {
			setFormErrorMessage(userDetailsResponse.message);
		} else {
			const { totalSats = 0, verifyEmailNow = false } = userDetailsResponse.data;
			Toast.show(userDetailsResponse.message);

			if (verifyEmailNow) {

				props.navigation.navigate('VerifyAccount', { email, totalSats });
			} else {
				StorageHelper.setItem('isLoggedIn', 'true');

				authDispatch({
					type: AuthActions.UPDATE_LOGIN_STATUS,
					isLoggedIn: true,
				});
			}
		}

		setSubmitDisabled(false);
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.root}>
			<Text style={styles.headerText}>Create Account</Text>

			<ScrollView contentContainerStyle={styles.container}>
				<TextBox
					placeholder="Enter Name"
					onChange={handleUserDisplayNameChange}
					onSubmitEditing={() => { emailRef && emailRef.focus(); }}
					blurOnSubmit={false}
					errorText={validations.userDisplayName}
				/>

				<TextBox
					placeholder="Email Address"
					onChange={handleEmailChange}
					onSubmitEditing={() => { referralRef && referralRef.focus(); }}
					setTextInputRef={(ref) => emailRef = ref}
					blurOnSubmit={false}
					errorText={validations.email}
				/>

				<TextBox
					placeholder="Referral Code (Optional)"
					onChange={handleReferralChange}
					setTextInputRef={(ref) => referralRef = ref}
					blurOnSubmit={true}
					errorText={validations.referral}
				/>
			</ScrollView>

			{!!formErrorMessage && <Text style={styles.errorText}>{formErrorMessage}</Text>}

			<ShadowButton
				buttonText="Create Account"
				disabled={submitDisabled}
				onClick={onSubmit}
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
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 28,
		color: colorConstants.FONT_COLOR,
		textAlign: 'center',
		paddingTop: UtilityHelper.StatusBarHeight,
		marginTop: 20,
		marginBottom: 12,
	},
	container: {
		flexGrow: 1,
		paddingTop: 28,
	},
	formErrorMessage: {
		fontSize: 12,
		lineHeight: 16,
		color: colorConstants.VALIDATION_TEXT_COLOR,
		marginBottom: 4,
		minHeight: 42,
	},
	socialSignUp: {
		marginTop: 28,
		justifyContent: 'center',
	},
	horizontalLine: {
		width: '100%',
		borderRadius: 100,
		backgroundColor: 'rgba(127, 132, 137, 0.25)',
		height: 3,
	},
	socialSignUpHeaderText: {
		fontSize: 20,
		lineHeight: 28,
		fontFamily: 'SFProText-Bold',
		color: colorConstants.FONT_COLOR,
		textAlign: 'center',
		marginTop: 28,
	},
	signInButton: {
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	signInButtonText: {
		color: colorConstants.WARM_GREY,
	},
	errorText: {
		fontSize: 12,
		lineHeight: 16,
		minHeight: 16,
		fontFamily: 'SFProText-Regular',
		color: colorConstants.VALIDATION_TEXT_COLOR,
		marginTop: 4,
		marginHorizontal: 18,
		textAlign: 'center',
	},
});
