import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import colorConstants from '../constants/color';
import * as UtilityHelper from '../helpers/UtilityHelper';
import Header from './common/Header';
import ChevronLeft from './common/icons/ChevronLeft';
import ReferAndEarnBoxIcon from './common/icons/ReferAndEarnBoxIcon';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';

interface ReferAndEarnProps {
	route?: any;
	navigation: any;
}

export default function ReferAndEarn(props: ReferAndEarnProps) {
	const { params } = props.route;
	const referralId = params && params.referralId;

	const handleCopyClick = () => {
		Clipboard.setString(referralId);

		Toast.show('Referral code copied to clipboard!');
	};

	return (
		<View style={styles.root}>
			<Header
				title="Refer & Earn"
				showBackButton={true}
				backButtonContent={<ChevronLeft />}
				navigation={props.navigation}
				style={styles.header}
			/>

			<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
				<View style={styles.topIcon}>
					<ReferAndEarnBoxIcon />
				</View>

				<View style={styles.container}>
					<NeomorphFlex
						style={styles.earnSatsContainer}
						inner={true}
						darkShadowColor={colorConstants.SHADOW_DARK}
						lightShadowColor={colorConstants.SHADOW_LIGHT}
					>
						<View style={styles.content}>
							<Text style={styles.headerText}>Earn Free Bitcoin</Text>
							<Text style={styles.subText}>
								Share the below referral code with your friends and family. When they sign up using your code, you both get 10,000 sats when they make their first purchase! 
							</Text>

							<View style={styles.referralCodeContainer}>
								<View>
									<Text style={styles.referralCodeHeader}>Your Referral Code</Text>
									<Text style={styles.referralCode}>{referralId}</Text>
								</View>

								<TouchableOpacity
									style={{ alignSelf: 'center' }}
									activeOpacity={DEFAULT_TOUCHABLE_OPACITY}
									onPress={handleCopyClick}
								>
									<Text style={styles.copyButtonText}>Copy</Text>
								</TouchableOpacity>
							</View>
						</View>
					</NeomorphFlex>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingTop: UtilityHelper.StatusBarHeight + 10,
	},
	header: {
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	topIcon: {
		marginVertical: 36,
		alignSelf: 'center',
	},
	container: {
		paddingHorizontal: 18,
		paddingVertical: 14,
	},
	earnSatsContainer: {
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
	headerText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 30,
		lineHeight: 30,
		textAlign: 'center',
		marginTop: 16,
	},
	subText: {
		color: '#939393',
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 19,
		padding: 16,
	},
	referralCodeContainer: {
		marginHorizontal: 14,
		marginBottom: 20,
		borderRadius: 4,
		borderStyle: 'dashed',
		borderWidth: 0.5,
		borderColor: '#D0D0D0',
		paddingVertical: 10,
		paddingHorizontal: 14,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	referralCodeHeader: {
		color: '#737373',
		fontFamily: 'SFProText-Regular',
		fontSize: 12,
		lineHeight: 16,
	},
	referralCode: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		lineHeight: 16,
		marginTop: 8,
	},
	copyButtonText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 14,
		lineHeight: 16,
		paddingVertical: 9,
		paddingHorizontal: 26,
		backgroundColor: '#9D4F25',
		borderRadius: 18,
	},
});
