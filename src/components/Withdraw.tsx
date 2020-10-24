import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colorConstants from '../constants/color';

interface WithdrawProps {

}

export default function Withdraw(props: WithdrawProps) {
	return (
		<View style={styles.root}>
			<Text style={{ color: 'white' }}>Withdraw</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
});
