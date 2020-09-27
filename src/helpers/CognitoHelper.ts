import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
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
