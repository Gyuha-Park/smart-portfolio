"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// ─── Types ───────────────────────────────────────────────

export type Profile = {
    id: string
    name: string
    title: string
    bio: string
    avatar_url: string | null
    resume_url: string | null
    email: string | null
    github_url: string | null
    linkedin_url: string | null
    website_url: string | null
    location: string | null
    updated_at: string
}

export type Career = {
    id: string
    company: string
    role: string
    description: string | null
    start_date: string
    end_date: string | null
    is_current: boolean
    display_order: number
    created_at: string
    updated_at: string
}

// ─── Profile Actions ────────────────────────────────────

export async function getProfile(): Promise<Profile | null> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single()

    if (error) {
        // No profile yet — not necessarily an error
        console.log("No profile found or error:", error.message)
        return null
    }

    return data as Profile
}

export async function upsertProfile(formData: FormData) {
    const supabase = await createClient()

    const profileData = {
        name: formData.get("name") as string,
        title: formData.get("title") as string,
        bio: formData.get("bio") as string,
        avatar_url: (formData.get("avatar_url") as string) || null,
        resume_url: (formData.get("resume_url") as string) || null,
        email: (formData.get("email") as string) || null,
        github_url: (formData.get("github_url") as string) || null,
        linkedin_url: (formData.get("linkedin_url") as string) || null,
        website_url: (formData.get("website_url") as string) || null,
        location: (formData.get("location") as string) || null,
        updated_at: new Date().toISOString(),
    }

    // Check if profile already exists
    const existing = await getProfile()

    if (existing) {
        const { error } = await supabase
            .from("profile")
            .update(profileData)
            .eq("id", existing.id)

        if (error) {
            console.error("Error updating profile:", error)
            return { error: "Failed to update profile: " + error.message }
        }
    } else {
        const { error } = await supabase
            .from("profile")
            .insert(profileData)

        if (error) {
            console.error("Error creating profile:", error)
            return { error: "Failed to create profile: " + error.message }
        }
    }

    revalidatePath("/admin/profile")
    revalidatePath("/")
    return { success: true }
}

// ─── Career Actions ─────────────────────────────────────

export async function getCareers(): Promise<Career[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("display_order", { ascending: true })

    if (error) {
        console.error("Error fetching careers:", error)
        return []
    }

    return data as Career[]
}

export async function getCareer(id: string): Promise<Career | null> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("careers")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.error("Error fetching career:", error)
        return null
    }

    return data as Career
}

export async function createCareer(formData: FormData) {
    const supabase = await createClient()

    const company = formData.get("company") as string
    const role = formData.get("role") as string
    const start_date = formData.get("start_date") as string

    if (!company || !role || !start_date) {
        return { error: "Company, Role, and Start date are required" }
    }

    const careerData = {
        company,
        role,
        description: (formData.get("description") as string) || null,
        start_date,
        end_date: (formData.get("end_date") as string) || null,
        is_current: formData.get("is_current") === "on",
        display_order: parseInt(formData.get("display_order") as string) || 0,
    }

    const { error } = await supabase.from("careers").insert(careerData)

    if (error) {
        console.error("Error creating career:", error)
        return { error: "Failed to create career: " + error.message }
    }

    revalidatePath("/admin/profile")
    revalidatePath("/")
    return { success: true }
}

export async function updateCareer(id: string, formData: FormData) {
    const supabase = await createClient()

    const company = formData.get("company") as string
    const role = formData.get("role") as string
    const start_date = formData.get("start_date") as string

    if (!company || !role || !start_date) {
        return { error: "Company, Role, and Start date are required" }
    }

    const careerData = {
        company,
        role,
        description: (formData.get("description") as string) || null,
        start_date,
        end_date: (formData.get("end_date") as string) || null,
        is_current: formData.get("is_current") === "on",
        display_order: parseInt(formData.get("display_order") as string) || 0,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("careers").update(careerData).eq("id", id)

    if (error) {
        console.error("Error updating career:", error)
        return { error: "Failed to update career: " + error.message }
    }

    revalidatePath("/admin/profile")
    revalidatePath("/")
    return { success: true }
}

export async function deleteCareer(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("careers").delete().eq("id", id)

    if (error) {
        console.error("Error deleting career:", error)
        throw new Error("Failed to delete career")
    }

    revalidatePath("/admin/profile")
    revalidatePath("/")
}
