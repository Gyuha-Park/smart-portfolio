"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = [
    {
        category: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Supabase", "PostgreSQL", "Prisma", "Serverless Functions"],
    },
    {
        category: "AI & Data",
        items: ["Gemini API", "RAG Pipeline", "Vector Database", "LangChain"],
    },
    {
        category: "DevOps & Tools",
        items: ["Git", "Vercel", "Docker", "Figma"],
    },
]

export function SkillsSection() {
    return (
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="flex flex-col gap-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Tech Stack</h2>
                    <p className="text-muted-foreground text-lg">
                        Tools and technologies I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {skills.map((group, index) => (
                        <motion.div
                            key={group.category}
                            className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="font-semibold text-xl">{group.category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <Badge key={item} variant="secondary" className="text-sm py-1 px-3">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
