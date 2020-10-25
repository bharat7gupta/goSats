import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import Header from './common/Header';
import ChevronLeft from './common/icons/ChevronLeft';
import * as UtilityHelper from '../helpers/UtilityHelper';
import ShadowButton from './common/ShadowButton';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import BitcoinAddressInput from './common/BitcoinAddressInput';
import SatsInput from './common/SatsInput';
import { SATS_PER_BITCOIN } from '../constants/config';

interface WithdrawProps {
	route?: any;
	navigation?: any;
}

export default function Withdraw(props: WithdrawProps) {
	const { params } = props.route;
	const [ bitcoinAddress, setBitcoinAddress ] = useState('');
	const [ satsToWithdraw, setSatsToWithdraw ] = useState(0);
	const [ bitcoinToWithdraw, setBitcoinToWithdraw ] = useState('');
	const [ inrValue, setInrValue ] = useState('');
	const [ validations, setValidation ] = useState<any>({});
	const [ submitDisabled, setSubmitDisabled ] = useState(false);

	const handleBitcoinAddressChange = () => {

	};

	const handleSatsInputChange = (sats: string) => {
		const satsNum = isNaN(Number(sats)) ? 0 : Number(sats);
		const bitcoins = getBitcoinsFromSats(satsNum);
		const bitcoinsWithoutTrailingZeros = bitcoins.replace(/(\.0+|0+)$/, '');
		const inr = getInrFromSats(satsNum);
		const inrFixed = inr ? Number(inr).toFixed(2) : '';

		setSatsToWithdraw(satsNum);
		setBitcoinToWithdraw(bitcoinsWithoutTrailingZeros);
		setInrValue(inrFixed);
	};

	const getBitcoinsFromSats = (sats: number) => {
		return sats ? (+(sats / SATS_PER_BITCOIN)).toFixed(8) : '';
	};

	const getInrFromSats = (sats: number) => {
		if (sats) {
			const bitcoins = Number((+(sats / SATS_PER_BITCOIN)).toFixed(8));
			return (bitcoins * params.inrPerBTC).toString();
		}

		return '';
	};

	const handleWithdraw = () => {

	};

	return (
		<View style={styles.root}>
			<Header
				title="Withdraw"
				showBackButton={true}
				backButtonContent={<ChevronLeft />}
				navigation={props.navigation}
				style={styles.header}
			/>

			<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.content}>
					<BitcoinAddressInput onChange={handleBitcoinAddressChange} />

					<SatsInput spendableSats={params.availableSats} onChange={handleSatsInputChange} />

					<View style={styles.depositContainer}>
						<Text style={styles.depositText}>Deposit BTC Amount</Text>

						<View style={styles.depositContent}>
							<Text style={styles.depositAmount}>{bitcoinToWithdraw}</Text>

							<View style={styles.inrValue}>
								<Text style={styles.inrValueText}>INR Value:</Text>
								{!!inrValue && <Text style={styles.inrValueContent}>₹ {inrValue}</Text>}
							</View>
						</View>
					</View>

					<ShadowButton
						buttonText="Proceed"
						disabled={false}
						onClick={handleWithdraw}
						style={styles.withdrawButton}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingTop: UtilityHelper.StatusBarHeight,
	},
	header: {
		marginHorizontal: 10,
		marginBottom: 10,
		backgroundColor: colorConstants.PRIMARY,
	},
	content: {
		marginVertical: 24,
		marginHorizontal: 18,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		borderRadius: 10,
		paddingVertical: 12,
	},
	depositContainer: {
		margin: 18,
	},
	depositContent: {
		borderRadius: 10,
		backgroundColor: '#252525',
	},
	depositAmount: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontFamily: 'SFProText-Regular',
		fontSize: 18,
		lineHeight: 21,
		paddingHorizontal: 20,
		paddingTop: 14,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.1)',
		height: 45,
	},
	depositText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 12,
		lineHeight: 14,
		marginBottom: 8,
	},
	inrValue: {
		paddingVertical: 14,
		paddingHorizontal: 20,
		flexDirection: 'row',
		height: 45,
	},
	inrValueText: {
		color: colorConstants.WHITE,
		fontFamily: 'SFProText-Regular',
		fontSize: 12,
		lineHeight: 16,
		opacity: 0.4,
	},
	inrValueContent: {
		color: colorConstants.WHITE,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 17,
		opacity: 0.8,
		marginLeft: 4,
	},
	withdrawButton: {
		marginBottom: -20,
	},
});
