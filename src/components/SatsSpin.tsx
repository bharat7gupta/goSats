import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, Easing } from 'react-native';
import Header from './common/Header';
import colorConstants from '../constants/color';
import styleConstants from '../constants/style';
import * as ApiHelper from '../helpers/ApiHelper';
import * as UtilityHelper from '../helpers/UtilityHelper';
import { ScrollView } from 'react-native-gesture-handler';
import Strings from '../constants/strings';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import CrossIcon from './common/icons/CrossIcon';
import BitcoinArrowIcon from './common/icons/BitcoinArrowIcon';
import AcitonButtonWithShadow from './common/ActionButtonWithShadow';

interface SatsSpinProps {
	navigation: any;
}

const screen = Dimensions.get('screen');
const { width } = screen;
const wheelWidth = width - 64;
const wheelImageWidth = wheelWidth - 8;

export default function SatsSpin(props: SatsSpinProps) {
	const [ submitDisabled, setSubmitDisabled ] = useState(false);
	const spinValue = new Animated.Value(0);

	useEffect(() => {
		fetchSpinWheelData();
	}, []);

	const fetchSpinWheelData = async () => {
		const spinWheelData = await ApiHelper.spinWheel();
		console.log(spinWheelData);
	};

	const onSubmit = () => {
		spinValue.setValue(0);

		Animated.timing(
			spinValue,
			{
				toValue: 1,
				duration: 700,
				easing: Easing.linear,
				useNativeDriver: true,
			},
		).start();
	};

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<View style={styles.root}>
			<Header
				title="Sats Spin"
				showBackButton={true}
				backButtonContent={<CrossIcon />}
				navigation={props.navigation}
				style={styles.header}
			/>

			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Text style={styles.topHeader}>
					{Strings.SATS_SPINNER_HEADER}
				</Text>

				<View style={styles.wheelContainer}>
					<NeomorphFlex
						style={{
							...styleConstants.smallButtonShadowStyles,
							width: wheelWidth,
							height: wheelWidth,
							borderRadius: wheelWidth / 2,
							position: 'relative',
						}}
						darkShadowColor={colorConstants.SHADOW_DARK}
						lightShadowColor={colorConstants.SHADOW_LIGHT}
					>
						<Animated.Image
							source={require('../assets/images/Wheel.png')}
							style={{
								width: wheelImageWidth,
								height: wheelImageWidth,
								transform: [{rotate: spin}],
							}}
						/>

						<BitcoinArrowIcon style={{position: 'absolute'}} />
					</NeomorphFlex>
				</View>

				<View style={styles.spinButton}>
					<AcitonButtonWithShadow
						buttonText="Fortune Spin"
						onClick={onSubmit}
						disabled={submitDisabled}
					/>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingTop: UtilityHelper.StatusBarHeight,
	},
	header: {
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	topHeader: {
		paddingHorizontal: 24,
		paddingVertical: 16,
		margin: 20,
		borderRadius: 10,
		color: colorConstants.FONT_COLOR,
		backgroundColor: colorConstants.PRIMARY_LIGHT,
		textAlign: 'center',
	},
	wheelContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	spinButton: {
		marginHorizontal: 20,
		marginVertical: 20,
	},
});
