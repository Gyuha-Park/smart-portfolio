import Link from "next/link"
import { getSkills, deleteSkill } from "./actions"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminSkillsPage() {
    const skills = await getSkills()

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Skills</h1>
                <Button asChild>
                    <Link href="/admin/skills/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Skill
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Order</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Proficiency</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skills.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No skills found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            skills.map((skill) => (
                                <TableRow key={skill.id}>
                                    <TableCell>{skill.display_order}</TableCell>
                                    <TableCell className="font-medium">{skill.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{skill.category}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-24 rounded-full bg-secondary overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${skill.proficiency}%` }} />
                                            </div>
                                            <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/skills/${skill.id}/edit`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <form action={deleteSkill.bind(null, skill.id)}>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
