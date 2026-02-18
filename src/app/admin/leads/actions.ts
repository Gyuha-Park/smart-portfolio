"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type Lead = {
    id: string
    name: string | null
    email: string | null
    message: string | null
    source: string | null
    status: string
    created_at: string
}

export async function getLeads() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching leads:", error)
        return []
    }

    return data as Lead[]
}

export async function updateLeadStatus(id: string, status: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id)

    if (error) {
        console.error("Error updating lead status:", error)
        return { error: "Failed to update lead status" }
    }

    revalidatePath("/admin/leads")
    return { success: true }
}

export async function deleteLead(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from("leads").delete().eq("id", id)

    if (error) {
        console.error("Error deleting lead:", error)
        throw new Error("Failed to delete lead")
    }

    revalidatePath("/admin/leads")
}
