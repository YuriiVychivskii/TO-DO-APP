export type TaskItem = {
	id: string;
	listId: string;
	title: string;
	description?: string;
	completed: boolean;
};

export type UpdateTaskData = Partial<{
	title: string;
	description: string;
	completed: boolean;
}>;
