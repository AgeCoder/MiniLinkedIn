import Link from 'next/link'
import { UserNav } from '../dashboard/user-nav'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { ModeToggle } from '../ui/ModeToggle'

interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
}

interface HeaderProps {
    user?: User | null
}

export default async function Header({ user }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Desktop Logo */}
                <Link href="/" className="hidden items-center space-x-2 md:flex">
                    <span className="text-xl font-bold">MiniLinkedIn</span>
                </Link>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4 pt-6">
                                <Link href="/" className="text-xl font-bold mb-4">MiniLinkedIn</Link>
                                <ModeToggle />
                                {user ? (
                                    <>
                                        <Link
                                            href={`/profile/${user.id}`}
                                            className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md hover:bg-accent"
                                        >
                                            Profile
                                        </Link>
                                        <div className="px-4 py-2">
                                            <UserNav user={user} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md hover:bg-accent"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md hover:bg-accent"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">

                    {user ? (
                        <>
                            <Button asChild variant="ghost">
                                <Link href={`/profile/${user.id}`}>
                                    Profile
                                </Link>
                            </Button>
                            <UserNav user={user} />
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost">
                                <Link href="/login">
                                    Login
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">
                                    Register
                                </Link>
                            </Button>
                        </>
                    )}


                    <ModeToggle />
                </nav>
            </div>
        </header>
    )
}