import Link from 'next/link';
import Image from 'next/image';

import { SignupForm } from '@/features/auth/components/signup-form';

export default function SignupPage() {
  return (
    <div className="bg-light-grey flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex self-center">
          <Image src="/logo-dark.svg" alt="Kanban" width={120} height={20} />
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
