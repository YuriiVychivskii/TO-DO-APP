import SignUpForm from '@/widgets/auth/signUpForm';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-500 px-6 py-20">
      <h1 className="mb-5 text-center text-3xl font-bold">Sign Up</h1>

      <SignUpForm />
    </div>
  );
}
