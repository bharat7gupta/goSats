import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Header from './common/Header';
import colorConstants from '../constants/color';
import Button from './common/Button';
import { ScrollView } from 'react-native-gesture-handler';
import NeoButton from './common/NeoButton';
import TextBox from './common/TextBox';
import * as CognitoHelper from '../helpers/CognitoHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import Strings from '../constants/strings';
import { AuthActions } from '../reducers/AuthReducer';
import { AuthDispatchContext } from '../App';

let hasFormError = false;

export default function SignIn(props) {
	const authDispatch = useContext(AuthDispatchContext);

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const [ validations, setValidation ] = useState<any>({});
	const [ formErrorMessage, setFormErrorMessage ] = useState('');

	const validateUserName = (currentUserName: string) => {
		let errorMessage = '';

		if (!currentUserName || currentUserName.trim().length < 2) {
			errorMessage = Strings.ENTER_VALID_USERNAME;
			hasFormError = true;
		} else if (!UtilityHelper.isEmail(currentUserName) && !UtilityHelper.isPhoneNumber(currentUserName)) {
			errorMessage = Strings.ENTER_VALID_USERNAME;
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, userName: errorMessage }));
	};

	const validatePassword = (currentPassword: string) => {
		let errorMessage = '';

		if (!currentPassword || currentPassword.trim().length === 0) {
			errorMessage = Strings.ENTER_VALID_PASSWORD;
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, password: errorMessage }));
	};

	const handleUsernameChange = (text: string) => {
		setUsername(text);
		setValidation((prevState) => ({ ...prevState, username: '' }));
		setFormErrorMessage('');
	};

	const handlePasswordChange = (text: string) => {
		setPassword(text);
		setValidation((prevState) => ({ ...prevState, password: '' }));
		setFormErrorMessage('');
	};

	const onSubmit = () => {
		setFormErrorMessage('');

		hasFormError = false;
		validateUserName(username);
		validatePassword(password);

		if (!hasFormError) {
			setSubmitDisabled(true);

			CognitoHelper.loginUser({ username, password }, (result) => {
				const cognitoUser = result.user;
				const userDisplayName = cognitoUser.getUsername();
				const accessToken = result.getAccessToken().getJwtToken();

				StorageHelper.setItem('accessToken', accessToken);
				StorageHelper.setItem('userDisplayName', userDisplayName);
				StorageHelper.setItem('isLoggedIn', 'true').then(() => {
					authDispatch({
						type: AuthActions.UPDATE_LOGIN_STATUS,
						isLoggedIn: true,
					});
				});
			}, (err) => {
				const errorMessage = err.message || Strings.SOMETHING_WENT_WRONG;
				setFormErrorMessage(errorMessage);
				setSubmitDisabled(false);
			});
		}
	};

	return (
		<KeyboardAwareScrollView style={styles.root}>
			<ScrollView contentContainerStyle={styles.container}>
				<Header
					title="Sign In"
					showBackButton={false}
					navigation={props.navigation}
				/>

				<TextBox
					placeholder="Your Email or Mobile no."
					onChange={handleUsernameChange}
					errorText={validations.userName}
				/>

				<TextBox
					secureTextEntry={true}
					placeholder="Enter a Password"
					onChange={handlePasswordChange}
					errorText={validations.password}
				/>

				<Text style={styles.formErrorMessage}>
					{formErrorMessage}
				</Text>

				<Button
					btnText="Sign In"
					onClick={onSubmit}
					btnContainerStyle={styles.signUpButton}
					disabled={submitDisabled}
				/>

				<View style={styles.socialSignUp}>
					<View style={styles.horizontalLine} />
					<Text style={styles.socialSignUpHeaderText}>Or sign in with</Text>

					<View style={styles.socialPlatforms}>
						<NeoButton containerStyle={styles.socialButton}>
							<Image source={require('../assets/images/google.png')} />
						</NeoButton>

						<NeoButton containerStyle={styles.socialButton}>
							<Image source={require('../assets/images/facebook.png')} />
						</NeoButton>
					</View>
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	container: {
		paddingHorizontal: 24,
	},
	signUpButton: {
		marginTop: 4,
	},
	formErrorMessage: {
		fontSize: 12,
		lineHeight: 16,
		color: colorConstants.VALIDATION_TEXT_COLOR,
		marginBottom: 4,
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
		fontFamily: 'Gilroy-Bold',
		color: colorConstants.FONT_COLOR,
		textAlign: 'center',
		marginTop: 28,
	},
	socialPlatforms: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		marginTop: 24,
		marginBottom: 40,
	},
	socialButton: {
		width: 110,
		height: 110,
	},
});
