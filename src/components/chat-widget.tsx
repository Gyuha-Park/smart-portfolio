"use client"

import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function ChatWidget() {
    const { messages, sendMessage, status } = useChat()
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)
    const isLoading = status === "streaming" || status === "submitted"

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-full max-w-[350px] sm:w-[350px]"
                    >
                        <Card className="shadow-xl border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-primary-foreground rounded-t-lg p-4">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    🤖 Portfolio Assistant
                                </CardTitle>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/20" onClick={() => setIsOpen(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div ref={scrollRef} className="h-[300px] overflow-y-auto p-4 space-y-4">
                                    {messages.length === 0 && (
                                        <div className="text-sm text-muted-foreground text-center mt-10">
                                            👋 Hi! Ask me anything about this portfolio.
                                        </div>
                                    )}
                                    {messages.map((m) => (
                                        <div
                                            key={m.id}
                                            className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${m.role === "user"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted text-foreground"
                                                    }`}
                                            >
                                                {m.parts.filter(p => p.type === "text").map(p => p.text).join("")}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="p-3 border-t">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    if (!input.trim()) return
                                    sendMessage({ text: input })
                                    setInput("")
                                }} className="flex w-full items-center space-x-2">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 h-9 text-sm"
                                    />
                                    <Button type="submit" size="icon" className="h-9 w-9" disabled={isLoading}>
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Send</span>
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
                <span className="sr-only">Toggle Chat</span>
            </motion.button>
        </div>
    )
}
