import { SkillForm } from "@/components/admin/skill-form"
import { getSkill } from "@/app/admin/skills/actions"

interface PageProps {
    params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EditSkillPage({ params }: PageProps) {
    const { id } = await params
    const skill = await getSkill(id)

    if (!skill) {
        return <div>Skill not found</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Edit Skill: {skill.name}</h1>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                <SkillForm skill={skill} />
            </div>
        </div>
    )
}
