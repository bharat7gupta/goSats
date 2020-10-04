export default interface MerchantDetail {
	name: string;
	image: string;
	reward: string;
	reward_type: string;
	title: string;
	subText: string;
	detailsInHTML: string;
	detailsInJson: DetailJson[];
}

export interface DetailJson {
	title: string;
	description: string[];
}
