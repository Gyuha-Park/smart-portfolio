"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { getLeads, updateLeadStatus, deleteLead, type Lead } from "./actions"
import { Mail, Trash2, Clock, CheckCircle, XCircle, User, MessageSquare } from "lucide-react"

export const dynamic = "force-dynamic"

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    new: { label: "New", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: Clock },
    contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: Mail },
    completed: { label: "Completed", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", icon: CheckCircle },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", icon: XCircle },
}

const statusOptions = ["new", "contacted", "completed", "rejected"]

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string | null>(null)
    const [filter, setFilter] = useState<string>("all")

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        const data = await getLeads()
        setLeads(data)
    }

    async function handleStatusChange(id: string, newStatus: string) {
        startTransition(async () => {
            const result = await updateLeadStatus(id, newStatus)
            if (result?.error) {
                setMessage(`❌ ${result.error}`)
            } else {
                setMessage("✅ Status updated!")
                loadData()
            }
            setTimeout(() => setMessage(null), 3000)
        })
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this lead?")) return
        startTransition(async () => {
            await deleteLead(id)
            setMessage("✅ Lead deleted!")
            loadData()
            setTimeout(() => setMessage(null), 3000)
        })
    }

    const filteredLeads = filter === "all" ? leads : leads.filter((l) => l.status === filter)

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage contact requests from visitors. Total: {leads.length}
                    </p>
                </div>
                {message && (
                    <p className="text-sm px-3 py-1 rounded-md bg-muted">{message}</p>
                )}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
                <Button
                    size="sm"
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                    className="rounded-full"
                >
                    All ({leads.length})
                </Button>
                {statusOptions.map((status) => {
                    const config = statusConfig[status]
                    const count = leads.filter((l) => l.status === status).length
                    return (
                        <Button
                            key={status}
                            size="sm"
                            variant={filter === status ? "default" : "outline"}
                            onClick={() => setFilter(status)}
                            className="rounded-full"
                        >
                            {config.label} ({count})
                        </Button>
                    )
                })}
            </div>

            {/* Leads List */}
            <div className="space-y-4">
                {filteredLeads.length === 0 ? (
                    <div className="rounded-xl border bg-card p-12 text-center">
                        <MessageSquare className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                        <p className="text-muted-foreground">No leads found.</p>
                    </div>
                ) : (
                    filteredLeads.map((lead) => {
                        const config = statusConfig[lead.status] || statusConfig.new
                        const StatusIcon = config.icon
                        return (
                            <div
                                key={lead.id}
                                className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-semibold">{lead.name || "Anonymous"}</span>
                                                </div>
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                                                    <StatusIcon className="h-3 w-3" />
                                                    {config.label}
                                                </span>
                                            </div>
                                            {lead.email && (
                                                <a href={`mailto:${lead.email}`} className="text-sm text-primary hover:underline flex items-center gap-1 mb-2">
                                                    <Mail className="h-3 w-3" /> {lead.email}
                                                </a>
                                            )}
                                            {lead.message && (
                                                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{lead.message}</p>
                                            )}
                                            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                                <span>{new Date(lead.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                                                {lead.source && <span>Source: {lead.source}</span>}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                disabled={isPending}
                                                className="text-sm rounded-md border bg-background px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring"
                                            >
                                                {statusOptions.map((s) => (
                                                    <option key={s} value={s}>{statusConfig[s].label}</option>
                                                ))}
                                            </select>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(lead.id)}
                                                disabled={isPending}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
