import { Timestamp } from 'firebase/firestore';

export type Role = 'admin' | 'viewer';

export type Collaborators = {
	[userId: string]: Role;
};

export type ListItemFromDB = {
	title: string;
	ownerId: string;
	createdAt: Timestamp;
	collaborators: Collaborators;
};

export type ListItem = {
	id: string;
	title: string;
	ownerId: string;
	createdAt: string;
	collaborators: Collaborators;
};

export type CreateListDTO = {
	title: string;
	userId: string;
};
