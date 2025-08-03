import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { auth } from "@/lib/auth/config"
import { getPosts } from "./actions/post"
import PostForm from "@/components/PostForm"
import PostCard from "@/components/PostCard"
import { Linkedin, User, Users, Zap } from "lucide-react"

export default async function HomePage() {
  const session = await auth()
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-background">
      {session ? (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt="Profile"
                          className="absolute inset-0 h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">{session.user?.name || "Anonymous"}</h3>
                      <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-6">
              <Card className="mb-6">
                <PostForm />
              </Card>
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>No posts yet</CardTitle>
                      <CardDescription>
                        Be the first to share something with your network!
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </main>

            {/* Right Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <Card className="sticky top-24 space-y-6 p-6">
                <div>
                  <h3 className="font-medium mb-4">News & Updates</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">New features coming soon!</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Connect with 5 new people today</p>
                        <p className="text-xs text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Who to follow</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted" />
                          <div>
                            <p className="text-sm font-medium">Jane Smith</p>
                            <p className="text-xs text-muted-foreground">Product Designer</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      ) : (
        // Unauthenticated — Centered Welcome Card
        <div className="flex items-center justify-center min-h-screen px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <Linkedin className="mx-auto h-12 w-12 text-blue-600" />
              <CardTitle>Welcome to MiniLinkedIn</CardTitle>
              <CardDescription>
                Connect with professionals and grow your network
              </CardDescription>
            </CardHeader>
            <div className="p-6 pt-0 space-y-4">
              <Button asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
