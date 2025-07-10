'use client';

import { logoutUser } from '@/features/auth/model/actions';
import { auth } from '@/shared/lib/firebase';
import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
	const [userId, setUserId] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUserId(user ? user.uid : null);
		});
		return () => unsubscribe();
	}, []);

	const handleCopyId = async () => {
		if (!userId) return;
		try {
			await navigator.clipboard.writeText(userId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {}
	};

	return (
		<header className='flex justify-between items-center p-4 border rounded-lg'>
			<h1 className='text-xl font-bold'>My App</h1>

			<div className='flex gap-4'>
				{!userId ? (
					<Button onClick={() => router.push('/log-in')}>Get Started</Button>
				) : (
					<>
						<Button onClick={() => logoutUser()}>Logout</Button>
						<Button onClick={handleCopyId}>
							{copied ? 'Copied!' : 'Copy User ID'}
						</Button>
					</>
				)}
			</div>
		</header>
	);
}
