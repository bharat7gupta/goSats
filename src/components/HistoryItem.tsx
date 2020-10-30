import React from 'react';
import { View, Text, StyleSheet, Clipboard } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import { HistoryItemModel, HistoryItemStatus } from '../types/HistoryItemModel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';
import * as UtilityHelper from '../helpers/UtilityHelper';

interface HistoryItemProps {
	historyItem: HistoryItemModel;
}

export default function HistoryItem(props: HistoryItemProps) {
	const { historyItem } = props;

	const handleRedeemVoucher = (voucherDetails) => {
		if (!voucherDetails.cardNumber || !voucherDetails.websiteURL) {
			Toast.show('This voucher is unavailable currently. Please try again later!');
			return;
		}

		const { websiteURL, cardNumber } = voucherDetails;

		Clipboard.setString(cardNumber);
		Toast.show('Copied Voucher Number to clipboard!');

		UtilityHelper.openInAppBrowser(websiteURL);
	};

	const renderHeader = () => {
		return (
			<View style={styles.header}>
				<Text style={styles.merchantName}>{historyItem.merchantName}</Text>

				<View style={styles.totalSats}>
					<Text style={styles.totalSatsText}>{historyItem.totalSats}</Text>
					<Text style={styles.satsText}>sats</Text>
				</View>
			</View>
		);
	};

	const renderStatus = () => {
		const { status, statusColor, statusBgColor } = historyItem;

		return (
			<Text
				style={{
					...styles.statusLabel,
					backgroundColor: statusBgColor,
					color: statusColor,
				}}
			>
				{status}
			</Text>
		);
	};

	const renderDetails = () => {
		return (
			<View style={styles.details}>
				{historyItem.voucherDetails && (
					<View style={styles.detailsRow}>
						<Text style={styles.label}>Amount</Text>
						<Text style={styles.detailsRowValue}>
							{UtilityHelper.getFormattedNumber(historyItem.voucherDetails.amount)}
						</Text>
					</View>
				)}
				<View style={styles.detailsRow}>
					<Text style={styles.label}>Date</Text>
					<Text style={styles.detailsRowValue}>
						{UtilityHelper.getFormattedDate(historyItem.createdOn)}
					</Text>
				</View>

				<View style={styles.detailsRow}>
					<Text style={styles.label}>Order ID</Text>
					<Text style={styles.detailsRowValue}>{historyItem.orderId}</Text>
				</View>
			</View>
		);
	};

	const renderVoucherDetails = () => {
		const { voucherDetails } = historyItem;

		if (!voucherDetails) {
			return null;
		}

		return (
			<View style={styles.voucherDetails}>
				<View style={styles.voucherDetailsRow}>
					<Text style={styles.label}>Voucher Number</Text>
					<Text style={styles.voucherRowValue}>{voucherDetails.cardNumber}</Text>
				</View>

				{!!voucherDetails.cardPin && (
					<View style={styles.voucherDetailsRow}>
						<Text style={styles.label}>Voucher Code</Text>
						<Text style={styles.voucherRowValue}>{voucherDetails.cardPin}</Text>
					</View>
				)}

				<View style={styles.redeemButtonContainer}>
					<TouchableOpacity
						activeOpacity={DEFAULT_TOUCHABLE_OPACITY}
						onPress={() => handleRedeemVoucher(voucherDetails)}
					>
						<Text style={{
							...styles.redeemButton,
							opacity: (!voucherDetails.cardNumber || !voucherDetails.websiteURL) ? 0.4 : 1 }}>Redeem</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<View style={styles.root}>
			<NeomorphFlex
				style={styles.historyItemContainer}
				inner={true}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				<View style={styles.content}>
					{renderHeader()}
					{renderStatus()}
					{renderDetails()}
					{renderVoucherDetails()}
				</View>
			</NeomorphFlex>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingHorizontal: 18,
		paddingVertical: 14,
	},
	historyItemContainer: {
		shadowRadius: 3,
		shadowOpacity: 0.8,
		flexDirection: 'row',
		borderRadius: 12,
		justifyContent: 'flex-start',
	},
	content: {
		flex: 1,
		margin: 6,
		borderRadius: 10,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 14,
		marginTop: 16,
	},
	merchantName: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		lineHeight: 19,
	},
	totalSats: {
		flexDirection: 'row',
	},
	totalSatsText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 22,
		lineHeight: 26,
	},
	satsText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 22,
		marginLeft: 4,
		alignSelf: 'flex-end',
	},
	statusLabel: {
		alignSelf: 'flex-start',
		borderRadius: 3,
		paddingHorizontal: 9,
		paddingVertical: 4,
		fontFamily: 'SFProText-Bold',
		fontSize: 10,
		lineHeight: 12,
		marginLeft: 14,
	},
	details: {
		marginHorizontal: 14,
		marginVertical: 16,
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: '#252525',
		borderRadius: 10,
	},
	detailsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 8,
	},
	label: {
		color: '#737373',
		fontFamily: 'SFProText-Regular',
		fontSize: 12,
		lineHeight: 16,
	},
	detailsRowValue: {
		color: '#939393',
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 16,
	},
	voucherDetails: {
		position: 'relative',
		marginHorizontal: 14,
		marginBottom: 20,
		borderRadius: 4,
		borderStyle: 'dashed',
		borderWidth: 0.5,
		borderColor: '#D0D0D0',
		paddingVertical: 4,
		paddingHorizontal: 12,
	},
	voucherDetailsRow: {
		paddingVertical: 8,
	},
	voucherRowValue: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		lineHeight: 24,
	},
	redeemButtonContainer: {
		position: 'absolute',
		top: 13,
		right: 10,
	},
	redeemButton: {
		borderRadius: 18,
		backgroundColor: '#454B83',
		paddingHorizontal: 18,
		paddingVertical: 9,
		color: '#D0D0D0',
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 17,
	},
});
