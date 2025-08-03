import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'


export default function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold mb-4">General</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
                            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                            <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
                            <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
                            <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookies</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-2">
                        <h3 className="text-sm font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} MiniLinkedIn. All rights reserved.
                </div>
            </div>
        </footer>
    )
}