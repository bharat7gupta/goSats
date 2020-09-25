import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Strings from '../constants/strings';

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
	UserPoolId: 'us-east-2_uEnqzdtdo',
	ClientId: '26mh7ae2829errfphvbpa5btm',
};

const userPool = new CognitoUserPool(poolData);

export function registerUser(params: RegisterParams, callback) {
	const attributeList = [
		new CognitoUserAttribute({ Name: 'name', Value: params.userDisplayName }),
	];

	userPool.signUp(params.username, params.password, attributeList, null, callback);
}

export function confirmUserByOtp(params: ConfirmUserByOtpParams, callback) {
	const userData = {
		Username: params.username,
		Pool: userPool,
	};

	const cognitoUser = new CognitoUser(userData);

	cognitoUser.confirmRegistration(params.otp, true, callback);
}

export function resendConfirmationCode(params: ResendConfirmationCodeParams, callback) {
	const userData = {
		Username: params.username,
		Pool: userPool,
	};

	const cognitoUser = new CognitoUser(userData);

	cognitoUser.resendConfirmationCode(callback);
}

export function loginUser(params: LoginParams, successCallback, failureCallback) {
	const authenticationData = {
		Username: params.username,
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
