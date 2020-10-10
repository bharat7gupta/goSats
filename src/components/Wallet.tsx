import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBarHeight } from '../helpers/UtilityHelper';
import PageHeader from './PageHeader';
import styleConstants from '../constants/style';
import colorConstants from '../constants/color';
import LevelProgress from './LevelProgress';
import NeoButton from './common/NeoButton';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';

interface WalletProps {

}

export default function Wallet(props: WalletProps) {
	const level = {
		progressBarBgColor: ['#2D8841', '#5BA94E'],
		curMinSats: 0,
		curMaxSats: 50000,
	};

	const withdrawalTerms = [
		'You need 50,000 sats to withdraw. keep shopping and stack the sats!',
		'Deposit is done every Tuesday.',
		'0% withdrawl fee.',
	];

	return (
		<ScrollView contentContainerStyle={styles.containerStyle} stickyHeaderIndices={[0]}>
			<View style={styles.topSection}>
				<PageHeader title="Wallet" />
			</View>

			<View style={styles.content}>
				<View style={styles.mainHeader}>
					<Text style={styles.earningsHeaderText}>
						Available Sats
					</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.earningsText}>
						10,000
					</Text>
					<Text style={styles.earningsSubText}>
						sats
					</Text>
				</View>

				<View style={styles.inrValueTextContainer}>
					<View style={styles.valueTextChip}>
						<Text style={styles.valueText}>INR Value</Text>
					</View>

					<Text style={styles.inrValue}>₹ 100.00</Text>
				</View>

				<LevelProgress
					level={level}
					earnedSats={10000}
					horizontalProgressBarGradient={true}
					style={{ marginTop: 10 }}
				/>

				<View style={styles.withdrawTermsContainer}>
					<Text style={styles.withdrawTermsHeaderText}>
						Withdraw Terms :
					</Text>

					{withdrawalTerms.map((term, index) => (
						<View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
							<Text style={styles.bulletPoint}>{'\u2022'}</Text>
							<Text style={styles.withdrawTermText}>{term}</Text>
						</View>
					))}
				</View>

				<NeomorphFlex
					style={styleConstants.shadowStyles}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					<Text style={styles.keepShopping}>Keep Shopping</Text>
				</NeomorphFlex>

				<AcitonButtonWithShadow
					buttonText="Withdraw"
					onClick={() => {}}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	containerStyle: {
		flexGrow: 1,
		paddingBottom: 30,
		backgroundColor: colorConstants.PRIMARY,
	},
	topSection: {
		paddingTop: StatusBarHeight,
		backgroundColor: colorConstants.PRIMARY,
	},
	content: {
		marginTop: 24,
		marginHorizontal: 20,
		padding: 20,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		borderRadius: 10,
	},
	mainHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	earningsHeaderText: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 16,
		color: '#737373',
	},
	earningsText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 30,
		lineHeight: 36,
		color: colorConstants.FONT_COLOR,
	},
	earningsSubText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		marginLeft: 10,
		lineHeight: 40,
		color: colorConstants.FONT_COLOR,
		textAlignVertical: 'bottom',
	},
	inrValueTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 9,
	},
	valueTextChip: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		borderRadius: 4,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	valueText: {
		color: '#737373',
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 17,
	},
	inrValue: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		lineHeight: 16,
		marginLeft: 10,
	},
	withdrawTermsContainer: {
		padding: 16,
		backgroundColor: '#242D33',
		marginVertical: 26,
		borderRadius: 10,
	},
	withdrawTermsHeaderText: {
		fontSize: 14,
		lineHeight: 18,
		fontFamily: 'SFProText-Bold',
		color: colorConstants.WHITE,
		opacity: 0.3,
		marginBottom: 10,
	},
	bulletPoint: {
		color: colorConstants.WHITE,
		opacity: 0.6,
		marginRight: 10,
	},
	withdrawTermText: {
		color: colorConstants.WHITE,
		opacity: 0.6,
		flex: 1,
	},
	keepShopping: {
		color: colorConstants.YELLOW_GOLD,
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 19,
		paddingVertical: 16,
	},
});
