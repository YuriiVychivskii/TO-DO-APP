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
    <div className="flex items-center justify-between rounded-md border p-4 shadow">
      <div className="flex-1">
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="text-lg font-semibold"
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-lg font-semibold hover:underline"
          >
            {`${title.slice(0, 15)}${title.length > 15 ? '...' : ''}`}
          </h3>
        )}
      </div>

      <div className="ml-4 flex items-center gap-2">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)} className="px-3">
              Edit
            </Button>
            <Button onClick={onDelete} className="px-3">
              Delete
            </Button>
            <Button type="button" onClick={() => router.push(`lists/${id}`)}>
              <MdOutlineTransitEnterexit className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
