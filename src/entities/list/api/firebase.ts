import { db } from '@/shared/lib/firebase';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	query,
	QueryDocumentSnapshot,
	Timestamp,
	updateDoc,
	where,
} from 'firebase/firestore';

import { CreateListDTO, ListItem, ListItemFromDB } from '../model/types';

function mapDocToListItem(doc: QueryDocumentSnapshot<DocumentData>): ListItem {
	const data = doc.data() as ListItemFromDB;

	return {
		id: doc.id,
		...data,
		createdAt:
			typeof data.createdAt === 'string'
				? data.createdAt
				: data.createdAt.toDate().toISOString(),
	};
}

export async function createList({
	userId,
	title,
}: CreateListDTO): Promise<ListItem> {
	if (!userId) throw new Error('User ID is required');
	if (!title?.trim()) throw new Error('Title is required');

	try {
		const docRef = await addDoc(collection(db, 'lists'), {
			title: title.trim(),
			ownerId: userId,
			createdAt: Timestamp.now(),
			collaborators: {
				[userId]: 'admin',
			},
		});

		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) throw new Error('Failed to fetch created list');

		return mapDocToListItem(docSnap);
	} catch (error) {
		console.error('Error creating list:', error);
		throw new Error('Failed to create list');
	}
}

export async function findListsForUser(userId: string): Promise<ListItem[]> {
	if (!userId) throw new Error('User ID is required');

	try {
		const listsRef = collection(db, 'lists');

		const [ownerSnap, collabSnap] = await Promise.all([
			getDocs(query(listsRef, where('ownerId', '==', userId))),
			getDocs(
				query(
					listsRef,
					where(`collaborators.${userId}`, 'in', ['admin', 'viewer'])
				)
			),
		]);

		const listsMap = new Map<string, ListItem>();

		ownerSnap.forEach(doc => {
			listsMap.set(doc.id, mapDocToListItem(doc));
		});

		collabSnap.forEach(doc => {
			listsMap.set(doc.id, mapDocToListItem(doc));
		});

		return Array.from(listsMap.values());
	} catch (error) {
		console.error('Error fetching lists:', error);
		throw new Error('Failed to load lists');
	}
}

export async function addCollaborator(
	listId: string,
	userId: string,
	role: 'admin' | 'viewer'
) {
	if (!listId || !userId) throw new Error('List ID and User ID are required');

	try {
		const listRef = doc(db, 'lists', listId);

		await updateDoc(listRef, {
			[`collaborators.${userId}`]: role,
		});
	} catch (error) {
		console.error('Error adding collaborator:', error);
		throw new Error('Failed to add collaborator');
	}
}

export async function updateList(
	listId: string,
	data: Partial<Pick<ListItem, 'title'>>
) {
	if (!listId) throw new Error('List ID is required');
	if (!data.title?.trim()) throw new Error('Title is required');

	try {
		const listRef = doc(db, 'lists', listId);

		await updateDoc(listRef, {
			title: data.title.trim(),
		});
	} catch (error) {
		console.error('Error updating list:', error);
		throw new Error('Failed to update list');
	}
}

export async function deleteList(listId: string) {
	if (!listId) throw new Error('List ID is required');

	try {
		const listRef = doc(db, 'lists', listId);
		await deleteDoc(listRef);
	} catch (error) {
		console.error('Error deleting list:', error);
		throw new Error('Failed to delete list');
	}
}
