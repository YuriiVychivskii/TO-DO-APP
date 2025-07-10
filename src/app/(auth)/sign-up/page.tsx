import SignUpForm from '@/widgets/auth/signUpForm';

export default function RegisterPage() {
	return (
		<div className='w-full max-w-md rounded-lg px-6 py-20 border border-gray-500'>
			<h1 className='text-center text-3xl font-bold mb-5'>Sign Up</h1>

			<SignUpForm />
		</div>
	);
}
