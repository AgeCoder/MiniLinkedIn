import { getUserPosts } from "@/app/actions/post"
import { getUserProfile } from "@/app/actions/profile"
import PostCard from "@/components/PostCard"
import ProfileCard from "@/components/ProfileCard"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, Filter, GraduationCap } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ProfilePage({ params }: { params: { id: string } }) {
    const userId = parseInt(params.id)

    const [profile, posts] = await Promise.all([
        getUserProfile(userId),
        getUserPosts(userId)
    ])

    if (!profile) {
        return notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left sidebar - Profile info */}
                <div className="lg:col-span-4">
                    <ProfileCard profile={profile} />

                    {/* Additional profile sections */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                <span>Experience</span>
                            </CardTitle>
                        </CardHeader>
                        <div className="p-6 pt-0 space-y-4">
                            {profileD?.experience?.length > 0 ? (
                                profileD?.experience.map((exp, i) => (
                                    <div key={i} className="space-y-1">
                                        <h4 className="font-medium">{exp.position}</h4>
                                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {exp.startDate} - {exp.endDate || 'Present'}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No experience added</p>
                            )}
                        </div>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                <span>Education</span>
                            </CardTitle>
                        </CardHeader>
                        <div className="p-6 pt-0 space-y-4">
                            {profileD?.education?.length > 0 ? (
                                profileD.education.map((edu, i) => (
                                    <div key={i} className="space-y-1">
                                        <h4 className="font-medium">{edu.institution}</h4>
                                        <p className="text-sm text-muted-foreground">{edu.degree}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {edu.startYear} - {edu.endYear || 'Present'}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No education added</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Main content - Posts */}
                <div className="lg:col-span-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Activity</span>
                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <div className="mt-6 space-y-6">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))
                        ) : (
                            <Card className="text-center py-12">
                                <div className="mx-auto max-w-md space-y-4">
                                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                                    <h3 className="text-lg font-medium">No posts yet</h3>
                                    <p className="text-sm text-muted-foreground">
                                        When {profile.name} shares posts, they'll appear here.
                                    </p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const profileD = {
    experience: [
        {
            position: "Software Engineer",
            company: "Google",
            startDate: "Jan 2022",
            endDate: "Dec 2023"
        },
        {
            position: "Frontend Intern",
            company: "Microsoft",
            startDate: "Jun 2021",
            endDate: "Dec 2021"
        }
    ],
    education: [
        {
            institution: "IIT Bombay",
            degree: "B.Tech in Computer Science",
            startYear: "2018",
            endYear: "2022"
        },
        {
            institution: "ABC Junior College",
            degree: "HSC",
            startYear: "2016",
            endYear: "2018"
        }
    ]
};
