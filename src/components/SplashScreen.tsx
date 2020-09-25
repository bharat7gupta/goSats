import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageLoader from './common/PageLoader';
import colorConstants from '../constants/color';

export default function SplashScreen() {
	return (
		<View style={styles.root}>
			<PageLoader showLoader={true} />
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
	},
});
