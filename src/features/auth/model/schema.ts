import { z } from 'zod';

export const LogInSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email({ message: 'Enter a valid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long' }),
});

export const SignUpSchema = z
	.object({
		name: z
			.string()
			.min(1, { message: 'Name is required' })
			.max(15, { message: 'Name must be at most 15 characters long' }),
		email: z
			.string()
			.min(1, { message: 'Email is required' })
			.email({ message: 'Enter a valid email address' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' }),
		confirmPassword: z
			.string()
			.min(1, { message: 'Please confirm your password' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords do not match',
	});
