import React, { Component } from 'react';
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
import SignUp from './components/SignUp';

const Stack = createStackNavigator();

class App extends Component {
	render(): JSX.Element {
		return (
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="SignUp"
					screenOptions={{ header: () => null }}
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Categories" component={Categories} />
					<Stack.Screen name="BrandDetail" component={BrandDetail} />
					<Stack.Screen name="SignUp" component={SignUp} />
				</Stack.Navigator>

				<StatusBar barStyle="dark-content" backgroundColor={colorConstants.PRIMARY_DARK} />
			</NavigationContainer>
		);
	}
}

export default App;
