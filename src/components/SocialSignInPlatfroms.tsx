import React from 'react';
import { View, StyleSheet } from 'react-native';
import NeoButton from './common/NeoButton';
import GoogleIcon from './common/icons/GoogleIcon';
import FacebookIcon from './common/icons/FacebookIcon';
import { Auth } from 'aws-amplify';

export default function SocialSignInPlatforms() {
	const handleGoogleSignIn = () => {
		Auth.federatedSignIn({ provider: 'Google' });
	};

	return (
		<View style={styles.socialPlatforms}>
			<NeoButton containerStyle={styles.socialButton} onClick={handleGoogleSignIn}>
				<GoogleIcon />
			</NeoButton>

			<NeoButton containerStyle={styles.socialButton}>
				<FacebookIcon />
			</NeoButton>
		</View>
	);
}

const styles = StyleSheet.create({
	socialPlatforms: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		marginTop: 24,
		marginBottom: 40,
	},
	socialButton: {
		width: 110,
		height: 110,
	},
});
