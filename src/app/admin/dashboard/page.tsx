export const dynamic = "force-dynamic"

export default function AdminDashboard() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
                Welcome to your portfolio admin dashboard. Select a menu item from the sidebar to manage your content.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Quick Stats Placeholders */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Projects</h3>
                    </div>
                    <div className="text-2xl font-bold">0</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Unread Leads</h3>
                    </div>
                    <div className="text-2xl font-bold">0</div>
                </div>
            </div>
        </div>
    )
}
