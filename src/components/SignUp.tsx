import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import Header from './common/Header';
import styleConstants from '../constants/style';
import colorConstants from '../constants/color';
import Button from './common/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { NeomorphFlex } from 'react-native-neomorph-shadows';
import NeoButton from './common/NeoButton';

export default function SignUp(props) {
	const handleUserNameChange = () => {

	};

	const onSubmit = () => {

	};

	return (
		<View style={styles.root}>
			<ScrollView>
				<Header
					title="Sign Up"
					showBackButton={false}
					navigation={props.navigation}
					style={{ marginBottom: 32 }}
				/>

				<TextInput
					style={styles.input}
					underlineColorAndroid="transparent"
					placeholder="Your Name"
					placeholderTextColor="#7F8489"
					autoCapitalize="none"
					onChangeText={handleUserNameChange}
				/>

				<TextInput
					style={styles.input}
					underlineColorAndroid="transparent"
					placeholder="Your Email"
					placeholderTextColor="#7F8489"
					autoCapitalize="none"
					onChangeText={handleUserNameChange}
				/>

				<TextInput
					style={styles.input}
					underlineColorAndroid="transparent"
					placeholder="Enter a Password"
					placeholderTextColor="#7F8489"
					autoCapitalize="none"
					onChangeText={handleUserNameChange}
				/>

				<Button
					btnText="Sign Up"
					onClick={onSubmit}
					btnContainerStyle={{ marginTop: 10 }}
				/>

				<View style={styles.socialSignUp}>
					<View style={styles.horizontalLine} />
					<Text style={styles.socialSignUpHeaderText}>Or sign up with</Text>

					<View style={styles.socialPlatforms}>
						{/* <Text>Bharat</Text>
						<Text>Gupta</Text> */}
						<NeoButton
							buttonContentStyle={styles.socialButton}
							icon={<Image source={require('../assets/images/google.png')} />}
						/>

						<NeoButton
							buttonContentStyle={styles.socialButton}
							icon={<Image source={require('../assets/images/facebook.png')} />}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		paddingHorizontal: 24,
	},
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
		marginVertical: 18,
	},
	socialSignUp: {
		marginTop: 68,
		justifyContent: 'center',
	},
	horizontalLine: {
		width: '100%',
		borderRadius: 100,
		backgroundColor: 'rgba(127, 132, 137, 0.25)',
		height: 3,
	},
	socialSignUpHeaderText: {
		fontSize: 20,
		lineHeight: 28,
		fontFamily: 'Gilroy-Bold',
		color: colorConstants.FONT_COLOR,
		textAlign: 'center',
		marginTop: 28,
	},
	socialPlatforms: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		marginVertical: 40,
	},
	socialButton: {
		width: 110,
		height: 110,
	},
});
