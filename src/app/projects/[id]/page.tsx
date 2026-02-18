import { getProject } from "@/app/admin/projects/actions"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Github, ExternalLink } from "lucide-react"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { id } = await params

    const project = await getProject(id)

    if (!project) {
        notFound()
    }

    return (
        <div className="container py-10 md:py-20 min-h-screen">
            <Button variant="ghost" asChild className="mb-8">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
            </Button>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{project.title}</h1>
                        <p className="text-xl text-muted-foreground">{project.short_description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {project.start_date} ~ {project.end_date || "Present"}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {project.project_url && (
                            <Button asChild size="lg">
                                <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                                </a>
                            </Button>
                        )}
                        {project.github_url && (
                            <Button variant="outline" size="lg" asChild>
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" /> GitHub Repo
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-lg">
                    {project.thumbnail_url ? (
                        <img src={project.thumbnail_url} alt={project.title} className="object-cover w-full h-full" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary text-6xl">
                            🚀
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-16 space-y-8 max-w-3xl mx-auto border-t pt-10">
                <h2 className="text-2xl font-bold">Project Details</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none whitespace-pre-wrap">
                    {project.full_description}
                </div>
            </div>
        </div>
    )
}
