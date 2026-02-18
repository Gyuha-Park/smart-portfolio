import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smart-portfolio.vercel.app"
    const supabase = await createClient()

    // Fetch all projects for dynamic pages
    const { data: projects } = await supabase
        .from("projects")
        .select("id, updated_at")
        .order("created_at", { ascending: false })

    const projectEntries: MetadataRoute.Sitemap = (projects || []).map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(project.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        ...projectEntries,
    ]
}
