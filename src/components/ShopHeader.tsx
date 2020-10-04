import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import { Neomorph } from 'react-native-neomorph-shadows';
import NotificationIcon from './common/icons/NotificationIcon';

export default function ShopHeader() {
	return (
		<View style={styles.root}>
			<Text style={styles.headerText}>Shop</Text>

			<View style={{ marginLeft: 20 }}>
				<Neomorph
					style={{ ...styleConstants.smallButtonShadowStyles, width: 40, height: 40, borderRadius: 40/2 }}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					<NotificationIcon />
				</Neomorph>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingBottom: 16,
		paddingHorizontal: 18,
		marginBottom: 24,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// backgroundColor: 'rgba(21, 21, 21, 0.8)',
	},
	headerText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 30,
		lineHeight: 30,
	},
});
