"use client"

import * as React from "react"
import Link from "next/link"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
    const { setTheme, theme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4 md:px-6">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                        Smart Portfolio
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Projects
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        About
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="md:hidden"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="hidden md:flex"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <div className="hidden md:flex">
                        <Button asChild>
                            <Link href="/admin/login">Admin</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background p-4 space-y-4 animate-accordion-down">
                    <nav className="flex flex-col space-y-4">
                        <Link href="/projects" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Projects
                        </Link>
                        <Link href="/about" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            About
                        </Link>
                        <Link href="/contact" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </Link>
                        <Link href="/admin/login" className="hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                            Admin Login
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
