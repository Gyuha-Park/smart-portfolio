import { createClient } from "@/lib/supabase/server"
import { FileText, Code, Users, MessageSquare, Briefcase, TrendingUp } from "lucide-react"

export const dynamic = "force-dynamic"

async function getDashboardStats() {
    const supabase = await createClient()

    const [projectsRes, skillsRes, leadsRes, careersRes, chatSessionsRes] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("skills").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("careers").select("id", { count: "exact", head: true }),
        supabase.from("chat_sessions").select("id", { count: "exact", head: true }),
    ])

    return {
        totalProjects: projectsRes.count ?? 0,
        totalSkills: skillsRes.count ?? 0,
        newLeads: leadsRes.count ?? 0,
        totalCareers: careersRes.count ?? 0,
        totalChatSessions: chatSessionsRes.count ?? 0,
    }
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats()

    const statCards = [
        {
            title: "Total Projects",
            value: stats.totalProjects,
            icon: FileText,
            color: "text-blue-500",
        },
        {
            title: "Total Skills",
            value: stats.totalSkills,
            icon: Code,
            color: "text-green-500",
        },
        {
            title: "Work Experience",
            value: stats.totalCareers,
            icon: Briefcase,
            color: "text-purple-500",
        },
        {
            title: "New Leads",
            value: stats.newLeads,
            icon: Users,
            color: "text-orange-500",
        },
        {
            title: "Chat Sessions",
            value: stats.totalChatSessions,
            icon: MessageSquare,
            color: "text-cyan-500",
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your portfolio admin dashboard. Here&apos;s a quick overview of your content.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {statCards.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{stat.title}</h3>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <div className="text-3xl font-bold">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Quick Actions</h2>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <a
                        href="/admin/profile"
                        className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                        <Briefcase className="h-5 w-5 text-primary" />
                        <span className="font-medium text-sm">Edit Profile</span>
                    </a>
                    <a
                        href="/admin/projects/new"
                        className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium text-sm">New Project</span>
                    </a>
                    <a
                        href="/admin/skills/new"
                        className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                        <Code className="h-5 w-5 text-primary" />
                        <span className="font-medium text-sm">Add Skill</span>
                    </a>
                    <a
                        href="/admin/leads"
                        className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                        <Users className="h-5 w-5 text-primary" />
                        <span className="font-medium text-sm">View Leads</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
