import * as StorageHelper from '../helpers/StorageHelper';
import Strings from '../constants/strings';
import Toast from 'react-native-simple-toast';
import { AuthActions } from '../reducers/AuthReducer';
import { useContext } from 'react';
import { AuthDispatchContext } from '../App';

const API_ROOT = 'https://devapi.gosats.io/v1';
// const API_ROOT = 'https://api.gosats.io/v1';

const API_URLS = {
	SIGN_IN: '/auth/user/signin',
	SIGN_OUT: '/auth/user/signout',
	USER_PROFILE: '/user/profile',
	REFRESH_TOKEN: '/auth/user/token/renew',
	VERIFY_PHONE: '/auth/user/verify/phone',
	REQUEST_EMAIL_OTP: '/auth/user/request/email/code',
	VERIFY_EMAIL: '/auth/user/verify/email',
	UPDATE_USER_DETAILS: '/auth/update/user/details',
	MASTER_DATA: '/user/master/data',
	GET_MERCHANTS: '/user/merchant/list/all',
	GET_MERCHANT_DETAIL: '/user/merchant/get/',
	USER_BALANCE: '/user/balance',
	SET_REFEREE: '/user/referee',
	SPIN_WHEEL: '/user/spin',
	CREATE_ORDER: '/user/order/create',
	ORDER_STATUS: '/user/order/status/',
	WITHDRAW_SATS: '/user/withdraw/sats',
	HISTORY: '/user/order/list/all',
};

const baseHeaders = {
	'Content-Type': 'application/json',
};

const commonApiCall = async (
	apiUrl: string,
	body?: any,
	method?: string,
	addBearerTokenHeader: boolean = false,
	addSessionHeader: boolean = false,
	refreshTokenOnExpiry: boolean = true,
) => {
	const requestParams = {} as any;

	try {
		const headers = { ...baseHeaders };

		if (addBearerTokenHeader) {
			const accessToken = await StorageHelper.getItem('accessToken');
			headers['Authorization'] = `Bearer ${accessToken}`;
		}

		if (addSessionHeader) {
			const sessionToken = await StorageHelper.getItem('sessionToken');
			headers['session'] = sessionToken;
		}

		requestParams.headers = headers;

		if (method && method === 'POST') {
			requestParams.method = 'POST';
			requestParams.body = JSON.stringify(body);
		} else {
			requestParams.method = 'GET';
		}

		const response = await fetch(apiUrl, requestParams);

		if (response.status === 401) {
			dispatchSignOutAction();
		}

		if (response.status === 405) {
			if (refreshTokenOnExpiry) {
				return refreshToken(apiUrl, body, method, addBearerTokenHeader, addSessionHeader, refreshTokenOnExpiry);
			} else {
				dispatchSignOutAction();
			}
		}

		return response.json();
	} catch (e) {
		return Promise.resolve({
			error: true,
			message: Strings.SOMETHING_WENT_WRONG,
		});
	}
};

async function refreshToken(prevApiUrl, body, method, addBearerTokenHeader, addSessionHeader, refreshTokenOnExpiry) {
	const apiUrl = `${API_ROOT}${API_URLS.REFRESH_TOKEN}`;
	const refreshTokenValue = await StorageHelper.getItem('refreshToken');

	try {
		const response = await fetch(apiUrl, {
			headers: {
				'refresh_token': refreshTokenValue,
			},
		});

		const json = await response.json();

		if (json.error) {
			dispatchSignOutAction();
		} else {
			await StorageHelper.setItem('accessToken', json.data.AccessToken);
			return commonApiCall(prevApiUrl, body, method, addBearerTokenHeader, addSessionHeader, false);
		}
	} catch (e) {
		dispatchSignOutAction();
	}
}

function dispatchSignOutAction() {
	StorageHelper.setItem('isLoggedIn', 'false');
	Toast.show('You have been logged out!');

	throw new Error('LoggedOut');
}

