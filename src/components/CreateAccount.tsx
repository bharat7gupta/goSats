import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import Header from './common/Header';
import colorConstants from '../constants/color';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TextBox from './common/TextBox';
import * as CognitoHelper from '../helpers/CognitoHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import Strings from '../constants/strings';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';
import ChevronLeft from './common/icons/ChevronLeft';
import SocialSignInPlatforms from './SocialSignInPlatfroms';
import ShadowButton from './common/ShadowButton';

let hasFormError = false;

export default function CreateAccount(props) {
	const authDispatch = useContext(AuthDispatchContext);

	const [ userDisplayName, setUserDisplayName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ referralCode, setReferralCode ] = useState('');
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const [ validations, setValidation ] = useState<any>({});
	const [ formErrorMessage, setFormErrorMessage ] = useState('');

	let usernameRef;
	let referralRef;

	const validateUserDisplayName = (currentUserDisplayName) => {
		let errorMessage = '';

		if (!currentUserDisplayName || currentUserDisplayName.trim().length < 2) {
			errorMessage = Strings.ENTER_VALID_DISPLAY_NAME;
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, userDisplayName: errorMessage }));
	};

	const validateUsername = (currentUsername: string) => {
		let errorMessage = '';

		if (!currentUsername || currentUsername.trim().length < 2) {
			errorMessage = Strings.ENTER_VALID_EMAIL;
			hasFormError = true;
		} else if (!UtilityHelper.isEmail(currentUsername) && !UtilityHelper.isPhoneNumber(currentUsername)) {
			errorMessage = Strings.ENTER_VALID_EMAIL;
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, username: errorMessage }));
	};

	const validateReferral = (currentReferralCode: string) => {
		let errorMessage = '';

		if (!currentReferralCode || currentReferralCode.trim().length === 0) {
			errorMessage = Strings.ENTER_VALID_REFERRAL_CODE;
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, referral: errorMessage }));
	};

	const handleUserDisplayNameChange = (text: string) => {
		setUserDisplayName(text);
		setValidation((prevState) => ({ ...prevState, userDisplayName: '' }));
		setFormErrorMessage('');
	};

	const handleUsernameChange = (text: string) => {
		setUsername(text);
		setValidation((prevState) => ({ ...prevState, username: '' }));
		setFormErrorMessage('');
	};

	const handleReferralChange = (text: string) => {
		setReferralCode(text);
		setValidation((prevState) => ({ ...prevState, referral: '' }));
		setFormErrorMessage('');
	};

	const onSubmit = () => {
		setFormErrorMessage('');

		hasFormError = false;
		validateUserDisplayName(userDisplayName);
		validateUsername(username);
		validateReferral(referralCode);

		if (!hasFormError) {
			setSubmitDisabled(true);

			CognitoHelper.registerUser({ username, password: referralCode, userDisplayName}, (err, result) => {
				setSubmitDisabled(false);
				console.log(err, result);

				if (err) {
					if (err.code === 'UsernameExistsException') {
						Toast.show(`${err.message} Please login.`, Toast.LONG);
						props.navigation.navigate('SignIn');
						return;
					}

					setFormErrorMessage(err.message || Strings.SOMETHING_WENT_WRONG);
					return;
				}

				StorageHelper.setItem('username', username).then(() => {
					StorageHelper.setItem('userDisplayName', userDisplayName).then(() => {
						// const cognitoUser = result.user;
						authDispatch({
							type: AuthActions.SET_CREDENTIALS,
							userDisplayName,
							username,
						});

						props.navigation.navigate('VerifyAccount');
					});
				});
			});
		}
	};

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.root}>
			<Text style={styles.headerText}>Create Account</Text>

			<ScrollView contentContainerStyle={styles.container}>
				<TextBox
					placeholder="Enter Name"
					onChange={handleUserDisplayNameChange}
					onSubmitEditing={() => { usernameRef && usernameRef.focus(); }}
					blurOnSubmit={false}
					errorText={validations.userDisplayName}
				/>

				<TextBox
					placeholder="Email Address"
					onChange={handleUsernameChange}
					onSubmitEditing={() => { referralRef && referralRef.focus(); }}
					setTextInputRef={(ref) => usernameRef = ref}
					blurOnSubmit={false}
					errorText={validations.username}
				/>

				<TextBox
					placeholder="Referral Code (Optional)"
					onChange={handleReferralChange}
					setTextInputRef={(ref) => referralRef = ref}
					blurOnSubmit={true}
					errorText={validations.referral}
				/>
			</ScrollView>

			<ShadowButton
				buttonText="Create Account"
				disabled={!submitDisabled}
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
});
