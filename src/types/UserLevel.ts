export default interface UserLevel {
	colorCode: string;
	bgColorCode: string;
	borderColor: string;
	current: UserLevelType;
	next: UserLevelType;
	curMaxSats: number;
	curMinSats: number;
	progressBarBgColor: string[];
	icon: string;
	badge: string;
}

export enum UserLevelType {
	BRONZE = 'Bronze',
	SILVER = 'Silver',
	GOLD = 'Gold',
	DIAMOND = 'Diamond',
	BITCOIN = 'Bitcoin',
}
