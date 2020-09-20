export enum BrandType {
	GIFTCARD = 'giftcard',
	MERCHANT = 'merchant',
}

interface Brand {
	id: string;
	active: boolean;
	category: string[];
	image: string;
	name: string;
	reward: string;
	type: BrandType | string;
}

export default Brand;
