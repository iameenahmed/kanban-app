'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { authClient } from '@/lib/auth-client';

const getInitials = (name?: string) => {
  const parts = name?.trim().split(/\s+/);
  if (!parts?.length) return 'U';
  return (
    parts[1] ? `${parts[0][0]}${parts[1][0]}` : parts[0].slice(0, 2)
  ).toUpperCase();
};

export const UserAvatarMenu = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully');
            router.push('/signin');
          },
        },
      });
    } catch {
      toast.error('Failed to sign out');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="user menu" asChild>
        <Avatar className="h-8 w-8 cursor-pointer transition-opacity hover:opacity-90 md:h-12 md:w-12">
          {user?.image && <AvatarImage src={user.image} alt={user?.name} />}
          <AvatarFallback className="text-[0.9375rem]">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="dark:bg-dark-grey border-lines-light dark:border-lines-dark min-w-56 bg-white p-2 shadow-xl"
      >
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              {user?.image && <AvatarImage src={user.image} alt={user?.name} />}
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col space-y-0.5">
              <p className="truncate text-sm font-bold text-black dark:text-white">
                {user?.name}
              </p>
              <p className="text-medium-grey truncate text-xs font-medium">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-lines-light dark:bg-lines-dark" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-red hover:bg-red/10 dark:hover:bg-red/20 focus:text-red cursor-pointer gap-2 px-2 py-2 font-bold transition-colors"
        >
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
