import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import { Neomorph } from 'react-native-neomorph-shadows';
import NotificationIcon from './common/icons/NotificationIcon';
import UserIcon from './common/icons/UserIcon';
import { DEFAULT_TOUCHABLE_OPACITY } from '../constants/config';

interface PageHeaderProps {
	title: string;
	navigation?: any;
}

export default function PageHeader(props: PageHeaderProps) {
	const handleUserIconClick = () => {
		props.navigation.navigate('Profile');
	};

	return (
		<View style={styles.root}>
			<Text style={styles.headerText}>{props.title}</Text>

			<TouchableOpacity activeOpacity={DEFAULT_TOUCHABLE_OPACITY} style={{ marginLeft: 20 }} onPress={handleUserIconClick}>
				<Neomorph
					style={{ ...styleConstants.smallButtonShadowStyles, width: 40, height: 40, borderRadius: 40/2 }}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					<UserIcon />
				</Neomorph>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingBottom: 16,
		paddingHorizontal: 18,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 30,
		lineHeight: 30,
	},
});
