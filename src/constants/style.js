import { StyleSheet } from 'react-native';
import colorConstants from './color';

const styles = StyleSheet.create({
	shadowStyles: {
		shadowRadius: 6,
		shadowOpacity: 0.8,
		borderRadius: 10,
		backgroundColor: colorConstants.PRIMARY,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	smallButtonShadowStyles: {
		shadowRadius: 3,
		shadowOpacity: 0.8,
		borderRadius: 28/2,
		backgroundColor: colorConstants.PRIMARY,
		width: 28,
		height: 28,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default styles;
