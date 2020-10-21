import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import * as UtilityHelper from '../helpers/UtilityHelper';
import * as ApiHelper from '../helpers/ApiHelper';
import * as StorageHelper from '../helpers/StorageHelper';
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';

export default function Settings() {
	const authDispatch = useContext(AuthDispatchContext);

	const onLogout = async () => {
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
			}, 300);
		});
	};

	return (
		<View style={styles.root}>
			<Text style={styles.headerText}>Account Settings</Text>

			<TouchableOpacity activeOpacity={0.7} onPress={onLogout}>
				<View style={styles.menuButton}>
					<Text style={styles.menuText}>Logout</Text>
				</View>
			</TouchableOpacity>
		</View>
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
	menuButton: {
		marginTop: 30,
		marginHorizontal: 24,
		paddingHorizontal: 8,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colorConstants.PRIMARY_DARK,
	},
	menuText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 28,
		color: colorConstants.FONT_COLOR,
	},
});
