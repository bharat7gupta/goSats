import React, { useEffect, useState, useReducer, useMemo } from 'react';
import {
	StatusBar,
	StyleSheet,
	ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import Categories from './components/Categories';
import colorConstants from './constants/color';
import BrandDetail from './components/BrandDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import VerifyAccount from './components/VerifyAccount';
import SignUpReferralCode from './components/SignUpReferralCode';
import * as StorageHelper from './helpers/StorageHelper';
import authReducer, { authInitialState, AuthActions, AuthState } from './reducers/AuthReducer';

export const AuthStateContext = React.createContext({} as AuthState);
export const AuthDispatchContext = React.createContext((payload) => {});

const Stack = createStackNavigator();

function App() {
	const [ authState, dispatch ] = useReducer(authReducer, authInitialState);

	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
	const [ hasVerifiedAccount, setHasVerifiedAccount ] = useState<boolean>(false);
	const [ checkedSignInState, setCheckedSignInState ] = useState<boolean>(false);
	const [ checkedAccountState, setCheckedAccountState ] = useState<boolean>(false);

	// Used only for simulting purposes. can be removed later
	// useEffect(() => {
	// 	StorageHelper.setItem('hasVerifiedAccount', 'false').then(() => {
	// 		StorageHelper.setItem('isLoggedIn', 'false').then(() => {
	// 			checkAccountVerifiedState();
	// 			checkLoggedInState();
	// 		});
	// 	});
	// }, []);

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

	return (
		<AuthStateContext.Provider value={authContextValue.authState}>
			<AuthDispatchContext.Provider value={authContextValue.dispatch}>
				<NavigationContainer>
					{hasVerifiedAccount && isLoggedIn ? (
						<Stack.Navigator
							initialRouteName="Home"
							screenOptions={{ header: () => null }}
						>
							<React.Fragment>
								<Stack.Screen name="Home" component={Home} />
								<Stack.Screen name="Categories" component={Categories} />
								<Stack.Screen name="BrandDetail" component={BrandDetail} />
							</React.Fragment>
						</Stack.Navigator>
						) : (
							<Stack.Navigator
								initialRouteName={hasVerifiedAccount ? 'SignIn' : 'SignUp'}
								screenOptions={{ header: () => null }}
							>
								<React.Fragment>
									<Stack.Screen name="SignUp" component={SignUp} />
									<Stack.Screen name="SignIn" component={SignIn} />
									<Stack.Screen name="VerifyAccount" component={VerifyAccount} />
									<Stack.Screen name="SignUpReferralCode" component={SignUpReferralCode} />
								</React.Fragment>
						</Stack.Navigator>
					)}

					<StatusBar barStyle="dark-content" backgroundColor={colorConstants.PRIMARY_DARK} />
				</NavigationContainer>
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
}

export default App;
