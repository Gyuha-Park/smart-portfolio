"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
    {
        id: 1,
        role: "Senior Frontend Developer",
        company: "Tech Startups Inc.",
        period: "2023.01 - Present",
        description: "Leading the frontend team, migrating legacy code to Next.js, and implementing a design system.",
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "Creative Agency",
        period: "2021.03 - 2022.12",
        description: "Developed various client websites using React and Node.js. Optimized performance and SEO.",
    },
    {
        id: 3,
        role: "Junior Web Developer",
        company: "Web Solutions Co.",
        period: "2019.06 - 2021.02",
        description: "Maintained and updated existing WordPress sites. Built landing pages with HTML/CSS/JS.",
    },
]

export function CareerSection() {
    return (
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
            <motion.div
                className="flex flex-col gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Work Experience</h2>
                </div>

                <div className="relative border-l border-muted ml-4 md:ml-8 space-y-10">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className="relative pl-8 md:pl-12"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="text-xl font-bold">{exp.role}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1 sm:mt-0">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    {exp.period}
                                </div>
                            </div>

                            <div className="flex items-center text-primary font-medium mb-2">
                                <Briefcase className="mr-2 h-4 w-4" />
                                {exp.company}
                            </div>

                            <p className="text-muted-foreground">
                                {exp.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
