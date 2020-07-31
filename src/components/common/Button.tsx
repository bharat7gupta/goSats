import React, { Component } from 'react';
import { Text, TouchableHighlight, TextStyle, StyleProp } from 'react-native';

import styles from './Button.style';

interface IButtonProps {
  content: React.ReactNode;
  onClick: () => void;
  btnContainerStyle?: StyleProp<TextStyle>;
  btnStyle?: StyleProp<TextStyle>;
}

export default class Button extends Component<IButtonProps> {
	render(): React.ReactNode {
		const { content, btnContainerStyle, btnStyle, onClick } = this.props;

		return (
			<TouchableHighlight
				style={[styles.buttonStyle, btnContainerStyle]}
				onPress={onClick}
				underlayColor="#fff"
			>
				<Text style={[styles.buttonTextStyle, btnStyle]}>
					{content}
				</Text>
			</TouchableHighlight>
		);
	}
}
