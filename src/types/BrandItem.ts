export enum BrandItemType {
	SPOTLIST = 'spotlight',
	GIFTCARD = 'giftcard',
	MERCHANT = 'merchant',
}

interface BrandItem {
	isActive: boolean;
	imageURL: string;
	id: string;
	merchantId: string | null;
	type: BrandItemType;
}

export default BrandItem;
