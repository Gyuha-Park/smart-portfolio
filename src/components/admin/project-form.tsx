"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createProject, updateProject, type Project } from "@/app/admin/projects/actions"
import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Upload, X, Loader2 } from "lucide-react"

export function ProjectForm({ project }: { project?: Project }) {
    const [error, setError] = useState<string | null>(null)
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(project?.thumbnail_url || "")
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type and size
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        if (!allowedTypes.includes(file.type)) {
            setError("Only JPEG, PNG, WebP, and GIF images are allowed.")
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be less than 5MB.")
            return
        }

        setIsUploading(true)
        setError(null)

        try {
            const supabase = createClient()
            const ext = file.name.split(".").pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
            const filePath = `thumbnails/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from("projects")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                })

            if (uploadError) {
                throw uploadError
            }

            const { data: urlData } = supabase.storage
                .from("projects")
                .getPublicUrl(filePath)

            setThumbnailUrl(urlData.publicUrl)
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Upload failed"
            setError(`Upload failed: ${errorMessage}`)
        } finally {
            setIsUploading(false)
        }
    }

    function removeThumbnail() {
        setThumbnailUrl("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    async function action(formData: FormData) {
        // Override thumbnail_url with the uploaded one
        formData.set("thumbnail_url", thumbnailUrl)

        const res = project
            ? await updateProject(project.id, formData)
            : await createProject(formData)

        if (res?.error) {
            setError(res.error)
        }
    }

    return (
        <form action={action} className="space-y-8 max-w-2xl">
            {error && <div className="text-red-500 text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded-md">{error}</div>}

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

                {/* ── Thumbnail Upload ── */}
                <div className="space-y-2">
                    <Label>Thumbnail Image</Label>
                    <div className="flex flex-col gap-3">
                        {thumbnailUrl && (
                            <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border bg-muted">
                                <img
                                    src={thumbnailUrl}
                                    alt="Thumbnail preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removeThumbnail}
                                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex gap-3 items-center">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isUploading}
                                onClick={() => fileInputRef.current?.click()}
                                className="gap-2"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-4 w-4" />
                                        {thumbnailUrl ? "Change Image" : "Upload Image"}
                                    </>
                                )}
                            </Button>
                            <span className="text-xs text-muted-foreground">JPEG, PNG, WebP, GIF (max 5MB)</span>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        {/* Hidden input for the URL value */}
                        <input type="hidden" name="thumbnail_url" value={thumbnailUrl} />
                    </div>
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
