import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import styleConstants from '../../constants/style';
import colorConstants from '../../constants/color';
import ChevronLeft from './icons/ChevronLeft';

interface BackButtonProps {
	style?: ViewStyle;
	onClick?: () => void;
}

function BackButton(props: BackButtonProps) {
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

	const handleTouchCancel = () => {
		setPressed(false);
	};

	return (
		<View style={[styles.root, props.style]}>
			<View
				style={styles.container}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				onTouchCancel={handleTouchCancel}
			>
				<NeomorphFlex
					inner={pressed}
					style={{ ...styleConstants.smallButtonShadowStyles, width: 32, height: 32, borderRadius: 20 }}
					darkShadowColor={colorConstants.SHADOW_DARK}
					lightShadowColor={colorConstants.SHADOW_LIGHT}
				>
					<ChevronLeft />
				</NeomorphFlex>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		padding: 10,
	},
	container: {
		flex: 1,
	},
});

export default BackButton;
