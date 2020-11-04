import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import Header from './common/Header';
import ChevronLeft from './common/icons/ChevronLeft';
import colorConstants from '../constants/color';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import TextBox from './common/TextBox';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';
import Strings from '../constants/strings';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';

interface ProfileEditProps {
	route?: any;
	navigation?: any;
}

export default function ProfileEdit(props: ProfileEditProps) {
	const { params } = props.route;
	const authDispatch = useContext(AuthDispatchContext);
	const { name, email, phoneNumber, email_verified } = params || {};
	const [ inputEmail, setInputEmail ] = useState(email);
	const [ emailValidationText, setEmailValidationText ] = useState('');

	const handleEmailChange = (text: string) => {
		setInputEmail(text);
		setEmailValidationText('');
	};

	const handleVerifyClick = async () => {
		if (!UtilityHelper.isEmail(inputEmail)) {
			setEmailValidationText(Strings.ENTER_VALID_EMAIL);
			return;
		}

		try {
			const changeEmailResponse = await ApiHelper.changeEmail(inputEmail);

			Toast.show(changeEmailResponse.message);

			if (!changeEmailResponse.error) {
				props.navigation.navigate('VerifyAccount', { email: inputEmail });
			}
		} catch (e) {
			authDispatch({
				type: AuthActions.UPDATE_LOGIN_STATUS,
				isLoggedIn: false,
			});
		}
	};

	return (
		<View style={styles.root}>
			<Header
				title="Profile"
				showBackButton={true}
				backButtonContent={<ChevronLeft />}
				navigation={props.navigation}
				style={styles.header}
			/>

			<KeyboardAwareScrollView
				contentContainerStyle={{ flexGrow: 1, paddingVertical: 30 }}
				keyboardShouldPersistTaps={true}
			>
				<View style={styles.row}>
					<Text style={styles.label}>Name</Text>
					<Text style={styles.value}>{name}</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Mobile Number</Text>
					<Text style={styles.value}>{phoneNumber}</Text>
				</View>

				<View style={styles.emailContainer}>
					<Text style={{ ...styles.label, paddingHorizontal: 18 }}>Email</Text>

					<TextBox
						value={inputEmail}
						placeholder="Your Email"
						onChange={handleEmailChange}
						blurOnSubmit={false}
						errorText={emailValidationText}
						inputStyles={{ marginRight: 54 }}
					/>

					{(!email_verified || (email !== inputEmail)) && inputEmail && (
						<TouchableOpacity
							activeOpacity={DEFAULT_TOUCHABLE_OPACITY}
							style={styles.verifyButton}
							onPress={handleVerifyClick}
						>
							<Text style={styles.verifyButtonText}>Verify</Text>
						</TouchableOpacity>
					)}
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingTop: UtilityHelper.StatusBarHeight,
	},
	header: {
		paddingHorizontal: 20,
		paddingBottom: 8,
	},
	row : {
		paddingHorizontal: 18,
		marginVertical: 8,
	},
	label: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		lineHeight: 28,
		color: colorConstants.WHITE,
		opacity: 0.4,
	},
	value: {
		fontFamily: 'SFProText-Bold',
		fontSize: 18,
		lineHeight: 22,
		color: colorConstants.WHITE,
		opacity: 0.8,
		marginTop: 4,
	},
	emailContainer: {
		position: 'relative',
		marginVertical: 8,
	},
	verifyButton: {
		position: 'absolute',
		right: 36,
		bottom: 30,
	},
	verifyButtonText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 12,
		lineHeight: 14,
		color: '#9D4F25',
		paddingHorizontal: 10,
		paddingVertical: 16,
	},
});
