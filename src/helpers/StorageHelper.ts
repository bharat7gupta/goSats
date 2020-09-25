import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async (key: string): Promise<string | null> => {
	try {
		const value = await AsyncStorage.getItem(key);
		return value;
	} catch(e) {
		return null;
	}
};

export const setItem = async (key: string, value: string): Promise<void> => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch(e) {
	}
};

export const removeItem = async (key: string, value: string): Promise<void> => {
	try {
		await AsyncStorage.removeItem(key);
	} catch(e) {
	}
};
