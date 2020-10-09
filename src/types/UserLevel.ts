export default interface UserLevel {
	colorCode: string;
	bgColorCode: string;
	borderColor: string;
	icon: string;
	current: UserLevelType;
	next: UserLevelType;
}

export enum UserLevelType {
	BRONZE = 'Bronze',
	SILVER = 'Silver',
	GOLD = 'Gold',
	DIAMOND = 'Diamond',
	BITCOIN = 'Bitcoin',
}
