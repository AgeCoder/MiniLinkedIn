import { notFound } from "next/navigation"
import { getPostById } from "@/app/actions/post"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, Heart, MessageCircle, Share, User } from "lucide-react"

export default async function PostPage({ params }: { params: { id: string } }) {
    const post = await getPostById(params.id)

    if (!post) {
        return notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="mb-6">
                <Button asChild variant="ghost" className="gap-1.5">
                    <Link href="/">
                        <ChevronLeft className="h-4 w-4" />
                        Back to feed
                    </Link>
                </Button>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="p-6 space-y-6">
                    {/* Author info */}
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                            <Link
                                href={`/profile/${post.authorId}`}
                                className="font-semibold hover:underline text-lg"
                            >
                                {post.authorName}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Post content */}
                    <div className="space-y-4">
                        <p className="whitespace-pre-line text-pretty text-lg">{post.content}</p>

                        {/* Engagement metrics */}
                        <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                            <span>42 likes</span>
                            <span>8 comments</span>
                            <span>5 shares</span>
                        </div>
                    </div>

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

                {/* Comments section */}
                <div className="border-t p-6">
                    <h3 className="font-medium mb-4">Comments (8)</h3>

                    <div className="space-y-4">
                        {/* Sample comment */}
                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                                <div className="bg-muted rounded-lg p-3">
                                    <p className="font-medium">Jane Smith</p>
                                    <p className="text-sm">This is a great post! Thanks for sharing.</p>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <span>2 hours ago</span>
                                    <button className="hover:underline">Like</button>
                                    <button className="hover:underline">Reply</button>
                                </div>
                            </div>
                        </div>

                        {/* Comment form */}
                        <div className="flex gap-3 pt-4">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                                <textarea
                                    placeholder="Add a comment..."
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                                    rows={2}
                                />
                                <div className="flex justify-end mt-2">
                                    <Button size="sm">Post</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}