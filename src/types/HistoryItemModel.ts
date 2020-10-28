export interface HistoryItemModel {
	merchantName: string;
	createdOn: string;
	orderId: string;
	status: HistoryItemStatus;
	type: string;
	totalSats: string;
	voucherDetails?: {
		amount: number;
		cardNumber: string;
		cardPin: string;
		websiteURL: string;
	};
}

export enum HistoryItemStatus {
	PENDING = 'Pending',
	COMPLETED = 'Completed',
}
