import { Dimensions, Platform, StatusBar } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import colorConstants from '../constants/color';
import { PAGE_DATA_FETCH_TIME_GAP } from '../constants/config';
import * as StorageHelper from './StorageHelper';

export const isEmail = (value: string) => {
	const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
	return emailRegEx.test(value);
};

export const isPhoneNumber = (value: string) => {
	const phoneNumberRegEx = /^[0-9]{10}$/;
	return phoneNumberRegEx.test(value);
};

export const isReferralCode = (value: string) => {
	const referralCodeRegEx = /^[A-Za-z0-9]{8}$/;
	return referralCodeRegEx.test(value);
};

export const getFormattedNumber = (number) => {
	return number && !isNaN(number) ? Number(number).toLocaleString('en-IN') : 0;
};

export const getTimestampString = () => {
	return new Date().getTime().toString();
};

export const shouldRefreshPageData = async (lastFetchKey) => {
	const currentTimestamp = Number(getTimestampString());
	const lastFetchTimestamp = await StorageHelper.getItem(lastFetchKey);
	return currentTimestamp - Number(lastFetchTimestamp) > PAGE_DATA_FETCH_TIME_GAP;
};

export const openInAppBrowser = (url: string) => {
	return InAppBrowser.open(url, {
		// iOS Properties
		dismissButtonStyle: 'done',
		preferredBarTintColor: 'gray',
		preferredControlTintColor: 'white',
		readerMode: false,
		// Android Properties
		showTitle: true,
		toolbarColor: colorConstants.PRIMARY_DARK,
		secondaryToolbarColor: colorConstants.FONT_COLOR,
		enableUrlBarHiding: true,
		enableDefaultShare: true,
		forceCloseOnRedirection: false,
		// Specify full animation resource identifier(package:anim/name)
		// or only resource name(in case of animation bundled with app).
		animations: {
			startEnter: 'slide_in_right',
			startExit: 'slide_out_left',
			endEnter: 'slide_in_right',
			endExit: 'slide_out_left',
		},
	});
};

export const randomValue = (min: number, max: number): number  => {
	return Math.random() * (max - min) + min;
};

export const randomIntValue = (min: number, max: number) => {
	return Math.floor(randomValue(min, max));
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
