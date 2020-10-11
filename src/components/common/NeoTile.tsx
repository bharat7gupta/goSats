import React, { useState } from 'react';
import { StyleSheet, View, Text, ViewStyle, Image } from 'react-native';
import colorConstants from '../../constants/color';
import { NeomorphFlex, Neomorph } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import FavouriteButton from './FavouriteButton';
import Brand from '../../types/Brand';
import BitcoinOffer from './icons/BitcoinOffer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface NeoTileProps {
	brand: Brand;
	style?: ViewStyle;
	onClick?: () => void;
}

export default function NeoTile(props: NeoTileProps) {
	const [ pressed, setPressed ] = useState(false);

	const handlePressIn = () => {
		setPressed(true);
	};

	const handlePressOut = () => {
		setPressed(false);
	};

	const handlePress = () => {
		if (props.onClick) {
			props.onClick();
		}
	};

	const { brand, style } = props;

	if (!brand) {
		return null;
	}

	return (
		<View style={[styles.root, style]}>
			<View style={styles.container}>
				<TouchableWithoutFeedback
					style={styles.tileContainer}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					onPress={handlePress}
				>
					<NeomorphFlex
						inner={pressed}
						style={styleConstants.shadowStyles}
						darkShadowColor={colorConstants.SHADOW_DARK}
						lightShadowColor={colorConstants.SHADOW_LIGHT}
					>
						<Image source={{ uri: brand.image }} style={styles.image}/>
					</NeomorphFlex>
				</TouchableWithoutFeedback>

				<Text style={styles.name}>{brand.name}</Text>

				<View style={styles.rewardLine}>
					<BitcoinOffer />
					<Text style={styles.rewardLineText}>{brand.reward}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'relative',
		flexDirection: 'row',
		flex: 1,
	},
	container: {
		flex: 1,
	},
	tileContainer: {
		height: 150,
		padding: 12,
	},
	buttonTextStyle: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 18,
		paddingTop: 4,
	},
	favourite: {
		position: 'absolute',
		top: 10,
		right: 20,
	},
	image: {
		width: 100,
		height: 60,
		resizeMode: 'contain',
	},
	name: {
		marginTop: -4,
		color: colorConstants.FONT_COLOR,
		opacity: 0.85,
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 28,
		paddingLeft: 12,
	},
	rewardLine: {
		flexDirection: 'row',
		paddingLeft: 12,
	},
	rewardLineText: {
		color: colorConstants.DARK_GREY,
		fontSize: 11,
		lineHeight: 13,
		marginLeft: 4,
	},
});
