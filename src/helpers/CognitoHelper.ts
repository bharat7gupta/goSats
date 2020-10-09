import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Amplify, { Auth, Hub } from 'aws-amplify';
import * as UtilityHelper from '../helpers/UtilityHelper';

interface RegisterParams {
	username: string; // email or mobile no.
	password: string;
	userDisplayName: string;
}

interface ConfirmUserByOtpParams {
	username: string;
	otp: string;
}

interface ResendConfirmationCodeParams {
	username: string;
}

interface LoginParams {
	username: string;
	password: string;
}

const poolData = {
	UserPoolId: 'us-east-2_M60CynCG2',
	ClientId: '6lla9iektearf9j1q17cq66d5r',
};

const userPool = new CognitoUserPool(poolData);

Amplify.configure({
	Auth: {

		// REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
		identityPoolId: 'us-east-2:82ea99f5-109d-4191-8f63-0e65470bf277',

		// REQUIRED - Amazon Cognito Region
		region: 'us-east-2',

		// OPTIONAL - Amazon Cognito Federated Identity Pool Region 
		// Required only if it's different from Amazon Cognito Region
		identityPoolRegion: 'us-east-2',

		// OPTIONAL - Amazon Cognito User Pool ID
		userPoolId: 'us-east-2_M60CynCG2',

		// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
		userPoolWebClientId: '6lla9iektearf9j1q17cq66d5r',

		// OPTIONAL - Hosted UI configuration
		oauth: {
			domain: 'gosats-dvp.auth.us-east-2.amazoncognito.com',
			scope: ['phone', 'email', 'profile', 'openid'],
			redirectSignIn: 'gosats://socialsignin/',
			redirectSignOut: 'gosats://socialsignin/',
			responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
		},
	},
});

export function registerUser(params: RegisterParams, callback) {
	const attributeList = [
		new CognitoUserAttribute({ Name: 'name', Value: params.userDisplayName }),
	];

	const givenUsername = params.username;
	const username = UtilityHelper.isEmail(givenUsername) ? givenUsername : `+91${givenUsername}`;

	userPool.signUp(username, params.password, attributeList, null, callback);
}

export function confirmUserByOtp(params: ConfirmUserByOtpParams, callback) {
	const givenUsername = params.username;
	const username = UtilityHelper.isEmail(givenUsername) ? givenUsername : `+91${givenUsername}`;

	const userData = {
		Username: username,
		Pool: userPool,
	};

	const cognitoUser = new CognitoUser(userData);

	cognitoUser.confirmRegistration(params.otp, true, callback);
}

export function resendConfirmationCode(params: ResendConfirmationCodeParams, callback) {
	const givenUsername = params.username;
	const username = UtilityHelper.isEmail(givenUsername) ? givenUsername : `+91${givenUsername}`;

	const userData = {
		Username: username,
		Pool: userPool,
	};

	const cognitoUser = new CognitoUser(userData);

	cognitoUser.resendConfirmationCode(callback);
}

export function loginUser(params: LoginParams, successCallback, failureCallback) {
	const givenUsername = params.username;
	const username = UtilityHelper.isEmail(givenUsername) ? givenUsername : `+91${givenUsername}`;

	const authenticationData = {
		Username: username,
		Password: params.password,
	};

	const authenticationDetails = new AuthenticationDetails(authenticationData);

	const userData = {
		Username: params.username,
		Pool: userPool,
	};

	const cognitoUser = new CognitoUser(userData);

	cognitoUser.authenticateUser(authenticationDetails, {
		onSuccess: successCallback,
		onFailure: failureCallback,
	});
}
