import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import Loader from '@/shared/ui/loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineTransitEnterexit } from 'react-icons/md';

type Props = {
	title: string;
	id: string;
	isLoading: boolean;
	onDelete: () => void;
	onEdit: (newTitle: string) => void;
};

export default function ListCard({
	title,
	id,
	isLoading,
	onDelete,
	onEdit,
}: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title);
	const router = useRouter();

	useEffect(() => {
		setNewTitle(title);
	}, [title]);

	const handleSave = () => {
		if (newTitle.trim() && newTitle !== title) {
			onEdit(newTitle.trim());
		}
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSave();
		if (e.key === 'Escape') {
			setNewTitle(title);
			setIsEditing(false);
		}
	};

	return (
		<div className='border rounded-md shadow p-4 flex justify-between items-center'>
			<div className='flex-1'>
				{isEditing ? (
					<Input
						value={newTitle}
						onChange={e => setNewTitle(e.target.value)}
						onBlur={handleSave}
						onKeyDown={handleKeyDown}
						autoFocus
						className='text-lg font-semibold'
					/>
				) : (
					<h3
						onClick={() => setIsEditing(true)}
						className='text-lg font-semibold cursor-pointer hover:underline'
					>
						{`${title.slice(0, 15)}${title.length > 15 ? '...' : ''}`}
					</h3>
				)}
			</div>

			<div className='flex gap-2 ml-4 items-center'>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<Button onClick={() => setIsEditing(true)} className='px-3'>
							Edit
						</Button>
						<Button onClick={onDelete} className='px-3'>
							Delete
						</Button>
						<Button type='button' onClick={() => router.push(`lists/${id}`)}>
							<MdOutlineTransitEnterexit className='w-4 h-4' />
						</Button>
					</>
				)}
			</div>
		</div>
	);
}
