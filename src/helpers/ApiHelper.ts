import * as StorageHelper from '../helpers/StorageHelper';

const API_ROOT = 'https://devapi.gosats.io/v1';

const API_URLS = {
	MASTER_DATA: '/user/master/data',
	GET_MERCHANTS: '/user/merchant/list/all',
	GET_MERCHANT_DETAIL: '/user/merchant/get/',
	USER_BALANCE: '/user/balance',
	SET_REFEREE: '/user/referee',
	SPIN_WHEEL: '/user/spin',
	CREATE_ORDER: '/user/order/create',
	ORDER_STATUS: '/user/order/status/',
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

export async function spinWheel() {
	const apiUrl = `${API_ROOT}${API_URLS.SPIN_WHEEL}`;

	try {
		const accessToken = await StorageHelper.getItem('accessToken');
		console.log(accessToken);
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

export async function createOrder(merchantId: string, giftCardDenomination?: number) {
	const apiUrl = `${API_ROOT}${API_URLS.CREATE_ORDER}`;

	try {
		const accessToken = await StorageHelper.getItem('accessToken');
		const requestObject: any = { merchantId };

		if (giftCardDenomination) {
			requestObject.amount = giftCardDenomination;
		}

		const response = await fetch(apiUrl, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(requestObject),
		});
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}

export async function getOrderStatus(orderId: string) {
	const apiUrl = `${API_ROOT}${API_URLS.ORDER_STATUS}${orderId}`;

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
