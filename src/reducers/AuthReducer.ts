export interface AuthState {
	username: string;
	password: string;
	userDisplayName: string;
	hasVerifiedAccount: boolean;
	isLoggedIn: boolean;
	accessToken: string;
}

export const AuthActions = {
	SET_CREDENTIALS: 'SET_CREDENTIALS',
	SET_ACCOUNT_VERIFIED: 'SET_ACCOUNT_VERIFIED',
	UPDATE_LOGIN_STATUS: 'UPDATE_LOGIN_STATUS',
};

export const authInitialState: AuthState = {
	username: null,
	password: null,
	userDisplayName: null,
	hasVerifiedAccount: false,
	isLoggedIn: false,
	accessToken: null,
};

export default function authReducer(state, action): AuthState {
	switch (action.type) {
		case AuthActions.SET_CREDENTIALS: {
			return {
				...state,
				userDisplayName: action.userDisplayName,
				username: action.username,
				password: action.password,
			};
		}

		case AuthActions.SET_ACCOUNT_VERIFIED: {
			return {
				...state,
				hasVerifiedAccount: true,
			};
		}

		case AuthActions.UPDATE_LOGIN_STATUS: {
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		}
	}
}
