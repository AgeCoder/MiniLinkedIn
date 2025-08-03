// app/actions/post.ts
'use server';

import { auth } from '@/lib/auth/config';
import { db } from '@/lib/db';
import { posts, users } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');
    const content = formData.get('content') as string;
    if (!content) throw new Error('Invalid content');

    await db.insert(posts).values({
        content,
        userId: parseInt(session.user.id),
    });
    revalidatePath('/');
}

export async function getPosts() {
    return await db
        .select({
            id: posts.id,
            content: posts.content,
            createdAt: posts.createdAt,
            authorName: users.name,
            authorId: users.id,
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .orderBy(desc(posts.createdAt));
}

export async function getUserPosts(userId: number) {
    return await db
        .select({
            id: posts.id,
            content: posts.content,
            createdAt: posts.createdAt,
            authorName: users.name,
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .where(eq(posts.userId, userId))
        .orderBy(desc(posts.createdAt));
}
export async function getPostById(id: string) {
    const post = await db
        .select({
            id: posts.id,
            content: posts.content,
            createdAt: posts.createdAt,
            authorName: users.name,
            authorId: users.id,
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .where(eq(posts.id, Number(id)))
        .limit(1)
        .then((rows) => rows[0]);

    return post || null;
}