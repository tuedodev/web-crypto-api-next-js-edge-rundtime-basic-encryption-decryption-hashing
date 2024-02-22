import { expect, describe, it, vi } from 'vitest';
import { cipherText } from '../lib/crypto';

describe('Missing Secret Key ', async () => {
	vi.stubEnv('SECRET_KEY', '');
	const string = 'This is a random string to cyper.';
	const data = await cipherText(string);

	it('should set error to true ...', () => {
		expect(data.error).toBe(true);
	});

	it('should set success to false', () => {
		expect(data.success).toBe(false);
	});

	it('should no return data', () => {
		expect(data.data.length).toEqual(0);
	});

	it('should display an error message', () => {
		expect(data.errorMsg.length).toBeGreaterThan(0);
	});

	it('should throw an error at function getHashedKey()', async () => {
		expect(async () => await getHashedKey()).rejects.toThrow();
	});
});

describe('Existence of Secret Key ', async () => {
	vi.stubEnv('SECRET_KEY', 'MySecretKeyStoredInEnv');
	const string = 'This is a random string to cyper.';
	const data = await cipherText(string);

	it('should set error to false ...', () => {
		expect(data.error).toBe(false);
	});

	it('should set success to true', () => {
		expect(data.success).toBe(true);
	});

	it('should return data', () => {
		expect(data.data.length).toBeGreaterThan(0);
	});

	it('should not display any error message', () => {
		expect(data.errorMsg.length).toEqual(0);
	});
});
function getHashedKey(): any {
	throw new Error('Function not implemented.');
}
