import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { StatusBar, LogBox, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import Dashboard from './components/Dashboard';
import Categories from './components/Categories';
import colorConstants from './constants/color';
import BrandDetail from './components/BrandDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import VerifyAccount from './components/VerifyAccount';
import SignUpReferralCode from './components/SignUpReferralCode';
import * as StorageHelper from './helpers/StorageHelper';
import authReducer, { authInitialState, AuthActions, AuthState } from './reducers/AuthReducer';
import SocialSignIn from './components/SocialSignIn';
import Rewards from './components/Rewards';
import SatsSpin from './components/SatsSpin';
import AccountLogin from './components/AccountLogin';

export const AuthStateContext = React.createContext({} as AuthState);
export const AuthDispatchContext = React.createContext((payload) => {});

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

function App() {
	const [ authState, dispatch ] = useReducer(authReducer, authInitialState);

	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
	const [ hasVerifiedAccount, setHasVerifiedAccount ] = useState<boolean>(false);
	const [ checkedSignInState, setCheckedSignInState ] = useState<boolean>(false);
	const [ checkedAccountState, setCheckedAccountState ] = useState<boolean>(false);

	useEffect(() => {
		checkAccountVerifiedState();
		checkLoggedInState();
	}, [authState]);

	const authContextValue = useMemo(() => ({
		authState,
		dispatch,
	}), [authState, dispatch]);

	const checkLoggedInState = async () => {
		const isLoggedIn = await readBoolStorageValue('isLoggedIn');
		setIsLoggedIn(isLoggedIn);
		setCheckedSignInState(true);
	};

	const checkAccountVerifiedState = async () => {
		const hasVerifiedAccount = await readBoolStorageValue('hasVerifiedAccount');
		setHasVerifiedAccount(hasVerifiedAccount);
		setCheckedAccountState(true);
	};

	const readBoolStorageValue = async (key: string): Promise<boolean> => {
		const value = await StorageHelper.getItem(key);

		if (value === 'true') {
			return true;
		} else {
			return false;
		}
	};

	if (!checkedSignInState || !checkedAccountState) {
		return null;
	}

	if (!hasVerifiedAccount || !isLoggedIn) {
		SplashScreen.hide();
	}

	const deepLinking = {
		prefixes: ['https://gosats.io', 'gosats://'],
		config: {
			screens: {
				Dashboard: {
					initialRouteName: 'shop',
					screens: {
						Shop: 'shop',
						Categories: 'categories',
					},
				},
				BrandDetail: 'merchant/:id',
				SocialSignIn: 'socialsignin',
			},
		},
	};

	return (
		<AuthStateContext.Provider value={authContextValue.authState}>
			<AuthDispatchContext.Provider value={authContextValue.dispatch}>
				<NavigationContainer linking={deepLinking}>
					{hasVerifiedAccount && isLoggedIn ? (
						<Stack.Navigator
							initialRouteName="Dashboard"
							screenOptions={{ header: () => null }}
						>
							<React.Fragment>
								<Stack.Screen name="Dashboard" component={Dashboard} />
								<Stack.Screen name="BrandDetail" component={BrandDetail} />
								<Stack.Screen name="Rewards" component={Rewards} />
								<Stack.Screen name="SatsSpin" component={SatsSpin} />
							</React.Fragment>
						</Stack.Navigator>
						) : (
							<Stack.Navigator
								initialRouteName="AccountLogin"
								screenOptions={{ header: () => null }}
							>
								<React.Fragment>
									<Stack.Screen name="SignUp" component={SignUp} />
									<Stack.Screen name="SignIn" component={SignIn} />
									<Stack.Screen name="AccountLogin" component={AccountLogin} />
									<Stack.Screen name="SocialSignIn" component={SocialSignIn} />
									<Stack.Screen name="VerifyAccount" component={VerifyAccount} />
									<Stack.Screen name="SignUpReferralCode" component={SignUpReferralCode} />
								</React.Fragment>
						</Stack.Navigator>
					)}

					<StatusBar barStyle="light-content" backgroundColor={colorConstants.PRIMARY_DARK} />
				</NavigationContainer>
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
}

export default App;
