import MyForm from '@/components/MyForm';

export default function Home() {
	return (
		<div className="grid grid-cols-[min(95%,_1080px)] grid-rows-[auto_1fr] min-h-[100svh] justify-center">
			<header>
				<h1 className="text-4xl font-bold text-center underline py-2">Next JS Edge Runtime and Web Crypto API</h1>
			</header>
			<main className="w-full">
				<MyForm />
			</main>
		</div>
	);
}
