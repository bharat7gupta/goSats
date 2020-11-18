import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { StatusBar, LogBox, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import Dashboard from './components/Dashboard';
import colorConstants from './constants/color';
import BrandDetail from './components/BrandDetail';
import VerifyAccount from './components/VerifyAccount';
import * as StorageHelper from './helpers/StorageHelper';
import authReducer, { authInitialState, AuthActions, AuthState } from './reducers/AuthReducer';
import Rewards from './components/Rewards';
import SatsSpin from './components/SatsSpin';
import AccountLogin from './components/AccountLogin';
import CreateAccount from './components/CreateAccount';
import Withdraw from './components/Withdraw';
import QRScanner from './components/common/QRScanner';
import History from './components/History';
import Profile from './components/Profile';
import ReferAndEarn from './components/ReferAndEarn';
import ProfileEdit from './components/ProfileEdit';
import analytics from '@segment/analytics-react-native';

export const AuthStateContext = React.createContext({} as AuthState);
export const AuthDispatchContext = React.createContext((payload) => {});

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

function App() {
	const [ authState, dispatch ] = useReducer(authReducer, authInitialState);

	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
	const [ checkedSignInState, setCheckedSignInState ] = useState<boolean>(false);

	useEffect(() => {
		checkLoggedInState();
	}, [authState]);

	const authContextValue = useMemo(() => ({
		authState,
		dispatch,
	}), [authState, dispatch]);

	const checkLoggedInState = async () => {
		const isLoggedInString = await StorageHelper.getItem('isLoggedIn');
		setIsLoggedIn(isLoggedInString === 'true');
		setCheckedSignInState(true);
		await analytics.setup('dzH8k5sdtUoLV7C4XSiAfcbmv2nKuZix', {
			// Record screen views automatically!
			recordScreenViews: true,
			// Record certain application events automatically!
			trackAppLifecycleEvents: true
		  })
	};

	if (!checkedSignInState) {
		return null;
	}

	if (!isLoggedIn) {
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
					{isLoggedIn ? (
						<Stack.Navigator
							initialRouteName="Dashboard"
							screenOptions={{ header: () => null }}
						>
							<React.Fragment>
								<Stack.Screen name="Dashboard" component={Dashboard} />
								<Stack.Screen name="BrandDetail" component={BrandDetail} />
								<Stack.Screen name="Rewards" component={Rewards} />
								<Stack.Screen name="SatsSpin" component={SatsSpin} />
								<Stack.Screen name="Withdraw" component={Withdraw} />
								<Stack.Screen name="QRScanner" component={QRScanner} />
								<Stack.Screen name="History" component={History} />
								<Stack.Screen name="Profile" component={Profile} />
								<Stack.Screen name="ProfileEdit" component={ProfileEdit} />
								<Stack.Screen name="ReferAndEarn" component={ReferAndEarn} />
								<Stack.Screen name="ProfileEmailVerify" component={VerifyAccount} />
							</React.Fragment>
						</Stack.Navigator>
						) : (
							<Stack.Navigator
								initialRouteName="AccountLogin"
								screenOptions={{ header: () => null }}
							>
								<React.Fragment>
									<Stack.Screen name="AccountLogin" component={AccountLogin} />
									<Stack.Screen name="CreateAccount" component={CreateAccount} />
									<Stack.Screen name="VerifyAccount" component={VerifyAccount} />
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
