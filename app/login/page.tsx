'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleSignIn = async () => {
    try {
      await signIn('github', { 
        callbackUrl: '/',
        redirect: true
      });
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            This demo uses GitHub for authentication.
            {error && (
              <p className="text-red-500 mt-2">
                Authentication failed. Please try again.
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSignIn}
          >
            Sign in with GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
