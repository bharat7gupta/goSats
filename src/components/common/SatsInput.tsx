import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import Toast from 'react-native-simple-toast';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import colorConstants from '../../constants/color';
import * as UtilityHelper from '../../helpers/UtilityHelper';
import WalletFilledIcon from './icons/WalletFilledIcon';

interface SatsInputProps {
	spendableSats: number;
	onChange: (sats: string) => void;
}

export default function SatsInput(props: SatsInputProps) {
	const [ withdrawSats, setWithdrawSats ] = useState('');
	const [ satsAmount, setSatsAmount ] = useState('');

	const handleChange = (event) => {
		const { text } = event.nativeEvent;

		if (/^\d*$/.test(text)) {
			setWithdrawSats(text);
			setSatsAmount(text);

			props.onChange(text);
		}
	};

	const handleFocus = () => {
		setSatsAmount(withdrawSats);
	};

	const handleBlur = () => {
		setSatsAmount(UtilityHelper.getFormattedNumber(withdrawSats));
	};

	const handleKeyPress = (event) => {
		const { key } = event.nativeEvent;

		if (key.match(/,.*,/g)) {
			event.preventDefault();
			return false;
		}

		return true;
	};

	const handleWithdrawAll = () => {
		const totalSats = props.spendableSats.toString();

		setSatsAmount(UtilityHelper.getFormattedNumber(props.spendableSats));
		setWithdrawSats(totalSats);

		props.onChange(totalSats);
	};

	const formattedSpendableSats = UtilityHelper.getFormattedNumber(props.spendableSats);

	return (
		<View style={styles.root}>
			<Text style={styles.label}>Sats Amount</Text>

			<NeomorphFlex
				inner={true}
				style={styles.inputContainer}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				<TextInput
					style={styles.input}
					underlineColorAndroid="transparent"
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onKeyPress={handleKeyPress}
					value={satsAmount}
					keyboardType="phone-pad"
				/>
			</NeomorphFlex>

			<View style={styles.satsAmount}>
				<View style={{ flexDirection: 'row' }}>
					<WalletFilledIcon />
					<Text style={styles.balanceText}>{formattedSpendableSats}</Text>
				</View>

				<TouchableOpacity onPress={handleWithdrawAll}>
					<Text style={styles.withdrawAllText}>Withdraw All</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingHorizontal: 18,
		paddingVertical: 4,
	},
	label: {
		color: 'rgba(255, 255, 255, 0.5)',
		fontSize: 12,
		lineHeight: 14,
		fontFamily: 'SFProText-Regular',
		marginVertical: 6,
	},
	inputContainer: {
		shadowRadius: 3,
		shadowOpacity: 0.8,
		flexDirection: 'row',
		borderRadius: 10,
		height: 60,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colorConstants.PRIMARY_LIGHT,
	},
	input: {
		height: 56,
		backgroundColor: colorConstants.TEXTBOX_BACKGROUND,
		borderRadius: 19,
		paddingHorizontal: 16,
		paddingVertical: 16,
		color: colorConstants.FONT_COLOR,
		fontSize: 15,
		lineHeight: 18,
		fontFamily: 'SFProText-Regular',
		marginVertical: 8,
		flex: 1,
	},
	satsAmount: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
		marginBottom: 4,
	},
	balanceText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 16,
		marginLeft: 10,
		marginTop: -2,
	},
	withdrawAllText: {
		color: '#CF7A4C',
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 16,
		marginLeft: 10,
	},
});
