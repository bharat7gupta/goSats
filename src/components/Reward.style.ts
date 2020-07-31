import { StyleSheet } from 'react-native';
import { CommonColors } from '../Colors';

const RewardStyles = StyleSheet.create({
	contentStyle: {
		zIndex: 2,
		elevation: 2,
		position: 'relative',
		paddingVertical: 20,
		paddingHorizontal: 30,
		backgroundColor: CommonColors.purple,
		borderRadius: 8,
	},
	confettiContainer: {
		zIndex: 1,
		elevation: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 120,
		flex: 1,
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},
	heading: {
		textAlign: 'center',
		color: CommonColors.white,
		fontSize: 20,
		lineHeight: 24,
		fontFamily: 'Roboto-Bold',
		paddingTop: 30,
		marginBottom: 8,
	},
	medalLogoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	medalLogo: {
		width: 86,
		height: 102,
	},
	winAmount: {
		textAlign: 'center',
		marginTop: 8,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	win: {
		fontSize: 26,
		fontFamily: 'Roboto-Bold',
		color: CommonColors.cyan,
		marginBottom: -2,
	},
	currency: {
		fontSize: 16,
		fontFamily: 'Roboto-Bold',
		color: CommonColors.cyan,
		alignSelf: 'flex-end',
	},
	message: {
		color: CommonColors.white,
		fontSize: 12,
		fontFamily: 'Roboto-Regular',
		textAlign: 'center',
		marginVertical: 12,
	},
	continueButtonContainerStyle: {
		borderRadius: 8,
		marginVertical: 16,
	},
	continueButtonStyle: {
		fontSize: 16,
		fontFamily: 'Roboto-Bold',
	},
});

export default RewardStyles;
