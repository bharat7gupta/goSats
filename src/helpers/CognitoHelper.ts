import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Amplify, { Auth, Hub } from 'aws-amplify';
import * as UtilityHelper from '../helpers/UtilityHelper';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

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

/* Cognito Social Sign In URLs */
export const getSocialSignInURL = (provider: string) => {
	const redirectUri = 'gosats://socialsignin/';
	const responseType = 'code';
	const domain = 'gosats-dvp.auth.us-east-2.amazoncognito.com';
	const clientId = poolData.ClientId;
	const scopes = ['phone', 'email', 'profile', 'openid'];

	const pkce_key = generateRandom(128);
	const scopesString = scopes.join(' ');
	const generatedState = generateState(32);
	const code_challenge = generateChallenge(pkce_key);
	const code_challenge_method = 'S256';

	const queryString = Object.entries({
		redirect_uri: redirectUri,
		response_type: responseType,
		client_id: clientId,
		identity_provider: provider,
		scope: scopesString,
		state: generatedState,
		...(responseType === 'code' ? { code_challenge } : {}),
		...(responseType === 'code' ? { code_challenge_method } : {}),
	})
		.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
		.join('&');

	const URL = `https://${domain}/oauth2/authorize?${queryString}`;

	return URL;
};

function generateState(length: number) {
	let result = '';
	let i = length;
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	for (; i > 0; --i) {
		result += chars[Math.round(Math.random() * (chars.length - 1))];
	}

	return result;
}

function generateRandom(size: number) {
	const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
	const buffer = new Uint8Array(size);

	if (typeof window !== 'undefined' && !!window.crypto) {
		window.crypto.getRandomValues(buffer);
	} else {
		for (let i = 0; i < size; i += 1) {
			buffer[i] = (Math.random() * CHARSET.length) | 0;
		}
	}

	return bufferToString(buffer);
}

function generateChallenge(code: string) {
	return base64URL(sha256(code));
}

function bufferToString(buffer: Uint8Array) {
	const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const state = [];

	for (let i = 0; i < buffer.byteLength; i += 1) {
		const index = buffer[i] % CHARSET.length;
		state.push(CHARSET[index]);
	}

	return state.join('');
}

function base64URL(string) {
	return string
		.toString(Base64)
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
}
