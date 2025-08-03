import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getPosts } from "@/app/actions/post"
import { Heart, MessageCircle, Share, User } from "lucide-react"

type Post = Awaited<ReturnType<typeof getPosts>>[0]

export default function PostCard({ post }: { post: Post }) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                        <Link
                            href={`/profile/${post.authorId}`}
                            className="font-semibold hover:underline"
                        >
                            {post.authorName}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <Link href={`/posts/${post.id}`}>
                    <div className="space-y-4">
                        <p className="whitespace-pre-line text-pretty">{post.content}</p>

                        {/* Post engagement metrics */}
                        <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                            <span>42 likes</span>
                            <span>8 comments</span>
                        </div>
                    </div>
                </Link>

                {/* Action buttons */}
                <div className="flex items-center gap-4 pt-2 border-t">
                    <Button variant="ghost" size="sm" className="gap-1.5">
                        <Heart className="h-4 w-4" />
                        <span>Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                        <MessageCircle className="h-4 w-4" />
                        <span>Comment</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                        <Share className="h-4 w-4" />
                        <span>Share</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}