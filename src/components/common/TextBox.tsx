import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import colorConstants from '../../constants/color';
import { NeomorphFlex } from 'react-native-neomorph-shadows';

interface TextBoxProps {
	placeholder:  string;
	secureTextEntry?: boolean;
	maxLength?: number;
	blurOnSubmit?: boolean;
	errorText?: string;
	value?: string;
	inputStyles?: ViewStyle;
	onChange: (text: string) => void;
	setTextInputRef?: (ref: any) => void;
	onSubmitEditing?: () => void;
}

export default function TextBox(props: TextBoxProps) {
	const [ value, setValue ] = useState('');

	useEffect(() => {
		setValue(props.value || '');
	}, []);

	const handleChange = (event) => {
		const { text } = event.nativeEvent;
		setValue(text);
		props.onChange(text);
	};

	return (
		<View style={styles.root}>
			<NeomorphFlex
				inner={true}
				style={styles.inputContainer}
				darkShadowColor={colorConstants.SHADOW_DARK}
				lightShadowColor={colorConstants.SHADOW_LIGHT}
			>
				<TextInput
					value={value}
					style={[styles.input, props.inputStyles ]}
					underlineColorAndroid="transparent"
					placeholder={props.placeholder}
					placeholderTextColor={colorConstants.TEXTBOX_PLACEHOLDER_TEXT_COLOR}
					maxLength={props.maxLength}
					autoCapitalize="none"
					onChange={handleChange}
					onSubmitEditing={props.onSubmitEditing}
					secureTextEntry={props.secureTextEntry}
					blurOnSubmit={props.blurOnSubmit}
					ref={props.setTextInputRef}
				/>
			</NeomorphFlex>

			<Text style={styles.errorText}>{props.errorText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingHorizontal: 18,
		paddingVertical: 4,
	},
	inputContainer: {
		shadowRadius: 3,
		shadowOpacity: 0.8,
		flexDirection: 'row',
		borderRadius: 10,
		height: 60,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colorConstants.PRIMARY_LIGHT,
	},
	input: {
		height: 56,
		backgroundColor: colorConstants.TEXTBOX_BACKGROUND,
		borderRadius: 19,
		paddingHorizontal: 16,
		paddingVertical: 16,
		color: colorConstants.FONT_COLOR,
		fontSize: 15,
		lineHeight: 18,
		fontFamily: 'SFProText-Regular',
		marginVertical: 8,
		flex: 1,
	},
	errorText: {
		fontSize: 12,
		lineHeight: 16,
		minHeight: 16,
		fontFamily: 'SFProText-Regular',
		color: colorConstants.VALIDATION_TEXT_COLOR,
		marginTop: 4,
		marginLeft: 17,
	},
});
