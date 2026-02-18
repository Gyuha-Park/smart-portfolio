import { ProjectForm } from "@/components/admin/project-form"
import { getProject } from "@/app/admin/projects/actions"

interface PageProps {
    params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EditProjectPage({ params }: PageProps) {
    const { id } = await params
    const project = await getProject(id)

    if (!project) {
        return <div>Project not found</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Edit Project: {project.title}</h1>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <ProjectForm project={project} />
            </div>
        </div>
    )
}
