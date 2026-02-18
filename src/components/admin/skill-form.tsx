"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSkill, updateSkill, type Skill } from "@/app/admin/skills/actions"
import { useState } from "react"

export function SkillForm({ skill }: { skill?: Skill }) {
    const [error, setError] = useState<string | null>(null)

    async function action(formData: FormData) {
        const res = skill
            ? await updateSkill(skill.id, formData)
            : await createSkill(formData)

        if (res?.error) {
            setError(res.error)
        }
    }

    return (
        <form action={action} className="space-y-8 max-w-lg">
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Skill Name</Label>
                    <Input id="name" name="name" placeholder="React" defaultValue={skill?.name} required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" placeholder="Frontend" defaultValue={skill?.category || ""} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="proficiency">Proficiency (1-100)</Label>
                        <Input id="proficiency" name="proficiency" type="number" min="1" max="100" defaultValue={skill?.proficiency || 80} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="display_order">Display Order</Label>
                        <Input id="display_order" name="display_order" type="number" defaultValue={skill?.display_order || 0} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit">{skill ? "Update Skill" : "Create Skill"}</Button>
            </div>
        </form>
    )
}
