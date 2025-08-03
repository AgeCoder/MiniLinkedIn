'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/app/actions/post'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Image, Link, Loader } from 'lucide-react'

export default function PostForm() {
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (formData: FormData) => {
        try {
            setIsLoading(true)
            await createPost(formData)
            setContent('')
            formRef.current?.reset()
            router.refresh()
            toast({
                title: 'Success',
                description: 'Your post has been published',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create post',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-4">
            <div className="flex items-start gap-4 p-5">


                <Textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="min-h-[100px] resize-none border-none shadow-none focus-visible:ring-0"
                    maxLength={280}
                    required
                />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                        <Image className="h-4 w-4" />
                        <span className="sr-only">Add image</span>
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                        <Link className="h-4 w-4" />
                        <span className="sr-only">Add link</span>
                    </Button>
                </div>
                <Button type="submit" disabled={isLoading || !content.trim()}>
                    {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Post
                </Button>
            </div>
        </form>
    )
}