export interface HistoryItemModel {
	merchantName: string;
	createdOn: string;
	orderId: string;
	status: HistoryItemStatus;
	statusColor: string;
	statusBgColor: string;
	type: string;
	totalSats: string;
	voucherDetails?: {
		amount: number;
		cardNumber: string;
		cardPin: string;
		websiteURL: string;
		expiryDate: string;
		tcURL: string;
	};
}

export enum HistoryItemStatus {
	PENDING = 'Pending',
	COMPLETED = 'Completed',
}
