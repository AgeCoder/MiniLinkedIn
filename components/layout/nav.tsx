import React from 'react'
import Header from './Header'
import { auth } from '@/lib/auth/config';

export default async function Nav() {
    const session = await auth();
    return (
        <div>
            <Header
                user={session?.user ?? null}
            />
        </div>
    )
}
