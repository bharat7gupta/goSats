import { Dimensions, Platform, StatusBar } from 'react-native';

export const isEmail = (value: string) => {
	const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
	return emailRegEx.test(value);
};

export const isPhoneNumber = (value: string) => {
	const phoneNumberRegEx = /^[6-9]{1}[0-9]{9}$/;
	return phoneNumberRegEx.test(value);
};

//  Start status bar height
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
	? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
	: false;

export const StatusBarHeight = Platform.select({
	ios: isIPhoneX() ? 44 : 20,
	android: StatusBar.currentHeight,
	default: 0,
});
//  End status bar height
