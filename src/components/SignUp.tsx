import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import Header from './common/Header';
import colorConstants from '../constants/color';
import Button from './common/Button';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import NeoButton from './common/NeoButton';
import TextBox from './common/TextBox';
import * as CognitoHelper from '../helpers/CognitoHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import * as Utils from '../helpers/UtilityHelper';
import Strings from '../constants/strings';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';

let hasFormError = false;

export default function SignUp(props) {
	const authDispatch = useContext(AuthDispatchContext);

	const [ userDisplayName, setUserDisplayName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const [ validations, setValidation ] = useState<any>({});
	const [ formErrorMessage, setFormErrorMessage ] = useState('');

	let usernameRef;
	let passwordRef;

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
			errorMessage = Strings.ENTER_VALID_USERNAME;
			hasFormError = true;
		} else if (!Utils.isEmail(currentUsername) && !Utils.isPhoneNumber(currentUsername)) {
			errorMessage = Strings.ENTER_VALID_USERNAME;
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, username: errorMessage }));
	};

	const validatePassword = (currentPassword: string) => {
		let errorMessage = '';

		if (!currentPassword || currentPassword.trim().length === 0) {
			errorMessage = Strings.ENTER_VALID_PASSWORD;
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, password: errorMessage }));
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

	const handlePasswordChange = (text: string) => {
		setPassword(text);
		setValidation((prevState) => ({ ...prevState, password: '' }));
		setFormErrorMessage('');
	};

	const handleSignInPress = () => {
		props.navigation.navigate('SignIn');
	};

	const onSubmit = () => {
		setFormErrorMessage('');

		hasFormError = false;
		validateUserDisplayName(userDisplayName);
		validateUsername(username);
		validatePassword(password);

		if (!hasFormError) {
			setSubmitDisabled(true);

			CognitoHelper.registerUser({ username, password, userDisplayName}, (err, result) => {
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
							password,
						});

						props.navigation.navigate('VerifyAccount');
					});
				});
			});
		}
	};

	return (
		<KeyboardAwareScrollView style={styles.root}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Header
						title="Sign Up"
						showBackButton={false}
						navigation={props.navigation}
					/>
					<TouchableOpacity onPress={handleSignInPress} containerStyle={styles.signInButton} >
						<Text style={styles.signInButtonText}>Sign In ></Text>
					</TouchableOpacity>
				</View>

				<TextBox
					placeholder="Your Name"
					onChange={handleUserDisplayNameChange}
					onSubmitEditing={() => { usernameRef && usernameRef.focus(); }}
					blurOnSubmit={false}
					errorText={validations.userDisplayName}
				/>

				<TextBox
					placeholder="Your Email or Mobile no."
					onChange={handleUsernameChange}
					onSubmitEditing={() => { passwordRef && passwordRef.focus(); }}
					setTextInputRef={(ref) => usernameRef = ref}
					blurOnSubmit={false}
					errorText={validations.username}
				/>

				<TextBox
					secureTextEntry={true}
					placeholder="Enter a Password"
					onChange={handlePasswordChange}
					setTextInputRef={(ref) => passwordRef = ref}
					blurOnSubmit={true}
					errorText={validations.password}
				/>

				<Text style={styles.formErrorMessage}>
					{formErrorMessage}
				</Text>

				<Button
					btnText="Sign Up"
					onClick={onSubmit}
					btnContainerStyle={styles.signUpButton}
					disabled={submitDisabled}
				/>

				<View style={styles.socialSignUp}>
					<View style={styles.horizontalLine} />
					<Text style={styles.socialSignUpHeaderText}>Or sign up with</Text>

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
	signInButton: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginTop: 12,
	},
	signInButtonText: {
		color: colorConstants.WARM_GREY,
	},
});
