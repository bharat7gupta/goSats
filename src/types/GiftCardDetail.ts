export default interface GiftCardDetail {
	id: string;
	active: boolean;
	isGiftCard: boolean;
	image: string;
	category: string[];
	detailsInJson: DetailJson[];
	price: { denominations: string[] };
	name: string;
	sku: string;
	title: string;
	reward: string;
}

export interface DetailJson {
	title: string;
	description: string[];
}
