import React, { useState, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import colorConstants from '../constants/color';
import TextBox from './common/TextBox';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';
import * as CognitoHelper from '../helpers/CognitoHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import { AuthStateContext, AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import Strings from '../constants/strings';

export default function SignUpReferralCode(props) {
	const authState = useContext(AuthStateContext);
	const authDispatch = useContext(AuthDispatchContext);

	const [ referralCode, setReferralCode ] = useState('');
	const [ formErrorMessage, setFormErrorMessage ] = useState('');
	const [ startButtonDisabled, setVerifyDisabled ] = useState(false);

	const handleReferralCodeChange = (text) => {
		setReferralCode(text);
		setFormErrorMessage('');
	};

	const onStartStackingClick = async () => {
		setFormErrorMessage('');
		setVerifyDisabled(true);

		if (referralCode && referralCode.trim().length > 0) {
			// TODO: Check if valid referral code
			setVerifyDisabled(false);
		} else {
			const username = authState.username;
			const password = authState.password;

			CognitoHelper.loginUser({ username, password }, (result) => {
				const cognitoUser = result.user;
				const userDisplayName = cognitoUser.getUsername();
				const accessToken = result.getAccessToken().getJwtToken();

				StorageHelper.setItem('userDisplayName', userDisplayName);
				StorageHelper.setItem('accessToken', accessToken);
				StorageHelper.setItem('isLoggedIn', 'true')
					.then(() => {
						authDispatch({
							type: AuthActions.UPDATE_LOGIN_STATUS,
							isLoggedIn: true,
						});
					});
			}, (err) => {
				const errorMessage = err.message || Strings.SOMETHING_WENT_WRONG;
				setFormErrorMessage(errorMessage);
				setVerifyDisabled(false);
			});
		}
	};

	return (
		<KeyboardAwareScrollView style={styles.root}>
			<Text style={styles.subText}>
				Your set!  Enter a referral code if you have one or leave this field blank.
			</Text>

			<TextBox
				placeholder="Referral Code (OPTIONAL)"
				onChange={handleReferralCodeChange}
				errorText={formErrorMessage}
			/>

			<AcitonButtonWithShadow
				buttonText="Start Stacking"
				onClick={onStartStackingClick}
				btnContainerStyle={styles.startStackingButton}
				disabled={startButtonDisabled}
			/>
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
		marginTop: 144,
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
	startStackingButton: {
		marginTop: 24,
	},
});
