import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PageLoader from './common/PageLoader';
import colorConstants from '../constants/color';
import ErrorModal from './common/ErrorModal';

export default function SocialSignIn(props) {
	const [ loading, setLoading ] = useState(true);
	const [ showError, setShowError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');

	useEffect(() => {
		const { params } = props.route;
		console.log(params);
		if (params.error) {
			setLoading(false);
			setShowError(true);
			setErrorMessage(params.error_description);
		}
	}, [ props.route.params ]);

	const handleDismissError = () => {
		props.navigation.navigate('SignUp');
	};

	return (
		<View style={styles.root}>
			<PageLoader showLoader={loading} />
			<ErrorModal
				showError={showError}
				errorMessage={errorMessage}
				onDismissError={handleDismissError}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colorConstants.PRIMARY,
		position: 'relative',
	},
});
