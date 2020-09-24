import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import Header from './common/Header';
import colorConstants from '../constants/color';
import Button from './common/Button';
import { ScrollView } from 'react-native-gesture-handler';
import NeoButton from './common/NeoButton';
import TextBox from './common/TextBox';
import * as CognitoHelper from '../CognitoHelper';

let hasFormError = false;

export default function SignUp(props) {
	const [ userName, setUserName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const [ validations, setValidation ] = useState<any>({});
	const [ formErrorMessage, setFormErrorMessage ] = useState('');

	const validateUserName = (currentUserName: string) => {
		let errorMessage = '';

		if (!currentUserName || currentUserName.trim().length < 2) {
			errorMessage = 'Please provide valid username';
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, userName: errorMessage }));
	};

	const validateEmail = (currentEmail: string) => {
		let errorMessage = '';
		const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

		if (!currentEmail || !emailRegex.test(currentEmail)) {
			errorMessage = 'Please provide valid email';
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, email: errorMessage }));
	};

	const validatePassword = (currentPassword: string) => {
		let errorMessage = '';

		if (!currentPassword || currentPassword.trim().length === 0) {
			errorMessage = 'Please provide valid password';
			hasFormError = true;
		}

		setValidation((prevState) => ({ ...prevState, password: errorMessage }));
	};

	const handleUserNameChange = (text: string) => {
		setUserName(text);
		validateUserName(text);
		setFormErrorMessage('');
	};

	const handleEmailChange = (text: string) => {
		setEmail(text);
		validateEmail(text);
		setFormErrorMessage('');
	};

	const handlePasswordChange = (text: string) => {
		setPassword(text);
		validatePassword(text);
		setFormErrorMessage('');
	};

	const onSubmit = () => {
		setFormErrorMessage('');
		setSubmitDisabled(true);

		hasFormError = false;
		validateUserName(userName);
		validateEmail(email);
		validatePassword(password);

		if (!hasFormError) {
			CognitoHelper.registerUser({ userName, email, password }, (err, result) => {
				setSubmitDisabled(false);

				if (err) {
					setFormErrorMessage(err.message);
					return;
				}

				const cognitoUser = result.user;
				console.log('user name is ' + cognitoUser.getUsername());
			});
		}
	};

	return (
		<View style={styles.root}>
			<ScrollView contentContainerStyle={styles.container}>
				<Header
					title="Sign Up"
					showBackButton={false}
					navigation={props.navigation}
				/>

				<TextBox
					placeholder="Your Name"
					onChange={handleUserNameChange}
					errorText={validations.userName}
				/>

				<TextBox
					placeholder="Your Email"
					onChange={handleEmailChange}
					errorText={validations.email}
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
		</View>
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
