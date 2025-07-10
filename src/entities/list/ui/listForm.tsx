'use client';

import { ListFormSchema } from '@/features/list/model/schema';
import { auth } from '@/shared/lib/firebase';
import { useAppDispatch } from '@/shared/lib/store';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { createList } from '../api/firebase';
import { addStoreList } from '../model/listSlice';

export type Inputs = z.infer<typeof ListFormSchema>;

export default function ListForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ListFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const processForm: SubmitHandler<Inputs> = async ({ title }) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      setError('root', {
        type: 'manual',
        message: 'User not logged in',
      });
      return;
    }

    try {
      const listItem = await createList({ userId, title });
      dispatch(addStoreList(listItem));
      reset();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: (error as Error).message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-2">
      <div className="mx-auto flex w-full gap-4 rounded-md shadow-md">
        <Input
          {...register('title')}
          placeholder="List title"
          className="w-1/2"
        />
        <Button disabled={isSubmitting} type="submit" className="w-1/2">
          Add List
        </Button>
      </div>

      {errors.title && (
        <p className="text-destructive text-sm">{errors.title.message}</p>
      )}
      {errors.root?.message && (
        <p className="text-destructive text-sm">{errors.root.message}</p>
      )}
    </form>
  );
}
