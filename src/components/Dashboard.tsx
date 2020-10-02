import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colorConstants from '../constants/color';
import ComingSoon from './common/ComingSoon';
import Shop from './Shop';
import ShopIcon from '../components/common/icons/Shop';
import Bitcoin from './common/icons/Bitcoin';
import Wallet from './common/icons/Wallet';
import User from './common/icons/User';
import CategoriesIcon from './common/icons/CategoriesIcon';
import Categories from './Categories';
import SettingsIcon from './common/icons/SettingsIcon';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
	return (
		<Tab.Navigator
			initialRouteName="Shop"
			tabBarOptions={{
				activeTintColor: colorConstants.FONT_COLOR,
				inactiveTintColor: colorConstants.WARM_GREY,
				style: {
					height: Platform.OS === 'ios' ? 94 : 64,
					borderTopWidth: 0,
					backgroundColor: colorConstants.PRIMARY_DARK,
				},
				tabStyle: {
					backgroundColor: colorConstants.DARK_BLACK,
					paddingVertical: 10,
				},
				showLabel: false,
			}}
		>
			<Tab.Screen
				name="Shop"
				component={Shop}
				options={{
					tabBarIcon: ({ focused }) => <ShopIcon  isActive={focused} />,
				}}
			/>
			<Tab.Screen
				name="BuyBitcoin"
				component={Categories}
				options={{
					tabBarIcon: ({ focused }) => <CategoriesIcon isActive={focused} />,
				}}
			/>
			<Tab.Screen
				name="Wallet"
				component={ComingSoon}
				options={{
					tabBarIcon: ({ focused }) => <Wallet isActive={focused} />,
				}}
			/>
			<Tab.Screen
				name="Account"
				component={ComingSoon}
				options={{
					tabBarIcon: ({ focused }) => <SettingsIcon isActive={focused} />,
				}}
			/>
		</Tab.Navigator>
	);
}
