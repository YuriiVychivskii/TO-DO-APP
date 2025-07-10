import LogInForm from '@/widgets/auth/logInForm';

export default function LoginPage() {
	return (
		<div className='w-full max-w-md rounded-lg px-6 py-20 border border-gray-500'>
			<h1 className='text-center text-3xl font-bold mb-5'>Log In</h1>

			<LogInForm />
		</div>
	);
}
