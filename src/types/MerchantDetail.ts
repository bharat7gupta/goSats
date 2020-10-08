export default interface MerchantDetail {
	name: string;
	image: string;
	isGiftCard: boolean;
	reward: string;
	reward_type: string;
	title: string;
	subText: string;
	detailsInJson: DetailJson[];
}

export interface DetailJson {
	title: string;
	description: string[];
}
