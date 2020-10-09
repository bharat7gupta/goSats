import UserLevel, { UserLevelType } from './UserLevel';

export default interface UserBalance {
	balance: {
		spendableSats: number;
		totalEarnedSats: number;
	};
	level: UserLevel;
	referralId: string;
}
