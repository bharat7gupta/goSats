import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import colorConstants from '../../constants/color';
import BackButton from './BackButton';

interface HeaderProps {
	title: string;
	showBackButton: boolean;
	navigation?: any; // TODO: add type. router navigation object
	style?: ViewStyle;
}

export default function Header(props: HeaderProps) {
	const { title, showBackButton = false, navigation } = props;

	const handleBackButtonClick = () => {
		navigation.goBack();
	};

	return (
		<View style={[styles.header, props.style]}>
			{showBackButton && (
				<BackButton
					onClick={handleBackButtonClick}
					style={styles.buttonStyle}
				/>
			)}

			<Text style={styles.headerText}>
				{title}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		paddingBottom: 8,
		justifyContent: 'center',
		marginTop: 10,
	},
	buttonStyle: {
		position: 'absolute',
		left: 10,
		top: 0,
	},
	headerText: {
		color: colorConstants.FONT_COLOR,
		fontFamily: 'SFProText-Bold',
		fontSize: 20,
		lineHeight: 28,
		marginTop: 10,
	},
});
