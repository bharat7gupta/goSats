import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import colorConstants from '../../constants/color';
import * as StorageHelper from '../../helpers/StorageHelper';

interface QRScannerProps {
	route?: any;
	navigation?: any;
}

export default function QRScanner(props: QRScannerProps) {
	const handleScanSuccess = (event) => {
		const { params } = props.route;

		StorageHelper.setItem(params.dataKey, event.data);
		props.navigation.goBack();
	};

	const handleStopScan = () => {
		props.navigation.goBack();
	};

	return (
		<View style={styles.root}>
			<QRCodeScanner
				onRead={handleScanSuccess}
				bottomContent={
					<TouchableOpacity onPress={handleStopScan}>
						<Text style={styles.stopScan}>Stop Scan</Text>
					</TouchableOpacity>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
	stopScan: {
		marginVertical: 20,
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 17,
		textAlign: 'center',
		color: colorConstants.WHITE,
		opacity: 0.8,
	},
});
