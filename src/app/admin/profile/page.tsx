"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    getProfile,
    upsertProfile,
    getCareers,
    createCareer,
    updateCareer,
    deleteCareer,
    type Profile,
    type Career,
} from "./actions"
import { Save, Plus, Pencil, Trash2, Briefcase, User } from "lucide-react"

export const dynamic = "force-dynamic"

export default function AdminProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [careers, setCareers] = useState<Career[]>([])
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string | null>(null)
    const [editingCareer, setEditingCareer] = useState<Career | null>(null)
    const [showCareerForm, setShowCareerForm] = useState(false)

    // Load data
    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        const [p, c] = await Promise.all([getProfile(), getCareers()])
        setProfile(p)
        setCareers(c)
    }

    // ─── Profile Form ───────────────────────────

    async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        startTransition(async () => {
            const result = await upsertProfile(formData)
            if (result?.error) {
                setMessage(`❌ ${result.error}`)
            } else {
                setMessage("✅ Profile saved!")
                loadData()
            }
            setTimeout(() => setMessage(null), 3000)
        })
    }

    // ─── Career Form ────────────────────────────

    async function handleCareerSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        startTransition(async () => {
            let result
            if (editingCareer) {
                result = await updateCareer(editingCareer.id, formData)
            } else {
                result = await createCareer(formData)
            }
            if (result?.error) {
                setMessage(`❌ ${result.error}`)
            } else {
                setMessage(editingCareer ? "✅ Career updated!" : "✅ Career added!")
                setEditingCareer(null)
                setShowCareerForm(false)
                loadData()
            }
            setTimeout(() => setMessage(null), 3000)
        })
    }

    async function handleDeleteCareer(id: string) {
        if (!confirm("Are you sure you want to delete this career entry?")) return
        startTransition(async () => {
            await deleteCareer(id)
            setMessage("✅ Career deleted!")
            loadData()
            setTimeout(() => setMessage(null), 3000)
        })
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Profile & Career</h1>
                {message && (
                    <p className="text-sm px-3 py-1 rounded-md bg-muted">{message}</p>
                )}
            </div>

            {/* ──────── Profile Section ──────── */}
            <div className="rounded-xl border bg-card shadow-sm">
                <div className="flex items-center gap-2 p-6 border-b">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                </div>
                <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Gyuha Park"
                                defaultValue={profile?.name || ""}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">Title / Headline</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Full Stack Developer"
                                defaultValue={profile?.title || ""}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            name="bio"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="A short introduction about yourself..."
                            defaultValue={profile?.bio || ""}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="hello@example.com"
                                defaultValue={profile?.email || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="Seoul, Korea"
                                defaultValue={profile?.location || ""}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="avatar_url">Avatar URL</Label>
                            <Input
                                id="avatar_url"
                                name="avatar_url"
                                placeholder="https://..."
                                defaultValue={profile?.avatar_url || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="resume_url">Resume URL</Label>
                            <Input
                                id="resume_url"
                                name="resume_url"
                                placeholder="https://..."
                                defaultValue={profile?.resume_url || ""}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="github_url">GitHub URL</Label>
                            <Input
                                id="github_url"
                                name="github_url"
                                placeholder="https://github.com/..."
                                defaultValue={profile?.github_url || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                            <Input
                                id="linkedin_url"
                                name="linkedin_url"
                                placeholder="https://linkedin.com/in/..."
                                defaultValue={profile?.linkedin_url || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website_url">Website URL</Label>
                            <Input
                                id="website_url"
                                name="website_url"
                                placeholder="https://..."
                                defaultValue={profile?.website_url || ""}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending}>
                            <Save className="mr-2 h-4 w-4" />
                            {isPending ? "Saving..." : "Save Profile"}
                        </Button>
                    </div>
                </form>
            </div>

            {/* ──────── Careers Section ──────── */}
            <div className="rounded-xl border bg-card shadow-sm">
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">Work Experience</h2>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => {
                            setEditingCareer(null)
                            setShowCareerForm(true)
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Career
                    </Button>
                </div>

                {/* Career Form (New / Edit) */}
                {showCareerForm && (
                    <form onSubmit={handleCareerSubmit} className="p-6 border-b bg-muted/20 space-y-4">
                        <h3 className="font-medium text-sm text-muted-foreground">
                            {editingCareer ? "Edit Career" : "Add New Career"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company">Company *</Label>
                                <Input
                                    id="company"
                                    name="company"
                                    required
                                    defaultValue={editingCareer?.company || ""}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role *</Label>
                                <Input
                                    id="role"
                                    name="role"
                                    required
                                    defaultValue={editingCareer?.role || ""}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="career_desc">Description</Label>
                            <textarea
                                id="career_desc"
                                name="description"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                defaultValue={editingCareer?.description || ""}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Start Date *</Label>
                                <Input
                                    id="start_date"
                                    name="start_date"
                                    placeholder="2023.01"
                                    required
                                    defaultValue={editingCareer?.start_date || ""}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input
                                    id="end_date"
                                    name="end_date"
                                    placeholder="2024.12 (leave empty if current)"
                                    defaultValue={editingCareer?.end_date || ""}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="display_order">Display Order</Label>
                                <Input
                                    id="display_order"
                                    name="display_order"
                                    type="number"
                                    defaultValue={editingCareer?.display_order || 0}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_current"
                                name="is_current"
                                defaultChecked={editingCareer?.is_current || false}
                            />
                            <Label htmlFor="is_current" className="text-sm">Currently working here</Label>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowCareerForm(false)
                                    setEditingCareer(null)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Saving..." : editingCareer ? "Update" : "Add"}
                            </Button>
                        </div>
                    </form>
                )}

                {/* Career List */}
                <div className="divide-y">
                    {careers.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground">
                            No career entries yet. Click &quot;Add Career&quot; to get started.
                        </div>
                    ) : (
                        careers.map((career) => (
                            <div key={career.id} className="p-6 flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                        <h3 className="font-semibold">{career.role}</h3>
                                        <span className="text-sm text-muted-foreground">
                                            {career.start_date} - {career.is_current ? "Present" : career.end_date}
                                        </span>
                                    </div>
                                    <p className="text-primary text-sm font-medium">{career.company}</p>
                                    {career.description && (
                                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{career.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setEditingCareer(career)
                                            setShowCareerForm(true)
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleDeleteCareer(career.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
