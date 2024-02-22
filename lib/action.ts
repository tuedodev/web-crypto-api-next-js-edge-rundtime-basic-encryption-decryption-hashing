'use server';

import { cipherText, compare, decipherText, hashPassword } from './crypto';

export async function encryptAction(prevState: any, formData: FormData) {
	const text = formData.get('encrypt') as string;
	const cipher = await cipherText(text);
	if (cipher.success) {
		return {
			data: cipher.data,
			errorMsg: '',
		};
	} else {
		return {
			data: '',
			errorMsg: cipher.errorMsg,
		};
	}
}

export async function decryptAction(prevState: any, formData: FormData) {
	const text = formData.get('decrypt') as string;
	const decipher = await decipherText(text);
	if (decipher.success) {
		return {
			data: decipher.data,
			errorMsg: '',
		};
	} else {
		return {
			data: '',
			errorMsg: decipher.errorMsg,
		};
	}
}

export async function hashAction(prevState: any, formData: FormData) {
	const text = formData.get('plaintext') as string;
	try {
		const hash = await hashPassword(text);
		return {
			data: hash,
			errorMsg: '',
		};
	} catch (err) {
		return {
			data: '',
			errorMsg: err as string,
		};
	}
}

export async function compareAction(prevState: any, formData: FormData) {
	const hashed_key = formData.get('hashed_key') as string;
	const text = formData.get('compare') as string;
	const isValid = await compare(text, hashed_key);
	if (isValid) {
		return {
			data: 'valid',
			errorMsg: '',
		};
	} else {
		return {
			data: '',
			errorMsg: hashed_key.length > 0 && text.length > 0 ? 'Error: Not valid.' : 'One ore more inputs are empty.',
		};
	}
}
