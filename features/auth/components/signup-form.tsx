'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import { TriangleAlertIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { SignUpFormSchema, SignUpForm } from '../schema';

export const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resetOptions: {
      keepErrors: true,
    },
  });

  const signup = async (data: SignUpForm) => {
    const { name, email, password } = data;
    await authClient.signUp.email(
      { name, email, password, callbackURL: '/' },
      {
        onSuccess: () => router.push('/'),
        onError: (ctx) => setError(ctx.error.message),
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(signup)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="m@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-sm text-medium-grey">
                Must be at least 8 characters long.
              </p>

              {!!error && (
                <Alert variant="destructive">
                  <TriangleAlertIcon />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              <div className="flex flex-col gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Create Account
                </Button>
                <p className="text-center text-sm">
                  Already have an account? <Link href="/signin">Sign in</Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <p className="px-6 text-center text-sm text-medium-grey">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
};
