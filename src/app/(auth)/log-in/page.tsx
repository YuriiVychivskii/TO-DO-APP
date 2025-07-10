import LogInForm from '@/widgets/auth/logInForm';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-500 px-6 py-20">
      <h1 className="mb-5 text-center text-3xl font-bold">Log In</h1>

      <LogInForm />
    </div>
  );
}
