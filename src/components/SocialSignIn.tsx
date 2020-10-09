import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import PageLoader from './common/PageLoader';
import colorConstants from '../constants/color';
import ErrorModal from './common/ErrorModal';
import * as StorageHelper from '../helpers/StorageHelper'
import { AuthDispatchContext } from '../App';
import { AuthActions } from '../reducers/AuthReducer';
import Strings from '../constants/strings';

export default function SocialSignIn(props) {
	const authDispatch = useContext(AuthDispatchContext);
	const [ loading, setLoading ] = useState(true);
	const [ showError, setShowError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');

	useEffect(() => {
		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
				case 'cognitoHostedUI': {
					getUser().then(user => {
						const accessToken = user.signInUserSession.accessToken.jwtToken;
						StorageHelper.setItem('isLoggedIn', 'true');
						StorageHelper.setItem('hasVerifiedAccount', 'true');
						StorageHelper.setItem('accessToken', accessToken);

						authDispatch({
							type: AuthActions.UPDATE_LOGIN_STATUS,
							isLoggedIn: true,
						});
					});

					break;
				}

				case 'signIn_failure':
				case 'cognitoHostedUI_failure': {
					console.log('Sign in failure', data);
					setLoading(false);
					setShowError(true);
					setErrorMessage(Strings.SOMETHING_WENT_WRONG);
					break;
				}

				case 'signOut': {
					StorageHelper.setItem('accessToken', null);
					authDispatch({
						type: AuthActions.UPDATE_LOGIN_STATUS,
						isLoggedIn: false,
					});
					break;
				}
			}
		});
	}, []);

	useEffect(() => {
		const { params } = props.route;

		if (params.error) {
			setLoading(false);
			setShowError(true);
			setErrorMessage(params.error_description);
			return;
		}
	}, [ props.route.params ]);

	const getUser = () => {
		return Auth.currentAuthenticatedUser()
		  .catch(() => console.log('Not signed in'));
	};

	const handleDismissError = () => {
		props.navigation.navigate('SignUp');
	};

	return (
		<View style={styles.root}>
			<PageLoader showLoader={loading} />
			<ErrorModal
				showError={showError}
				errorMessage={errorMessage}
				onDismissError={handleDismissError}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		position: 'relative',
	},
});
