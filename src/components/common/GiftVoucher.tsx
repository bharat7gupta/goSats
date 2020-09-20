import React from 'react';
import { ViewStyle, View, Text, StyleSheet } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';

import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';

interface GiftVoucherProps {
	denomination: string;
	isSelected: boolean;
	size?: number;
	style?: ViewStyle;
	onClick: () => void;
}

export default function GiftVoucher(props: GiftVoucherProps) {
	const { denomination, isSelected, size = 68, style, onClick } = props;

	return (
		<View style={style} onTouchEnd={onClick}>
			<Neomorph
				inner={isSelected}
				style={{ ...styleConstants.smallButtonShadowStyles, width: size, height: size, borderRadius: 10 }}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				<Text
					style={{
						...styles.denomination,
						color: isSelected ? colorConstants.ORANGE : colorConstants.FONT_COLOR,
					}}
				>
					{denomination}
				</Text>
			</Neomorph>
		</View>
	);
}

const styles = StyleSheet.create({
	denomination: {
		fontSize: 18,
		lineHeight: 21,
		fontFamily: 'Gilroy-Bold',
	},
});
