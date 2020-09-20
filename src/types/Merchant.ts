export enum MerchantType {
	GIFTCARD = 'giftcard',
	MERCHANT = 'merchant',
}

interface Merchant {
	id: string;
	active: boolean;
	category: string[];
	image: string;
	name: string;
	reward: string;
	type: MerchantType;
}

export default Merchant;
