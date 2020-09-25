import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colorConstants from '../constants/color';
import ComingSoon from './common/ComingSoon';
import Shop from './Shop';
import ShopIcon from '../components/common/icons/Shop';
import Bitcoin from './common/icons/Bitcoin';
import Wallet from './common/icons/Wallet';
import User from './common/icons/User';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
	return (
		<Tab.Navigator
			initialRouteName="Shop"
			tabBarOptions={{
				activeTintColor: colorConstants.FONT_COLOR,
				inactiveTintColor: colorConstants.WARM_GREY,
				style: {
					height: 64,
					borderTopWidth: 0,
				},
				tabStyle: {
					backgroundColor: colorConstants.DARK_BLACK,
					paddingVertical: 10,
				},
			}}
		>
			<Tab.Screen
				name="Shop"
				component={Shop}
				options={{
					tabBarIcon: ({ focused }) => <ShopIcon  isActive={focused} />,
					tabBarLabel: 'Shop',
				}}
			/>
			<Tab.Screen
				name="BuyBitcoin"
				component={ComingSoon}
				options={{
					tabBarIcon: ({ focused }) => <Bitcoin isActive={focused} />,
					tabBarLabel: 'Buy Bitcoin',
				}}
			/>
			<Tab.Screen
				name="Wallet"
				component={ComingSoon}
				options={{
					tabBarIcon: ({ focused }) => <Wallet isActive={focused} />,
					tabBarLabel: 'Wallet',
				}}
			/>
			<Tab.Screen
				name="Account"
				component={ComingSoon}
				options={{
					tabBarIcon: ({ focused }) => <User isActive={focused} />,
					tabBarLabel: 'Account',
				}}
			/>
		</Tab.Navigator>
	);
}
