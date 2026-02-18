import { ProjectForm } from "@/components/admin/project-form"

export const dynamic = "force-dynamic"

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Create New Project</h1>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <ProjectForm />
            </div>
        </div>
    )
}
