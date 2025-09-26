'use client';

import Link from 'next/link';
import { BrainIcon } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { LogIn, LogOut, Menu, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { logoutAction } from '@/app/actions';
import type { SessionPayload } from '@/lib/types';

interface HeaderProps {
  session: SessionPayload | null;
}

export function Header({ session }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="hidden md:flex">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <BrainIcon className="h-6 w-6 text-primary" />
            <span className="font-headline">Sınav Sihirbazı</span>
          </Link>
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="sr-only">Ana Menü</SheetTitle>
              </SheetHeader>
               <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
                <BrainIcon className="h-6 w-6 text-primary" />
                <span className="font-headline">Sınav Sihirbazı</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {session?.role === 'admin' && (
                    <Link href="/admin" className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start gap-2")}>
                        <Shield className="h-4 w-4" />
                        Admin Paneli
                    </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="hidden md:flex gap-2">
             {session?.role === 'admin' && (
                <Link href="/admin" className={buttonVariants({ variant: 'ghost' })}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Paneli
                </Link>
             )}
          </nav>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://avatar.iran.liara.run/public/${session?.username === 'admin' ? 'boy' : 'girl'}`} alt={session?.username} />
                    <AvatarFallback>{session?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session?.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <form action={logoutAction} className="w-full">
                    <button type="submit" className="w-full">
                      <DropdownMenuItem className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Çıkış Yap</span>
                      </DropdownMenuItem>
                    </button>
                  </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className={cn(buttonVariants({ variant: 'outline' }), "gap-2")}>
                <LogIn className="h-4 w-4" />
                Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
