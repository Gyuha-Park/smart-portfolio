"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type Skill = {
    id: string
    name: string
    category: string | null
    proficiency: number | null
    display_order: number
}

export async function getSkills() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true })

    if (error) {
        console.error("Error fetching skills:", error)
        return []
    }

    return data as Skill[]
}

export async function getSkill(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.error("Error fetching skill:", error)
        return null
    }

    return data as Skill
}

export async function deleteSkill(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("skills").delete().eq("id", id)

    if (error) {
        console.error("Error deleting skill:", error)
        throw new Error("Failed to delete skill")
    }

    revalidatePath("/admin/skills")
}

export async function createSkill(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get("name") as string

    if (!name) {
        return { error: "Name is required" }
    }

    const skillData = {
        name,
        category: formData.get("category") as string,
        proficiency: parseInt(formData.get("proficiency") as string) || 0,
        display_order: parseInt(formData.get("display_order") as string) || 0,
    }

    const { error } = await supabase.from("skills").insert(skillData)

    if (error) {
        console.error("Error creating skill:", error)
        return { error: "Failed to create skill: " + error.message }
    }

    revalidatePath("/admin/skills")
    redirect("/admin/skills")
}

export async function updateSkill(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get("name") as string

    if (!name) {
        return { error: "Name is required" }
    }

    const skillData = {
        name,
        category: formData.get("category") as string,
        proficiency: parseInt(formData.get("proficiency") as string) || 0,
        display_order: parseInt(formData.get("display_order") as string) || 0,
    }

    const { error } = await supabase.from("skills").update(skillData).eq("id", id)

    if (error) {
        console.error("Error updating skill:", error)
        return { error: "Failed to update skill: " + error.message }
    }

    revalidatePath("/admin/skills")
    redirect("/admin/skills")
}
