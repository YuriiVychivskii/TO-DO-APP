'use client';

import { findListsForUser } from '@/entities/list/api/firebase';
import { setStoreLists } from '@/entities/list/model/listSlice';
import ListForm from '@/entities/list/ui/listForm';
import ListItems from '@/entities/list/ui/listItems';
import { auth } from '@/shared/lib/firebase';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import Loader from '@/shared/ui/loader';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function ListsPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.list.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await findListsForUser(user.uid);
        dispatch(setStoreLists(res));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div>
      <section className="mt-5">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Create a New List
        </h2>
        <ListForm />
      </section>

      <section className="mt-5">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Your TODO Lists
        </h2>
        <ListItems items={items} />
      </section>
    </div>
  );
}
