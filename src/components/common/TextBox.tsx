import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colorConstants from '../../constants/color';

interface TextBoxProps {
	placeholder:  string;
	secureTextEntry?: boolean;
	blurOnSubmit?: boolean;
	errorText?: string;
	onChange: (text: string) => void;
	setTextInputRef?: (ref: any) => void;
	onSubmitEditing?: () => void;
}

export default function TextBox(props: TextBoxProps) {
	const handleChange = (event) => {
		const { text } = event.nativeEvent;
		props.onChange(text);
	};

	return (
		<View>
			<TextInput
				style={styles.input}
				underlineColorAndroid="transparent"
				placeholder={props.placeholder}
				placeholderTextColor={colorConstants.TEXTBOX_PLACEHOLDER_TEXT_COLOR}
				autoCapitalize="none"
				onChange={handleChange}
				onSubmitEditing={props.onSubmitEditing}
				secureTextEntry={props.secureTextEntry}
				blurOnSubmit={props.blurOnSubmit}
				ref={props.setTextInputRef}
			/>

			<Text style={styles.errorText}>{props.errorText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 56,
		backgroundColor: colorConstants.TEXTBOX_BACKGROUND,
		borderRadius: 19,
		paddingHorizontal: 22,
		paddingVertical: 16,
		color: colorConstants.FONT_COLOR,
		fontSize: 15,
		lineHeight: 24,
		fontFamily: 'Gilroy-Regular',
		marginVertical: 8,
	},
	errorText: {
		fontSize: 12,
		lineHeight: 16,
		minHeight: 16,
		fontFamily: 'Gilroy-Regular',
		color: colorConstants.VALIDATION_TEXT_COLOR,
		marginTop: -6,
		marginLeft: 23,
	},
});
