import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import TextBox from './common/TextBox';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';
import * as CognitoHelper from '../helpers/CognitoHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import { AuthStateContext, AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import Strings from '../constants/strings';
import ErrorModal from './common/ErrorModal';

export default function SignUpReferralCode(props) {
	const authState = useContext(AuthStateContext);
	const authDispatch = useContext(AuthDispatchContext);

	const [ referralCode, setReferralCode ] = useState('');
	const [ formErrorMessage, setFormErrorMessage ] = useState('');
	const [ startButtonDisabled, setVerifyDisabled ] = useState(false);
	const [ showError, setShowError ] = useState<boolean>(false);
	const [ errorMessage, setErrorMessage ] = useState<string>('');

	const handleReferralCodeChange = (text) => {
		setReferralCode(text);
		setFormErrorMessage('');
	};

	const onStartStackingClick = async () => {
		setFormErrorMessage('');
		setVerifyDisabled(true);

		const referralCodeValue = referralCode && referralCode.trim();
		const referralResponse = await ApiHelper.setReferee(referralCodeValue ? referralCodeValue : null);

		if (referralResponse.error && referralResponse.message === 'Referral code alredy exists') {
			Toast.show('Referral code alredy exists');
		} else if (referralResponse.error) {
			setShowError(true);
			setErrorMessage(referralResponse.message);
			return;
		}

		StorageHelper.getItem('isSocialSignIn').then(value => {
			if (value === 'true') {
				StorageHelper.setItem('isSocialSignIn', null);
				StorageHelper.setItem('isLoggedIn', 'true');
				StorageHelper.setItem('hasVerifiedAccount', 'true');

				authDispatch({
					type: AuthActions.UPDATE_LOGIN_STATUS,
					isLoggedIn: true,
				});
			} else {
				const username = authState.username;
				const password = authState.password;

				CognitoHelper.loginUser({ username, password }, async (result) => {
					const accessToken = result.getAccessToken().getJwtToken();

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
		});
	};

	const handleDismissError = () => {
		setShowError(false);
		setVerifyDisabled(false);
	};

	return (
		<KeyboardAwareScrollView style={styles.root}>
			<Text style={styles.subText}>
				Your set!  Enter a referral code if you have one or leave this field blank.
			</Text>

			<View style={styles.referralCodeInputContainer}>
				<TextBox
					placeholder="Referral Code (OPTIONAL)"
					onChange={handleReferralCodeChange}
					errorText={formErrorMessage}
					/>
			</View>

			<View style={styles.startStackingContainer}>
				<AcitonButtonWithShadow
					buttonText="Start Stacking"
					onClick={onStartStackingClick}
					disabled={startButtonDisabled}
				/>
			</View>

			<ErrorModal
				showError={showError}
				errorMessage={errorMessage}
				onDismissError={handleDismissError}
			/>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	subText: {
		fontSize: 15,
		lineHeight: 30,
		fontFamily: 'SFProText-Regular',
		color: colorConstants.FONT_COLOR,
		marginTop: 144,
		textAlign: 'center',
		paddingHorizontal: 28,
		marginBottom: 52,
		opacity: 0.7,
	},
	referralCodeInputContainer: {
		paddingHorizontal: 20,
	},
	startStackingContainer: {
		marginTop: 24,
		paddingHorizontal: 20,
	},
});
