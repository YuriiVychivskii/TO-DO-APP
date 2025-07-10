'use client';

import { useAppDispatch } from '@/shared/lib/store';
import { useState } from 'react';
import { deleteList, updateList } from '../api/firebase';
import { deleteStoreList, updateStoreList } from '../model/listSlice';
import { ListItem } from '../model/types';
import ListCard from './listCard';

type Props = {
	items: ListItem[];
};

export default function ListItems({ items }: Props) {
	const [loadingId, setLoadingId] = useState<string | null>(null);
	const dispatch = useAppDispatch();

	const handleDelete = async (id: string) => {
		setLoadingId(id);
		try {
			await deleteList(id);
			dispatch(deleteStoreList(id));
		} finally {
			setLoadingId(null);
		}
	};

	const handleEdit = async (id: string, newTitle: string) => {
		setLoadingId(id);
		try {
			await updateList(id, { title: newTitle });
			dispatch(updateStoreList({ id, title: newTitle }));
		} finally {
			setLoadingId(null);
		}
	};

	if (!items.length) {
		return (
			<p className='p-10 text-muted-foreground text-center'>No lists found.</p>
		);
	}

	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{items.map(list => (
				<ListCard
					key={list.id}
					id={list.id}
					title={list.title}
					isLoading={loadingId === list.id}
					onEdit={title => handleEdit(list.id, title)}
					onDelete={() => handleDelete(list.id)}
				/>
			))}
		</div>
	);
}
