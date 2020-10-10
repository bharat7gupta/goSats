import * as StorageHelper from '../helpers/StorageHelper';

const API_ROOT = 'https://devapi.gosats.io/v1';

const API_URLS = {
	MASTER_DATA: '/user/master/data',
	GET_MERCHANTS: '/user/merchant/list/all',
	GET_MERCHANT_DETAIL: '/user/merchant/get/',
	USER_BALANCE: '/user/balance',
	SET_REFEREE: '/user/referee',
};

export async function fetchMasterData() {
	const apiUrl = `${API_ROOT}${API_URLS.MASTER_DATA}`;

	try {
		const accessToken = await StorageHelper.getItem('accessToken');
		const response = await fetch(apiUrl, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
		});
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}

export async function fetchBrands() {
	const apiUrl = `${API_ROOT}${API_URLS.GET_MERCHANTS}`;

	try {
		const accessToken = await StorageHelper.getItem('accessToken');
		const response = await fetch(apiUrl, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
		});
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}

export async function fetchMerchantDetail(merchantId: string) {
	const apiUrl = `${API_ROOT}${API_URLS.GET_MERCHANT_DETAIL}${merchantId}`;

	try {
		const accessToken = await StorageHelper.getItem('accessToken');
		const response = await fetch(apiUrl, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
		});
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}

export async function fetchUserBalance() {
	const apiUrl = `${API_ROOT}${API_URLS.USER_BALANCE}`;

	try {
		const accessToken = await StorageHelper.getItem('accessToken');
		const response = await fetch(apiUrl, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
		});
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}

export async function setReferee (referralCode) {
	const apiUrl = `${API_ROOT}${API_URLS.SET_REFEREE}`;

	try {
		const accessToken = await StorageHelper.getItem('accessToken');
		const response = await fetch(apiUrl, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
			method: 'POST',
			body: JSON.stringify({ referee: referralCode }),
		});
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}
