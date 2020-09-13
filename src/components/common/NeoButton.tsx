import React, { Component } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import colorConstants from '../../constants/color';
import { NeomorphFlex } from 'react-native-neomorph-shadows';

const styles = StyleSheet.create({
	root: {
		padding: 10,
		flexDirection: 'row',
		flex: 1,
	},
	shadow: {
		shadowRadius: 6,
		borderRadius: 10,
		backgroundColor: colorConstants.PRIMARY,
		paddingHorizontal: 20,
		paddingVertical: 14,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonTextStyle: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'Gilroy-Bold',
		fontSize: 16,
		lineHeight: 18,
		marginLeft: 10,
		paddingTop: 4,
	},
});

interface NeuButtonProps {
	text: string;
	icon?: JSX.Element;
	style?: ViewStyle;
}

class NeoButton extends Component<NeuButtonProps> {
	render (): JSX.Element {
		const { text, icon, style } = this.props;

		return (
			<View style={[styles.root, style]}>
				<NeomorphFlex
					style={styles.shadow}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					{icon}
					<Text style={styles.buttonTextStyle}>{text}</Text>
				</NeomorphFlex>
			</View>
		);
	}
}

export default NeoButton;
