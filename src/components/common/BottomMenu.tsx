import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import colorConstants from '../../constants/color';
import Shop from './icons/Shop';
import Bitcoin from './icons/Bitcoin';
import Wallet from './icons/Wallet';
import User from './icons/User';

interface MenuItemProps {
	type: MenuType;
	isActive?: boolean;
	onClick: (event) => void;
}

enum MenuType {
	SHOP = 'SHOP',
	BITCOIN = 'BITCOIN',
	WALLET = 'WALLET',
	USER = 'USER',
}

const menuItems = [
	MenuType.SHOP,
	MenuType.BITCOIN,
	MenuType.WALLET,
	MenuType.USER,
];

export default function BottomMenu() {
	const [ currentMenu, setCurrentMenu ] = useState(MenuType.SHOP);

	const handleOnMenuItemClick = (menuType) => {
		setCurrentMenu(menuType);
	};

	return (
		<View style={styles.root}>
			{menuItems.map(menuType => (
				<MenuItem
					key={menuType}
					type={menuType}
					isActive={menuType === currentMenu}
					onClick={() => handleOnMenuItemClick(menuType)}
				/>
			))}
		</View>
	);
}

function MenuItem(props: MenuItemProps) {
	const menuTextStyle = {
		...styles.menuText,
		color: props.isActive ? colorConstants.FONT_COLOR : colorConstants.WARM_GREY,
	};

	return (
		<TouchableHighlight style={styles.menuItem} onPress={props.onClick}>
			<React.Fragment>
				{getMenuIcon(props.type, props.isActive)}

				<Text style={menuTextStyle}>
					{getMenuText(props.type)}
				</Text>
			</React.Fragment>
		</TouchableHighlight>
	);
}

function getMenuIcon(menuType: MenuType, isActive: boolean = false) {
	switch (menuType) {
		case MenuType.SHOP:
			return <Shop isActive={isActive} />;
		case MenuType.BITCOIN:
			return <Bitcoin isActive={isActive} />;
		case MenuType.WALLET:
			return <Wallet isActive={isActive} />;
		case MenuType.USER:
			return <User isActive={isActive} />;
		default:
			return null;
	}
}

function getMenuText(menuType: MenuType) {
	switch (menuType) {
		case MenuType.SHOP:
			return 'Shop';
		case MenuType.BITCOIN:
			return 'Buy Bitcoin';
		case MenuType.WALLET:
			return 'Wallet';
		case MenuType.USER:
			return 'Account';
		default:
			return null;
	}
}

const styles = StyleSheet.create({
	root: {
		marginTop: 'auto',
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: colorConstants.DARK_BLACK,
	},
	menuItem: {
		paddingVertical: 16,
		alignItems: 'center',
		minWidth: 80,
	},
	menuText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 10,
		lineHeight: 12,
		marginTop: 6,
	},
});
