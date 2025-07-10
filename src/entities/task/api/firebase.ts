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
	updateDoc,
	where,
} from 'firebase/firestore';
import { TaskItem, UpdateTaskData } from '../model/types';

function mapDocToTaskItem(doc: QueryDocumentSnapshot<DocumentData>): TaskItem {
	const data = doc.data();

	return {
		id: doc.id,
		listId: data.listId,
		title: data.title,
		description: data.description || '',
		completed: data.completed ?? false,
	};
}

export async function createTask({
	listId,
	title,
	description,
}: {
	listId: string;
	title: string;
	description?: string;
}): Promise<TaskItem> {
	if (!listId) throw new Error('List ID is required');
	if (!title?.trim()) throw new Error('Task title is required');

	try {
		const docRef = await addDoc(collection(db, 'tasks'), {
			listId,
			title: title.trim(),
			description: description?.trim() || '',
			completed: false,
		});

		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) throw new Error('Failed to fetch created task');

		return mapDocToTaskItem(docSnap);
	} catch (error) {
		console.error('Error creating task:', error);
		throw new Error('Failed to create task');
	}
}

export async function getTasksByListId(listId: string): Promise<TaskItem[]> {
	if (!listId) throw new Error('List ID is required');

	try {
		const tasksRef = collection(db, 'tasks');
		const q = query(tasksRef, where('listId', '==', listId));
		const snapshot = await getDocs(q);

		return snapshot.docs.map(mapDocToTaskItem);
	} catch (error) {
		console.error('Error fetching tasks:', error);
		throw new Error('Failed to load tasks');
	}
}

export async function updateTask(taskId: string, data: UpdateTaskData) {
	if (!taskId) throw new Error('Task ID is required');
	if (
		data.title !== undefined &&
		(typeof data.title !== 'string' || data.title.trim() === '')
	) {
		throw new Error('Title must be a non-empty string if provided');
	}
	if (data.description !== undefined && typeof data.description !== 'string') {
		throw new Error('Description must be a string if provided');
	}
	if (data.completed !== undefined && typeof data.completed !== 'boolean') {
		throw new Error('Completed must be a boolean if provided');
	}

	try {
		const taskRef = doc(db, 'tasks', taskId);

		const updateData: Partial<Omit<TaskItem, 'id' | 'listId'>> = {};

		if (data.title !== undefined) updateData.title = data.title.trim();
		if (data.description !== undefined)
			updateData.description = data.description.trim();
		if (data.completed !== undefined) updateData.completed = data.completed;

		await updateDoc(taskRef, updateData);
	} catch (error) {
		console.error('Error updating task:', error);
		throw new Error('Failed to update task');
	}
}

export async function deleteTask(taskId: string) {
	if (!taskId) throw new Error('Task ID is required');

	try {
		const taskRef = doc(db, 'tasks', taskId);
		await deleteDoc(taskRef);
	} catch (error) {
		console.error('Error deleting task:', error);
		throw new Error('Failed to delete task');
	}
}
