"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/app/admin/projects/actions"

interface ProjectsSectionProps {
    projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [filter, setFilter] = useState("All")

    // Derive categories from actual data
    const categories = ["All", ...Array.from(new Set(projects.map(p => {
        // Determine category from the first tech_stack item or default to "Web"
        return "Web" // For now, all projects are "Web" category
    })))]

    const filteredProjects = projects.filter((project) =>
        filter === "All" ? true : true // All projects shown for now
    )

    // If no projects from DB, show placeholder
    if (projects.length === 0) {
        return (
            <section id="projects" className="container mx-auto px-4 md:px-6 py-12 md:py-24 bg-muted/30">
                <div className="flex flex-col gap-10">
                    <motion.div
                        className="text-center space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Projects will appear here once you add them in the admin panel.
                        </p>
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
        <section id="projects" className="container mx-auto px-4 md:px-6 py-12 md:py-24 bg-muted/30">
            <div className="flex flex-col gap-10">
                <motion.div
                    className="text-center space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A selection of projects that demonstrate my passion for building rigorous and effective solutions.
                    </p>
                </motion.div>

                <motion.div
                    className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    layout
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="h-full flex flex-col group overflow-hidden border-muted-foreground/10 hover:border-primary/50 transition-colors">
                                    <div className="relative aspect-video bg-muted overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
                                            {project.project_url && (
                                                <Button size="sm" variant="secondary" asChild className="mr-2">
                                                    <Link href={project.project_url} target="_blank">View Demo</Link>
                                                </Button>
                                            )}
                                        </div>
                                        {project.thumbnail_url ? (
                                            <img
                                                src={project.thumbnail_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-secondary flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                                                🌐
                                            </div>
                                        )}
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            {project.is_featured && <Badge variant="outline">Featured</Badge>}
                                        </div>
                                        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">{project.short_description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech_stack?.map((tag) => (
                                                <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-0 justify-between border-t p-4 bg-muted/10">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/projects/${project.id}`}>
                                                Details <ArrowRight className="ml-2 h-3 w-3" />
                                            </Link>
                                        </Button>
                                        <div className="flex gap-2">
                                            {project.github_url && (
                                                <Link href={project.github_url} target="_blank" className="text-muted-foreground hover:text-foreground">
                                                    <Github className="h-4 w-4" />
                                                </Link>
                                            )}
                                            {project.project_url && (
                                                <Link href={project.project_url} target="_blank" className="text-muted-foreground hover:text-foreground">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
