'use client';

import { addCollaborator } from '@/entities/list/api/firebase';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
	collaboratorId: string;
	role: 'admin' | 'viewer';
};

type Props = {
	listId: string;
};

export default function CollaboratorForm({ listId }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<Inputs>({
		defaultValues: {
			collaboratorId: '',
			role: 'viewer',
		},
	});

	const [success, setSuccess] = useState<string | null>(null);

	const processForm: SubmitHandler<Inputs> = async data => {
		setSuccess(null);

		try {
			await addCollaborator(listId, data.collaboratorId.trim(), data.role);
			setSuccess('Collaborator added successfully');
			reset();
		} catch (error) {
			setError('collaboratorId', {
				type: 'manual',
				message: (error as Error).message || 'Failed to add collaborator',
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(processForm)}
			className='space-y-2 mx-auto rounded-md shadow-md p-4'
		>
			<div className='flex gap-4 w-full'>
				<Input
					{...register('collaboratorId', { required: 'User ID is required' })}
					placeholder='User ID'
					className='w-1/2'
					disabled={isSubmitting}
				/>
				<select
					{...register('role')}
					className='w-1/2 p-2 border rounded'
					disabled={isSubmitting}
				>
					<option value='viewer'>Viewer</option>
					<option value='admin'>Admin</option>
				</select>
			</div>

			{errors.collaboratorId && (
				<p className='text-destructive text-sm'>
					{errors.collaboratorId.message}
				</p>
			)}

			<Button type='submit' className='w-full' disabled={isSubmitting}>
				{isSubmitting ? 'Adding...' : 'Add Collaborator'}
			</Button>

			{success && <p className='text-green-600 text-sm'>{success}</p>}
		</form>
	);
}
