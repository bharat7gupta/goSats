const API_ROOT = 'https://devapi.gosats.io/v1';

const API_URLS = {
	GET_MERCHANTS: '/merchant/list/all',
	GET_MERCHANT_DETAIL: '/merchant/get/',
	GET_GIFTCARD_DETAIL: '/gifts/get/',
};

export async function fetchMerchants() {
	const apiUrl = `${API_ROOT}${API_URLS.GET_MERCHANTS}`;

	try {
		const response = await fetch(apiUrl);
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}

export async function fetchMerchantDetail(merchantId: string) {
	const apiUrl = `${API_ROOT}${API_URLS.GET_MERCHANT_DETAIL}${merchantId}`;

	try {
		const response = await fetch(apiUrl);
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}

export async function fetchGiftCardDetail(giftCardId: string) {
	const apiUrl = `${API_ROOT}${API_URLS.GET_GIFTCARD_DETAIL}${giftCardId}`;

	try {
		const response = await fetch(apiUrl);
		const json = await response.json();

		return json;
	} catch (e) {
		// TODO: Show toast here
	}
}
