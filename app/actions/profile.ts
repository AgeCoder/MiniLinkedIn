// app/actions/profile.ts
'use server';

import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { users } from '@/lib/db/schema';
import { db } from '@/lib/db';

export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const bio = formData.get('bio') as string;

    if (!name || !email || !password) throw new Error('Missing required fields');
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
        bio,
    });
    revalidatePath('/login');
}

export async function getUserProfile(userId: number) {
    const user = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            bio: users.bio,
            createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
    return user[0];
}