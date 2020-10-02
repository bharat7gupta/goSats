import * as StorageHelper from '../helpers/StorageHelper';

const API_ROOT = 'https://devapi.gosats.io/v1';

const API_URLS = {
	MASTER_DATA: '/user/master/data',
	GET_MERCHANTS: '/merchant/list/all',
	GET_MERCHANT_DETAIL: '/merchant/get/',
	GET_GIFTCARD_DETAIL: '/gifts/get/',
	USER_BALANCE: '/user/balance',
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

export async function fetchGiftCardDetail(giftCardId: string) {
	const apiUrl = `${API_ROOT}${API_URLS.GET_GIFTCARD_DETAIL}${giftCardId}`;

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
