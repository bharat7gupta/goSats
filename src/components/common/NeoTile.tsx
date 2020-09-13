import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import colorConstants from '../../constants/color';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import NeoButton from './NeoButton';
import Star from './icons/ShiningStar';

interface NeoTileProps {
	text: string;
	icon?: JSX.Element;
	style?: ViewStyle;
	onClick?: () => void;
}

function NeoTile(props: NeoTileProps) {
	const [ pressed, setPressed ] = useState(false);

	const handleTouchStart = () => {
		setPressed(true);
	};

	const handleTouchEnd = () => {
		setPressed(false);

		if (props.onClick) {
			props.onClick();
		}
	};

	const buttonTextStyle = {
		...styles.buttonTextStyle,
		color: pressed ? colorConstants.LIGHT_GREY : colorConstants.FONT_COLOR,
	};

	return (
		<View style={[styles.root, props.style]}>
			<View
				style={styles.container}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<NeomorphFlex
					inner={pressed}
					style={styles.shadow}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					{props.icon}
					<Text style={buttonTextStyle}>{props.text}</Text>
				</NeomorphFlex>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'relative',
		padding: 10,
		flexDirection: 'row',
		flex: 1,
		minHeight: 130,
	},
	container: {
		flex: 1,
	},
	shadow: {
		shadowRadius: 6,
		borderRadius: 10,
		backgroundColor: colorConstants.PRIMARY,
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

export default NeoTile;
