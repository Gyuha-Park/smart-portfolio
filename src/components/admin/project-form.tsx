"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createProject, updateProject, type Project } from "@/app/admin/projects/actions"
import { useState } from "react"

export function ProjectForm({ project }: { project?: Project }) {
    // Use server action directly in form action
    const [error, setError] = useState<string | null>(null)

    async function action(formData: FormData) {
        const res = project
            ? await updateProject(project.id, formData)
            : await createProject(formData)

        if (res?.error) {
            setError(res.error)
        }
    }

    return (
        <form action={action} className="space-y-8 max-w-2xl">
            {error && <div className="text-red-500">{error}</div>}

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input id="title" name="title" placeholder="Smart Portfolio" defaultValue={project?.title} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input id="slug" name="slug" placeholder="smart-portfolio" defaultValue={project?.slug} required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="short_description">Short Description (Summary)</Label>
                    <Textarea id="short_description" name="short_description" placeholder="A brief overview..." defaultValue={project?.short_description || ""} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="full_description">Full Description (Markdown supported)</Label>
                    <Textarea id="full_description" name="full_description" className="min-h-[200px]" placeholder="# Project Details..." defaultValue={project?.full_description || ""} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tech_stack">Tech Stack (Comma separated)</Label>
                    <Input id="tech_stack" name="tech_stack" placeholder="Next.js, Supabase, Tailwind" defaultValue={project?.tech_stack?.join(", ")} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="thumbnail_url">Thumbnail URL (Upload not implemented yet)</Label>
                    <Input id="thumbnail_url" name="thumbnail_url" placeholder="https://example.com/image.jpg" defaultValue={project?.thumbnail_url || ""} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="project_url">Live Demo URL</Label>
                        <Input id="project_url" name="project_url" placeholder="https://..." defaultValue={project?.project_url || ""} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github_url">GitHub URL</Label>
                        <Input id="github_url" name="github_url" placeholder="https://github.com/..." defaultValue={project?.github_url || ""} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input id="start_date" name="start_date" type="date" defaultValue={project?.start_date || ""} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end_date">End Date</Label>
                        <Input id="end_date" name="end_date" type="date" defaultValue={project?.end_date || ""} />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="is_featured" name="is_featured" defaultChecked={project?.is_featured} />
                    <Label htmlFor="is_featured">Feature this project on home page</Label>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit">{project ? "Update Project" : "Create Project"}</Button>
            </div>
        </form>
    )
}
