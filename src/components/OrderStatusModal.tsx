import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';

import colorConstants from '../constants/color';
import CrossIcon from './common/icons/CrossIcon';
import GiftBoxIcon from './common/icons/GiftBoxIcon';
import Confetti from '../components/common/Confetti/ConfettiView';

interface OrderStatusModalProps {
	isVisible: boolean;
	orderStatus: any;
	onOkayClick: () => void;
}

export default function OrderStatusModal(props: OrderStatusModalProps) {
	let confettiView;
	const { isVisible, orderStatus, onOkayClick } = props;

	useEffect(() => {
		if (isVisible && orderStatus.isCongrats) {
			confettiView.startConfetti();
		}
	}, [ isVisible ]);

	const handleButtonPress = () => {
		if (orderStatus.isCongrats) {
			confettiView.stopConfetti();
		}

		onOkayClick();
	};

	if (!orderStatus || !isVisible) {
		return null;
	}

	return (
		<Modal
			isVisible={isVisible}
			coverScreen={true}
		>
			<View style={styles.root}>
				<Confetti
					ref={node => confettiView = node}
					colors={['#ED302F', '#5475B9', '#FFD330', '#0394CF', '#B91D8B', '#F27D2D', '#009E54']}
					confettiCount={60}
					timeout={0}
				/>

				<GiftBoxIcon />

				{orderStatus.isCongrats ? (
					<Text style={styles.headerText}>Congratulations</Text>
				) : null}

				<Text style={styles.subText}>
					{orderStatus.message || orderStatus.message1}
				</Text>

				{orderStatus.message2 ? (
					<Text style={styles.message}>
						{orderStatus.message2}
					</Text>
				) : null}

				<View style={styles.button} onTouchEndCapture={handleButtonPress}>
					<Text style={styles.buttonText}>Hooray!</Text>
				</View>

				<View style={styles.closeModalIcon} onTouchEndCapture={handleButtonPress}>
					<CrossIcon />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	root: {
		position: 'relative',
		backgroundColor: colorConstants.WHITE,
		paddingHorizontal: 20,
		paddingVertical: 24,
		borderRadius: 10,
		alignItems: 'center',
		overflow: 'hidden',
	},
	headerText: {
		fontFamily: 'SFProText-Bold',
		fontSize: 28,
		lineHeight: 28,
		marginTop: 18,
		color: '#151515',
	},
	subText: {
		fontFamily: 'SFProText-Regular',
		color: '#151515',
		fontSize: 16,
		lineHeight: 18,
		marginTop: 12,
	},
	message: {
		fontFamily: 'SFProText-Bold',
		fontSize: 20,
		lineHeight: 20,
		marginTop: 12,
		color: '#E38551',
	},
	button: {
		backgroundColor: '#E38551',
		borderRadius: 8,
		width: '100%',
		padding: 16,
		marginTop: 24,
	},
	buttonText: {
		textAlign: 'center',
		fontFamily: 'SFProText-Bold',
		fontSize: 16,
		lineHeight: 20,
		color: colorConstants.WHITE,
	},
	closeModalIcon: {
		position: 'absolute',
		top: 20,
		right: 20,
	},
});
