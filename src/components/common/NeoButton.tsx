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

interface NeoButtonProps {
	text: string;
	icon?: JSX.Element;
	style?: ViewStyle;
}

interface NeoButtonState {
	pressed: boolean;
}

class NeoButton extends Component<NeoButtonProps> {
	state = {
		pressed: false,
	};

	handleTouchStart = () => {
		this.setState({ pressed: true });
	}

	handleTouchEnd = () => {
		this.setState({ pressed: false });
	}

	render (): JSX.Element {
		const { text, icon, style } = this.props;
		const { pressed } = this.state;
		const buttonTextStyle = {
			...styles.buttonTextStyle,
			color: pressed ? colorConstants.LIGHT_GREY : colorConstants.FONT_COLOR,
		};

		return (
			<View style={[styles.root, style]}>
				<View onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>
					<NeomorphFlex
						inner={pressed}
						style={styles.shadow}
						darkShadowColor={colorConstants.SHADOW_DARK}
						lightShadowColor={colorConstants.SHADOW_LIGHT}
					>
						{icon}
						<Text style={buttonTextStyle}>{text}</Text>
					</NeomorphFlex>
				</View>
			</View>
		);
	}
}

export default NeoButton;
