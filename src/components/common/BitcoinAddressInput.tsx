import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import Toast from 'react-native-simple-toast';
import colorConstants from '../../constants/color';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import ScannerIcon from './icons/ScannerIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEFAULT_TOUCHABLE_OPACITY } from '../../constants/config';

interface BitcoinAddressInputProps {
	onChange: (text: string) => void;
}

export default function BitcoinAddressInput(props: BitcoinAddressInputProps) {
	const handleAddressChange = () => {

	};

	const handleScannerClick = () => {

	};

	return (
		<View style={styles.root}>
			<Text style={styles.label}>Bitcoin Address</Text>

			<NeomorphFlex
				inner={true}
				style={styles.inputContainer}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				<TextInput
					style={styles.input}
					underlineColorAndroid="transparent"
					onChange={handleAddressChange}
				/>

				<TouchableOpacity
					activeOpacity={DEFAULT_TOUCHABLE_OPACITY}
					onPress={handleScannerClick}
				>
					<View style={styles.scannerContainer}>
						<ScannerIcon />
					</View>
				</TouchableOpacity>
			</NeomorphFlex>
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
	scannerContainer: {
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderLeftWidth: 1,
		borderLeftColor: 'rgba(255, 255, 255, 0.2)',
	},
});
