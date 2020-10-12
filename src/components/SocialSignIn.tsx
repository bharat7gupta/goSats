import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import PageLoader from './common/PageLoader';
import colorConstants from '../constants/color';
import ErrorModal from './common/ErrorModal';
import * as StorageHelper from '../helpers/StorageHelper';
import * as ApiHelper from '../helpers/ApiHelper';
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
						StorageHelper.setItem('accessToken', accessToken);
						StorageHelper.setItem('isSocialSignIn', 'true');

						ApiHelper.fetchUserBalance()
							.then(balanceResponse => {
								const isReferralReq = false; //balanceResponse.data.isReferralReq;

								if (isReferralReq) {
									props.navigation.navigate('SignUpReferralCode');
								} else {
									StorageHelper.setItem('isLoggedIn', 'true');
									StorageHelper.setItem('hasVerifiedAccount', 'true');

									authDispatch({
										type: AuthActions.UPDATE_LOGIN_STATUS,
										isLoggedIn: true,
									});
								}
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

		if (params.code) {
			fetch('https://oauth2.googleapis.com/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify({
					code: params.code,
					client_id: "955313282872-gp23sffrgbv3fb80tinbedrfpatf7vto.apps.googleusercontent.com",
					client_secret: "d1qCmw9tINeuIO1Oi6PQ9ple",
					redirect_uri: "https://gosats-dvp.auth.us-east-2.amazoncognito.com/oauth2/idpresponse",
					grant_type: "authorization_code"
				})
			})
			.then(response => response.json().then(data => {
				console.log(data);
			}));
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
