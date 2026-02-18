import Link from "next/link"
import { getProjects, deleteProject } from "./actions"
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
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Tech Stack</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{project.title}</span>
                                            <span className="text-xs text-muted-foreground">{project.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {project.tech_stack?.slice(0, 3).map(tag => (
                                                <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0">{tag}</Badge>
                                            ))}
                                            {(project.tech_stack?.length || 0) > 3 && (
                                                <span className="text-xs text-muted-foreground">+{project.tech_stack!.length - 3}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {project.start_date} ~ {project.end_date || "Present"}
                                    </TableCell>
                                    <TableCell>
                                        {project.is_featured ? (
                                            <Badge variant="default">Featured</Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {project.project_url && (
                                                <Button variant="ghost" size="icon" asChild>
                                                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/projects/${project.id}/edit`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <form action={deleteProject.bind(null, project.id)}>
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
