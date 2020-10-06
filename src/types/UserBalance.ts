export default interface UserBalance {
	balance: {
		spendableSats: number;
		totalEarnedSats: number;
	};
	level: {
		colorCode: string;
		bgColorCode: string;
		icon: string;
		current: UserLevel;
		next: UserLevel;
	};
	referralId: string;
}

export enum UserLevel {
	BRONZE = 'Bronze',
	SILVER = 'Silver',
	GOLD = 'Gold',
	DIAMOND = 'Diamond',
	BITCOIN = 'Bitcoin',
}
