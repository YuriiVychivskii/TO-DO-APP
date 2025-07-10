'use client';
import { registerUser } from '@/features/auth/model/actions';
import { SignUpSchema } from '@/features/auth/model/schema';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import { z } from 'zod';

type Inputs = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password, confirmPassword } = data;
    try {
      await registerUser({
        name,
        email,
        password,
        confirmPassword,
      });

      reset();
      router.push('/lists');
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: (error as Error).message,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex w-full flex-col gap-4"
      >
        <div>
          <Input
            type="text"
            placeholder="Name"
            disabled={isSubmitting}
            className="h-10"
            {...register('name')}
          />

          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            disabled={isSubmitting}
            className="h-10"
            {...register('email')}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            disabled={isSubmitting}
            className="h-10"
            {...register('password')}
          />

          <button
            onClick={() =>
              setShowPassword((prev) => (prev === false ? true : false))
            }
            className="absolute top-2 right-4 cursor-pointer"
          >
            {showPassword ? (
              <PiEye className="h-6 w-6" />
            ) : (
              <PiEyeClosed className="h-6 w-6" />
            )}
          </button>

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            disabled={isSubmitting}
            className="h-10"
            {...register('confirmPassword')}
          />

          <button
            onClick={() =>
              setShowConfirmPassword((prev) => (prev === false ? true : false))
            }
            className="absolute top-2 right-4 cursor-pointer"
          >
            {showConfirmPassword ? (
              <PiEye className="h-6 w-6" />
            ) : (
              <PiEyeClosed className="h-6 w-6" />
            )}
          </button>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-lg disabled:opacity-50"
        >
          Sign-up
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-light">
        <p>Already have an account? </p>
        <div className="font-medium text-blue-400">
          <Link href="/log-in">Log in</Link>
        </div>
      </div>

      <Link href="/" className="mt-5 flex items-center justify-center gap-2">
        <FaArrowLeft className="h-4 w-4" />
        <p>Back home</p>
      </Link>

      {form.formState.errors.root?.message && (
        <p className="text-destructive mt-2 text-sm">
          {form.formState.errors.root.message}
        </p>
      )}
    </>
  );
}
