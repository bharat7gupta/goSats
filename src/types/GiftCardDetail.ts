export default interface GiftCardDetail {
	id: string;
	active: boolean;
	image: string;
	category: string[];
	detailsInHTML: string;
	price: { denominations: string[] };
	name: string;
	sku: string;
	title: string;
	reward: string;
}
