import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

interface RegisterParams {
	userName: string;
	email: string;
	password: string;
}

interface ConfirmUserByOtpParams {
	userName: string;
	otp: string;
}

const poolData = {
	UserPoolId: 'us-east-2_2IOhMeLKk',
	ClientId: '4fbmrnknnib3kcgmp9ppvb4mem',
};

const userPool = new CognitoUserPool(poolData);

export function registerUser(params: RegisterParams, callback) {
	const attributeList = [
		new CognitoUserAttribute({ Name: 'email', Value: params.email }),
	];

	userPool.signUp(params.userName, params.password, attributeList, null, callback);
}

export function confirmUserByOtp(params: ConfirmUserByOtpParams, callback) {
	const userData = {
		Username: params.userName,
		Pool: userPool,
	};

	const cognitoUser = new CognitoUser(userData);

	cognitoUser.confirmRegistration(params.otp, true, callback);
}
