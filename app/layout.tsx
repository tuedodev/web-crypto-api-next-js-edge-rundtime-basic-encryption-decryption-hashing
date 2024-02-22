import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Web Crypto Api NextJs',
	description: 'Using the Web Crypto API inside the Edge Runtime of NextJS',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="font-sans">{children}</body>
		</html>
	);
}
