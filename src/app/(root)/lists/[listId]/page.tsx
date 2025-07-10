'use client';

import CollaboratorForm from '@/entities/list/ui/collaboratorForm';
import { useAppSelector } from '@/shared/lib/store';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function List() {
  const params = useParams();
  const listId = params.listId;
  const router = useRouter();

  const lists = useAppSelector((state) => state.list.items);
  const list = lists.find((l) => l.id === listId);

  useEffect(() => {
    if (!list) {
      router.replace('/lists');
    }
  }, [list, router]);

  if (!list) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="mt-5 text-center text-2xl font-bold">{list.title}</h1>
      <CollaboratorForm listId={listId as string} />
    </div>
  );
}
