import { StyleSheet } from 'react-native';
import { CommonColors } from '../Colors';

const RewardStyles = StyleSheet.create({
	contentStyle: {
		paddingVertical: 20,
		paddingHorizontal: 30,
		backgroundColor: CommonColors.purple,
		borderRadius: 8,
	},
	heading: {
		textAlign: 'center',
		color: CommonColors.white,
		fontSize: 20,
		fontFamily: 'Poppins-Regular',
		paddingTop: 30,
		marginBottom: 16,
	},
	medalLogoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	medalLogo: {
		width: 102,
		height: 108,
	},
	win: {
		color: CommonColors.cyan,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 20,
	},
	message: {
		color: CommonColors.white,
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 12,
	},
	continueButtonStyle: {
		borderRadius: 8,
		marginTop: 20,
	},
});

export default RewardStyles;
