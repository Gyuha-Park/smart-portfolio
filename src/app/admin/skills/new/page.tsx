import { SkillForm } from "@/components/admin/skill-form"

export const dynamic = "force-dynamic"

export default function NewSkillPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Add New Skill</h1>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <SkillForm />
            </div>
        </div>
    )
}
