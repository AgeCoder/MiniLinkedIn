import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { MapPin, MessageCircle, User } from "lucide-react"
import Link from "next/link"

interface Profile {
    id: number
    name: string
    email: string
    bio?: string | null
    image?: string | null
    location?: string | null
    website?: string | null
    skills?: string[]
}

export default function ProfileCard({ profile }: { profile: Profile }) {
    return (
        <Card>
            <CardHeader className="relative">
                {/* Cover image placeholder */}
                <div className="h-32 w-full rounded-t-lg bg-gradient-to-r from-blue-500 to-purple-600" />

                {/* Profile picture */}
                <div className="absolute -bottom-12 left-6 h-24 w-24 rounded-full border-4 border-background bg-muted">
                    {profile?.image ? (
                        <img
                            src={profile.image}
                            alt={profile.name}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        <User className="h-12 w-12 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-16">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{profile?.name}</CardTitle>
                        <CardDescription className="mt-1">{profile?.email}</CardDescription>

                        {profile?.location && (
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                {profile?.location}
                            </div>
                        )}
                    </div>

                </div>


                {profile?.bio && (
                    <p className="mt-4 text-sm text-pretty">{profile?.bio}</p>
                )}

                {profile?.website && (
                    <div className="mt-3">
                        <Link
                            href={profile?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center"
                        >
                            <link className="h-4 w-4 mr-1" />
                            {profile.website.replace(/^https?:\/\//, '')}
                        </Link>
                    </div>
                )}

                {profile?.skills && profile.skills.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-sm font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {profile?.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}