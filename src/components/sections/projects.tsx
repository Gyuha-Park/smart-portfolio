"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dummy data for now
const projects = [
    {
        id: "1",
        title: "AI Emotion Diary",
        description: "An AI-powered diary that analyzes user emotions and provides empathetic feedback using Gemini API.",
        category: "Web",
        image: "/images/project-1.jpg", // Placeholder
        tags: ["Next.js", "OpenAI", "Supabase"],
        demoUrl: "https://example.com",
        githubUrl: "https://github.com",
    },
    {
        id: "2",
        title: "Smart Portfolio",
        description: "A portfolio website featuring a RAG-based chatbot that answers questions based on my resume.",
        category: "Web",
        image: "/images/project-2.jpg",
        tags: ["Next.js", "RAG", "Vector DB"],
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        id: "3",
        title: "E-commerce Dashboard",
        description: "Admin dashboard for managing products, orders, and customers with real-time analytics.",
        category: "Design",
        image: "/images/project-3.jpg",
        tags: ["React", "Chart.js", "Tailwind"],
        demoUrl: "#",
        githubUrl: "#",
    },
]

const categories = ["All", "Web", "App", "Design"]

export function ProjectsSection() {
    const [filter, setFilter] = useState("All")

    const filteredProjects = projects.filter((project) =>
        filter === "All" ? true : project.category === filter
    )

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

                    {/* Filter Buttons */}
                    <div className="flex justify-center flex-wrap gap-2 mt-6">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={filter === cat ? "default" : "outline"}
                                onClick={() => setFilter(cat)}
                                className="rounded-full px-6"
                                size="sm"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
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
                                            <Button size="sm" variant="secondary" asChild className="mr-2">
                                                <Link href={project.demoUrl} target="_blank">View Demo</Link>
                                            </Button>
                                        </div>
                                        {/* Placeholder Image Logic */}
                                        <div className="w-full h-full bg-secondary flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                                            {project.category === "Web" ? "🌐" : project.category === "App" ? "📱" : "🎨"}
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline">{project.category}</Badge>
                                        </div>
                                        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
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
                                            {project.githubUrl && (
                                                <Link href={project.githubUrl} target="_blank" className="text-muted-foreground hover:text-foreground">
                                                    <Github className="h-4 w-4" />
                                                </Link>
                                            )}
                                            {project.demoUrl && (
                                                <Link href={project.demoUrl} target="_blank" className="text-muted-foreground hover:text-foreground">
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
