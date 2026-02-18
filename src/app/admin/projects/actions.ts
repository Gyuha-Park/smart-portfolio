"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type Project = {
    id: string
    title: string
    slug: string
    short_description: string | null
    full_description: string | null
    tech_stack: string[] | null
    thumbnail_url: string | null
    project_url: string | null
    github_url: string | null
    start_date: string | null
    end_date: string | null
    is_featured: boolean
    created_at: string
}

export async function getProjects() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching projects:", error)
        return []
    }

    return data as Project[]
}

export async function getProject(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.error("Error fetching project:", error)
        return null
    }

    return data as Project
}

export async function deleteProject(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
        console.error("Error deleting project:", error)
        throw new Error("Failed to delete project")
    }

    revalidatePath("/admin/projects")
}

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const short_description = formData.get("short_description") as string

    // Basic validation
    if (!title || !slug) {
        return { error: "Title and Slug are required" }
    }

    const projectData = {
        title,
        slug,
        short_description,
        full_description: formData.get("full_description") as string,
        tech_stack: (formData.get("tech_stack") as string)?.split(",").map(t => t.trim()).filter(Boolean) || [],
        thumbnail_url: formData.get("thumbnail_url") as string,
        project_url: formData.get("project_url") as string,
        github_url: formData.get("github_url") as string,
        start_date: formData.get("start_date") as string || null,
        end_date: formData.get("end_date") as string || null,
        is_featured: formData.get("is_featured") === "on",
    }

    const { error } = await supabase.from("projects").insert(projectData)

    if (error) {
        console.error("Error creating project:", error)
        return { error: "Failed to create project: " + error.message }
    }

    revalidatePath("/admin/projects")
    redirect("/admin/projects")
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string

    if (!title || !slug) {
        return { error: "Title and Slug are required" }
    }

    const projectData = {
        title,
        slug,
        short_description: formData.get("short_description") as string,
        full_description: formData.get("full_description") as string,
        tech_stack: (formData.get("tech_stack") as string)?.split(",").map(t => t.trim()).filter(Boolean) || [],
        thumbnail_url: formData.get("thumbnail_url") as string,
        project_url: formData.get("project_url") as string,
        github_url: formData.get("github_url") as string,
        start_date: formData.get("start_date") as string || null,
        end_date: formData.get("end_date") as string || null,
        is_featured: formData.get("is_featured") === "on",
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("projects").update(projectData).eq("id", id)

    if (error) {
        console.error("Error updating project:", error)
        return { error: "Failed to update project: " + error.message }
    }

    revalidatePath("/admin/projects")
    revalidatePath(`/project/${id}`)
    redirect("/admin/projects")
}
