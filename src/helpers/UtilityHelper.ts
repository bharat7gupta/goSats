export const isEmail = (value: string) => {
	const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
	return emailRegEx.test(value);
};

export const isPhoneNumber = (value: string) => {
	const phoneNumberRegEx = /^[6-9]{1}[0-9]{9}$/;
	return phoneNumberRegEx.test(value);
};
