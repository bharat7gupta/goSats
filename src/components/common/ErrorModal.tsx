import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import colorConstants from '../../constants/color';
import Exclamation from './icons/Exclamation';
import Button from './Button';

interface ErrorModalProps {
	showError: boolean;
	errorMessage: string;
	onDismissError: () => void;
}

export default function ErrorModal(props: ErrorModalProps) {

	if (!props.showError) {
		return null;
	}

	return (
		<View style={styles.root}>
			<View style={styles.transparentContainer}>
				<View style={styles.content}>
					<Exclamation />

					<View><Text style={styles.headerText}>Uh-oh!</Text></View>
					<View><Text style={styles.errorMessage}>{props.errorMessage}</Text></View>
					<Button btnText="OKAY" onClick={props.onDismissError} btnContainerStyle={styles.btnContainerStyle} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		backgroundColor: colorConstants.OVERLAY,
		justifyContent: 'center',
		alignItems: 'center',
	},
	transparentContainer: {
		backgroundColor: colorConstants.WHITE,
		borderRadius: 20,
		marginHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
	content: {
		width: 320,
		backgroundColor: colorConstants.WHITE,
		padding: 16,
		paddingTop: 32,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerText: {
		color: 'rgba(25, 28, 39, 0.87)',
		fontFamily: 'SFProText-Bold',
		fontSize: 20,
		lineHeight: 28,
		marginTop: 26,
		marginBottom: 16,
	},
	errorMessage: {
		fontFamily: 'SFProText-Regular',
		fontSize: 15,
		lineHeight: 18,
		color: 'rgba(25, 28, 39, 0.87)',
		opacity: 0.9,
	},
	actionButton: {
		width: '100%',
		marginTop: 20,
		borderRadius: 10,
		backgroundColor: colorConstants.ACTION_BUTTON,
	},
	actionButtonText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 19,
		color: colorConstants.WHITE,
		textTransform: 'uppercase',
		paddingVertical: 16,
		textAlign: 'center',
	},
	btnContainerStyle: {
		marginTop: 20,
	},
});
