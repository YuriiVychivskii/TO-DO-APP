'use client';
import { LogInSchema } from '@/features/auth/model/schema';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import z from 'zod';

type Inputs = z.infer<typeof LogInSchema>;

export default function LogInForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		resolver: zodResolver(LogInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const [showPassword, setShowPassword] = useState(false);

	const processForm: SubmitHandler<Inputs> = async data => {
		// Auth logic
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(processForm)}
				className='flex w-full flex-col gap-4'
			>
				<div>
					<Input
						type='email'
						placeholder='Email'
						disabled={isSubmitting}
						className='h-12'
						{...register('email')}
					/>

					{errors.email && (
						<p className='mt-2 text-sm text-red-400'>{errors.email.message}</p>
					)}
				</div>

				<div className='relative'>
					<Input
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
						disabled={isSubmitting}
						className='h-12'
						{...register('password')}
					/>

					<button
						onClick={() =>
							setShowPassword(prev => (prev === false ? true : false))
						}
						className='absolute top-2.5 right-4 cursor-pointer'
					>
						{showPassword ? (
							<PiEye className='h-6 w-6' />
						) : (
							<PiEyeClosed className='h-6 w-6' />
						)}
					</button>

					{errors.password && (
						<p className='mt-2 text-sm text-red-400'>
							{errors.password.message}
						</p>
					)}
				</div>

				<Button
					type='submit'
					disabled={isSubmitting}
					className='w-full text-lg disabled:opacity-50'
				>
					Sign in
				</Button>
			</form>

			<div className='mt-4 flex items-center justify-center gap-1.5 text-sm font-light'>
				<p>Don`t have an account? </p>
				<p className='font-medium text-blue-400'>
					<Link href='/sign-up'>Sign up</Link>
				</p>
			</div>

			<Link href='/' className='mt-5 flex items-center justify-center gap-2'>
				<FaArrowLeft className='h-4 w-4' />
				<p>Back home</p>
			</Link>
		</>
	);
}
