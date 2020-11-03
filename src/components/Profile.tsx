import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import Header from './common/Header';
import * as Config from '../constants/config';
import ChevronLeft from './common/icons/ChevronLeft';
import MenuButton from './common/MenuButton';
import UserIcon from './common/icons/UserIcon';
import ReferAndEarnIcon from './common/icons/ReferAndEarnIcon';
import Notepad from './common/icons/Notepad';
import InfoIcon from './common/icons/InfoIcon';
import LogoutIcon from './common/icons/LogoutIcon';
import { ScrollView } from 'react-native-gesture-handler';

interface ProfileProps {
	navigation?: any;
}

export default function Profile(props: ProfileProps) {
	const authDispatch = useContext(AuthDispatchContext);

	const [ profileData, setProfileData ] = useState(null);

	useEffect(() => {
		fetchUserProfile();
	}, [props.navigation]);

	const fetchUserProfile = async () => {
		try {
			const userProfileResponse = await ApiHelper.fetchUserProfile();

			if (userProfileResponse.error) {
				Toast.show(userProfileResponse.message);
				return;
			}

			setProfileData(userProfileResponse.data);
		} catch (e) {
			authDispatch({
				type: AuthActions.UPDATE_LOGIN_STATUS,
				isLoggedIn: false,
			});
		}
	};

	const handleInitiateEmailVerification = () => {
		props.navigation.navigate('ProfileEdit', { ...profileData });
	};

	const handleProfileClick = () => {
		props.navigation.navigate('ProfileEdit', { ...profileData });
	};

	const handleReferClick = () => {
		props.navigation.navigate('ReferAndEarn', { referralId: profileData.referralId });
	};

	const handlePrivacyPolicyClick = () => {
		UtilityHelper.openInAppBrowser(Config.PRIVACY_POLICY_URL);
	};

	const handleTermsAndConditionsClick = () => {
		UtilityHelper.openInAppBrowser(Config.TERMS_AND_CONDITIONS_URL);
	};

	const handleLogoutClick = async () => {
		const response = await ApiHelper.signOut();

		if (response && response.message) {
			Toast.show(response.message);
		}

		StorageHelper.setItem('isLoggedIn', 'false').then(() => {
			setTimeout(() => {
				authDispatch({
					type: AuthActions.UPDATE_LOGIN_STATUS,
					isLoggedIn: false,
				});
			}, 100);
		});
	};

	return (
		<View style={styles.root}>
			<Header
				title=""
				showBackButton={true}
				backButtonContent={<ChevronLeft />}
				navigation={props.navigation}
			/>

			{profileData && (
				<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
					<View style={styles.topSection}>
						<View style={styles.userDetails}>
							<Text style={styles.username}>{profileData.name}</Text>

							{!!profileData.email && <Text style={styles.email}>{profileData.email}</Text>}

							{!!profileData.email && !profileData.email_verified && (
								<View style={{ flexDirection: 'row' }}>
									<Text style={styles.notVerifiedText}>Not Verified. </Text>

									<TouchableOpacity activeOpacity={Config.DEFAULT_TOUCHABLE_OPACITY} onPress={handleInitiateEmailVerification}>
										<Text style={styles.verifyNow}>Verify Now</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>

						<Text style={styles.userLogo}>{profileData.name.substr(0, 1)}</Text>
					</View>

					<View style={styles.actions}>
						<MenuButton icon={<UserIcon fillColor="#568951" />} text="Profile" onClick={handleProfileClick} />

						<MenuButton icon={<ReferAndEarnIcon />} text="Refer & earn" onClick={handleReferClick} />

						<MenuButton icon={<Notepad />} text="Privacy policy" onClick={handlePrivacyPolicyClick} />

						<MenuButton icon={<InfoIcon />} text="Terms & conditions" onClick={handleTermsAndConditionsClick} />

						<MenuButton icon={<LogoutIcon />} text="Log out" textStyle={{ color: '#A43B3B' }} onClick={handleLogoutClick} />
					</View>
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingTop: UtilityHelper.StatusBarHeight + 10,
	},
	topSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
		marginTop: 24,
	},
	userDetails: {
		marginTop: 8,
	},
	username: {
		fontFamily: 'SFProText-Bold',
		fontSize: 30,
		lineHeight: 30,
		color: colorConstants.FONT_COLOR,
	},
	email: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		lineHeight: 28,
		color: '#939393',
		opacity: 0.8,
	},
	userLogo: {
		fontFamily: 'SFProText-Bold',
		fontSize: 30,
		lineHeight: 30,
		color: colorConstants.FONT_COLOR,
		paddingTop: 16,
		paddingBottom: 13,
		paddingHorizontal: 20,
		borderRadius: 30,
		backgroundColor: '#4D4475',
		alignSelf: 'flex-start',
	},
	notVerifiedText: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 21,
		color: colorConstants.VALIDATION_TEXT_COLOR,
	},
	verifyNow: {
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 20,
		color: colorConstants.FONT_COLOR,
	},
	actions: {
		marginTop: 20,
	},
});
