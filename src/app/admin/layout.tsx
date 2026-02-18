"use client"

export const dynamic = "force-dynamic"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Settings, LogOut, Users, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Projects",
        href: "/admin/projects",
        icon: FileText,
    },
    {
        title: "Skills",
        href: "/admin/skills",
        icon: Settings,
    },
    {
        title: "Chat Logs",
        href: "/admin/chat-logs",
        icon: MessageSquare,
    },
    {
        title: "Leads",
        href: "/admin/leads",
        icon: Users,
    },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push("/admin/login")
        router.refresh()
    }

    // If we are on the login page, don't show the sidebar (though middleware handles this usually, layout persists)
    // Actually, layout wraps everything in /admin. Login is /admin/login.
    // So I should check if pathname is /admin/login.
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <aside className="w-full border-r bg-muted/40 md:w-64 md:flex-col hidden md:flex">
                <div className="flex h-14 items-center border-b px-6 font-semibold">
                    Admin Panel
                </div>
                <div className="flex-1 overflow-auto py-4">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    pathname === item.href
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="border-t p-4">
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
