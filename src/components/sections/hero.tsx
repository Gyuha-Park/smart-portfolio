"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Profile } from "@/app/admin/profile/actions"

// Fallback values when no profile exists in DB
const defaultProfile = {
    name: "Your Name",
    title: "Full Stack Developer",
    bio: "Hello! Set up your profile in the admin panel to customize this section.",
    avatar_url: null,
}

interface HeroSectionProps {
    profile: Profile | null
}

export function HeroSection({ profile }: HeroSectionProps) {
    const p = profile || defaultProfile

    return (
        <section className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center gap-4 pt-10 pb-8 md:pt-16 md:pb-12 lg:py-32">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16 items-center">
                <motion.div
                    className="flex flex-col gap-4 text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent pb-1">
                        {p.title || "Build Value Beyond Code"}
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Hello, I&apos;m <span className="font-semibold text-foreground">{p.name}</span>.
                        <br />
                        {p.bio || "I'm a Full Stack Developer who solves business problems with technology. Ask my AI assistant anything about my portfolio."}
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center md:justify-start">
                        <Button size="lg" asChild>
                            <Link href="#projects">
                                View Projects <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Ask AI Assistant
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    className="relative flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                        {p.avatar_url ? (
                            <img
                                src={p.avatar_url}
                                alt={p.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-950 flex items-center justify-center text-4xl">
                                👨‍💻
                            </div>
                        )}
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl opacity-50" />
                </motion.div>
            </div>
        </section>
    )
}
