import React, { Component } from 'react';
import { Text, TouchableHighlight, TextStyle, StyleProp } from 'react-native';

import styles from './Button.style';

interface IButtonProps {
  content: React.ReactNode;
  onClick: () => void;
  btnStyle?: StyleProp<TextStyle>;
}

export default class Button extends Component<IButtonProps> {
	render(): React.ReactNode {
		const { content, btnStyle, onClick } = this.props;

		return (
			<TouchableHighlight
				style={[styles.buttonStyle, btnStyle]}
				onPress={onClick}
				underlayColor="#fff"
			>
				<Text style={styles.buttonTextStyle}>
					{content}
				</Text>
			</TouchableHighlight>
		);
	}
}
