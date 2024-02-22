import { expect, describe, it, vi } from 'vitest';
import { compare, hashPassword } from '../lib/crypto';

vi.stubEnv('SECRET_KEY', 'MySecretKeyStoredInEnv');

describe('function cipherText', async () => {
	const pw = 'This is my password';
	const hash = await hashPassword(pw);

	it('should not return the same string.', () => {
		expect(pw).toEqual(expect.not.stringContaining(hash));
	});
});

describe('function compare', async () => {
	const password1 = 'This is another password';
	const password2 = 'This is the wrong password from aggressor.';
	const hash = await hashPassword(password1);

	it('should return false if password is not the same', async () => {
		const result = await compare(password2, hash);
		expect(result).toBe(false);
	});

	it('should return true if password is the same', async () => {
		expect(await compare('This is another password', hash)).toBe(true);
	});
});
