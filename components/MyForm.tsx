'use client';

import { compareAction, decryptAction, encryptAction, hashAction } from '@/lib/action';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import CopyClipboardButton from './CopyClipboardButton';

const initialState = {
	data: '',
	errorMsg: '',
};
const MyForm = () => {
	const encryptedText = useRef<HTMLParagraphElement | null>(null);
	const hashedKeyValue = useRef<HTMLParagraphElement | null>(null);
	const [stateEncrypt, formActionEncrypt] = useFormState(encryptAction, initialState);
	const [stateDecrypt, formActionDecrypt] = useFormState(decryptAction, initialState);
	const [stateHash, formActionHash] = useFormState(hashAction, initialState);
	const [stateCompare, formActionCompare] = useFormState(compareAction, initialState);

	async function onChangeHandlerEncrypt(event: React.FormEvent<HTMLFormElement>) {
		const formData = new FormData(event.currentTarget);
		formActionEncrypt(formData);
	}

	async function onChangeHandlerDecrypt(event: React.FormEvent<HTMLFormElement>) {
		const formData = new FormData(event.currentTarget);
		formActionDecrypt(formData);
	}

	async function onChangeHandlerHash(event: React.FormEvent<HTMLFormElement>) {
		const formData = new FormData(event.currentTarget);
		formActionHash(formData);
	}

	async function onChangeHandlerCompare(event: React.FormEvent<HTMLFormElement>) {
		const formData = new FormData(event.currentTarget);
		const hashedKey = formData.get('hashed_key') || '';
		const compare = formData.get('hashed_key') || '';

		if ((hashedKey as string).length > 0 && (compare as string).length > 0) {
			formActionCompare(formData);
		}
	}

	return (
		<>
			<h2 className="text-xl py-3 tracking-wide font-semibold">Encrypt and decrypt text</h2>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(370px,_1fr))] auto-rows-[1fr_auto] gap-x-6 gap-y-1">
				<form
					action={formActionEncrypt}
					onChange={onChangeHandlerEncrypt}
					className="grid row-span-2 grid-rows-subgrid"
				>
					<textarea
						id="encrypt"
						name="encrypt"
						rows={5}
						spellCheck="false"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					></textarea>
					<label htmlFor="encrypt" className="font-semibold min-h-9">
						Type in Text to Encrypt
					</label>
				</form>
				<div className="grid row-span-2 grid-rows-subgrid">
					<p
						ref={encryptedText}
						id="encrypted"
						className={`p-2.5 flex-1 break-all rounded-lg leading-tight font-mono bg-gray-700 border-gray-600 text-white ${
							stateEncrypt.errorMsg ? 'text-red-500' : ''
						}`}
					>
						{stateEncrypt.data ? stateEncrypt.data : stateEncrypt.errorMsg}
					</p>
					<div className="flex-0 flex justify-center">
						{(stateEncrypt.data || stateEncrypt.errorMsg) && (
							<CopyClipboardButton copyTextFrom={encryptedText.current} />
						)}
					</div>
				</div>
			</div>
			<h2 className="text-xl py-3 tracking-wide font-semibold">Encrypt and decrypt text</h2>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(370px,_1fr))] auto-rows-[1fr_auto] gap-x-6 gap-y-1">
				<form
					action={formActionDecrypt}
					onChange={onChangeHandlerDecrypt}
					className="grid row-span-2 grid-rows-subgrid"
				>
					<textarea
						id="decrypt"
						name="decrypt"
						spellCheck="false"
						rows={5}
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					></textarea>
					<label htmlFor="decrypt" className="font-semibold min-h-9">
						Paste encoded text for decoding
					</label>
				</form>
				<div className="grid row-span-2 grid-rows-subgrid">
					<p
						className={`p-2.5 flex-1 break-all rounded-lg leading-tight font-mono text-white border-gray-600 ${
							stateDecrypt.errorMsg ? 'text-center text-lg bg-red-700/80' : ''
						} ${!stateDecrypt.errorMsg && stateDecrypt.data.length > 0 ? 'bg-green-700/80' : 'bg-gray-700'}`}
					>
						{stateDecrypt.data ? stateDecrypt.data : stateDecrypt.errorMsg}
					</p>
				</div>
			</div>
			<div role="separator" className="border-b-2 border-slate-300/40 dark:border-slate-700/40 my-10" />
			<h2 className="text-xl tracking-wide font-semibold">Hashing</h2>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(380px,_1fr))] auto-rows-[1fr_auto] gap-x-6 gap-y-1">
				<form action={formActionHash} onChange={onChangeHandlerHash} className="grid row-span-2 grid-rows-subgrid">
					<input
						type="text"
						id="plaintext"
						name="plaintext"
						spellCheck="false"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
					<label htmlFor="plaintext" className="font-semibold min-h-9">
						Type in a password key
					</label>
				</form>
				<div className="grid row-span-2 grid-rows-subgrid">
					<p
						ref={hashedKeyValue}
						className="p-2.5 flex-1 break-all rounded-lg leading-tight font-mono bg-gray-700 border-gray-600 text-white"
					>
						{stateHash.data ? (
							<>
								<span>{stateHash.data.slice(0, stateHash.data.length - 24)}</span>
								<span className="text-green-500">{stateHash.data.slice(stateHash.data.length - 24)}</span>
							</>
						) : (
							<span className="text-red-500">{stateHash.errorMsg}</span>
						)}
					</p>
					<div className="flex-0 flex justify-center">
						{(stateHash.data || stateHash.errorMsg) && <CopyClipboardButton copyTextFrom={hashedKeyValue.current} />}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(370px,_1fr))] auto-rows-fr gap-x-6 gap-y-1 mt-6">
				<form action={formActionCompare} onChange={onChangeHandlerCompare} className="">
					<input
						type="text"
						id="hashed_key"
						name="hashed_key"
						spellCheck="false"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
					<label htmlFor="hashed_key" className="font-semibold min-h-9">
						Paste the hashed password (the green text displays the appended salt)
					</label>
					<input
						type="text"
						id="compare"
						name="compare"
						spellCheck="false"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
					<label htmlFor="compare" className="font-semibold">
						Type here your new password and compare it with the password above.
					</label>
				</form>
				<div className="flex flex-col">
					<p
						className={`p-2.5 flex-1 break-all rounded-lg leading-tight font-mono text-white border-gray-600 text-lg ${
							stateCompare.errorMsg ? 'text-center bg-red-700/80' : ''
						} ${!stateCompare.errorMsg && stateCompare.data.length > 0 ? 'bg-green-700/80' : 'bg-gray-700'}`}
					>
						{stateCompare.data ? stateCompare.data : stateCompare.errorMsg}
					</p>
				</div>
			</div>
		</>
	);
};

export default MyForm;
