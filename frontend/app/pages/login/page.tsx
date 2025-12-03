'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/app/global/shadcn/components/ui/button';
import { Input } from '@/app/global/shadcn/components/ui/input';

const CORRECT_CODE = process.env.NEXT_PUBLIC_MONTHBOOK_CODE; // Sæt i .env.local

export default function Login() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === CORRECT_CODE) {
      // Sæt cookie direkte
      document.cookie = `auth=true; path=/; max-age=86400; SameSite=Lax`;
      router.push(from);
      router.refresh();
    } else {
      setError('Forkert kode');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Indtast kode"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              className="w-full"
            />
            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}