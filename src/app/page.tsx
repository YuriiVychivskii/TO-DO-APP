'use client';

import { auth } from '@/shared/lib/firebase';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user?.uid ?? null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-24 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">Welcome to TaskFlow</h1>
      <p className="text-muted-foreground mb-6 max-w-md text-lg">
        Organize your work and collaborate with others using smart and simple
        task lists.
      </p>

      {userId ? (
        <div className="flex flex-col items-center gap-4">
          <Link href="/lists">
            <Button>Go to My Lists</Button>
          </Link>
        </div>
      ) : (
        <Link href="/log-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}
