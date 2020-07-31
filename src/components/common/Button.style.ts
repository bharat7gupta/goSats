import { StyleSheet } from 'react-native';
import { CommonColors } from '../../Colors';

const ButtonStyle = StyleSheet.create({
	buttonStyle: {
		backgroundColor: CommonColors.orange,
		paddingVertical: 20,
	},
	buttonTextStyle: {
		fontFamily: 'Roboto-Regular',
		fontSize: 15,
		lineHeight: 20,
		textAlign: 'center',
		color: CommonColors.white,
		textTransform: 'uppercase',
	},
});

export default ButtonStyle;