export async function signIn(phoneNumber: string) {
	const apiUrl = `${API_ROOT}${API_URLS.SIGN_IN}`;
	const requestObj = { phoneNumber };

	return await commonApiCall(apiUrl, requestObj, 'POST');
}

export async function signOut() {
	const apiUrl = `${API_ROOT}${API_URLS.SIGN_OUT}`;
	return await commonApiCall(apiUrl, null, null, true);
}

export async function verifyPhone(phoneNumber, code) {
	const apiUrl = `${API_ROOT}${API_URLS.VERIFY_PHONE}`;
	const requestObj = { phoneNumber, code };

	return await commonApiCall(apiUrl, requestObj, 'POST', false, true);
}

export async function requestEmailOtp() {
	const apiUrl = `${API_ROOT}${API_URLS.REQUEST_EMAIL_OTP}`;
	return await commonApiCall(apiUrl, null, null, true);
}

export async function verifyEmail(code: string) {
	const apiUrl = `${API_ROOT}${API_URLS.VERIFY_EMAIL}`;
	const requestObj = { code };

	return await commonApiCall(apiUrl, requestObj, 'POST', true);
}

export async function updateUserDetails(email: string, name: string, referee?: string) {
	const apiUrl = `${API_ROOT}${API_URLS.UPDATE_USER_DETAILS}`;
	const requestObj = { email, name, referee };

	return await commonApiCall(apiUrl, requestObj, 'POST', true);
}

export async function fetchMasterData() {
	const apiUrl = `${API_ROOT}${API_URLS.MASTER_DATA}`;
	return await commonApiCall(apiUrl, null, null, true);
}

export async function fetchBrands() {
	const apiUrl = `${API_ROOT}${API_URLS.GET_MERCHANTS}`;
	return await commonApiCall(apiUrl, null, null, true);
}

export async function fetchMerchantDetail(merchantId: string) {
	const apiUrl = `${API_ROOT}${API_URLS.GET_MERCHANT_DETAIL}${merchantId}`;
	return await commonApiCall(apiUrl, null, null, true);
}

export async function fetchUserBalance() {
	const apiUrl = `${API_ROOT}${API_URLS.USER_BALANCE}`;
	return await commonApiCall(apiUrl, null, null, true);
}

export async function setReferee (referralCode) {
	const apiUrl = `${API_ROOT}${API_URLS.SET_REFEREE}`;
	const requestObj = { referee: referralCode };

	return await commonApiCall(apiUrl, requestObj, 'POST', true);
}

export async function spinWheel() {
	const apiUrl = `${API_ROOT}${API_URLS.SPIN_WHEEL}`;
	return await commonApiCall(apiUrl, null, null, true);
}

export async function createOrder(merchantId: string, giftCardDenomination?: number) {
	const apiUrl = `${API_ROOT}${API_URLS.CREATE_ORDER}`;
	const requestObject: any = { merchantId };

	if (giftCardDenomination) {
		requestObject.amount = giftCardDenomination;
	}

	return await commonApiCall(apiUrl, requestObject, 'POST', true);
}

export async function getOrderStatus(orderId: string) {
	const apiUrl = `${API_ROOT}${API_URLS.ORDER_STATUS}${orderId}`;
	return await commonApiCall(apiUrl, null, null, true);
}

export async function withdrawSats(address: string, amount: number) {
	const apiUrl = `${API_ROOT}${API_URLS.WITHDRAW_SATS}`;
	const requestBody = { address, amount };

	return await commonApiCall(apiUrl, requestBody, 'POST', true);
}

export async function fetchHistory(orderId?: string, createdOn?: string) {
	let apiUrl = `${API_ROOT}${API_URLS.HISTORY}`;

	if (orderId && createdOn) {
		apiUrl = `${apiUrl}/${orderId}/${createdOn}`;
	}

	return await commonApiCall(apiUrl, null, null, true);
}

export async function fetchUserProfile() {
	const apiUrl = `${API_ROOT}${API_URLS.USER_PROFILE}`;

	return await commonApiCall(apiUrl, null, null, true);
}
