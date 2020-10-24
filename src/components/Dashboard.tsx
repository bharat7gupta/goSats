import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colorConstants from '../constants/color';
import ComingSoon from './common/ComingSoon';
import Shop from './Shop';
import ShopIcon from '../components/common/icons/Shop';
import WalletIcon from './common/icons/WalletIcon';
import CategoriesIcon from './common/icons/CategoriesIcon';
import Categories from './Categories';
import SettingsIcon from './common/icons/SettingsIcon';
import { Platform } from 'react-native';
import Settings from './Settings';
import Wallet from './Wallet';
import WalletFilledIcon from './common/icons/WalletFilledIcon';

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
				name="Categories"
				component={Categories}
				options={{
					tabBarIcon: ({ focused }) => <CategoriesIcon isActive={focused} />,
				}}
			/>
			<Tab.Screen
				name="Wallet"
				component={Wallet}
				options={{
					tabBarIcon: ({ focused }) => {
						if (focused) {
							return <WalletFilledIcon width={24} height={20}/>;
						} else {
							return <WalletIcon />;
						}
					},
				}}
			/>
			<Tab.Screen
				name="Account"
				component={Settings}
				options={{
					tabBarIcon: ({ focused }) => <SettingsIcon isActive={focused} />,
				}}
			/>
		</Tab.Navigator>
	);
}
