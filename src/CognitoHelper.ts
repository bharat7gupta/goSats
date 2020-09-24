import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

interface RegisterParams {
	userName: string;
	email: string;
	password: string;
}

const poolData = {
	UserPoolId: 'us-east-2_2IOhMeLKk',
	ClientId: '41jvktg1ec45er06bgqoukugpk',
};

const userPool = new CognitoUserPool(poolData);

export function registerUser(params: RegisterParams, callback) {
	const attributeList = [
		new CognitoUserAttribute({ Name: 'email', Value: params.email }),
	];

	userPool.signUp(params.userName, params.password, attributeList, null, callback);
}
