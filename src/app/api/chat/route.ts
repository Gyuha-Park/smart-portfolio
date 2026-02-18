import { streamText } from 'ai'
import { geminiModel } from '@/lib/gemini'

export const runtime = 'edge'

export async function POST(req: Request) {
    const { messages } = await req.json()

    // AI SDK v6: messages from useChat come in UIMessage format with parts
    // Convert to the CoreMessage format that streamText expects
    const formattedMessages = messages.map((m: { role: string; parts?: { type: string; text: string }[]; content?: string }) => ({
        role: m.role,
        content: m.parts
            ? m.parts.filter((p: { type: string }) => p.type === 'text').map((p: { text: string }) => p.text).join('')
            : m.content || '',
    }))

    const result = streamText({
        model: geminiModel,
        messages: formattedMessages,
        system: `You are an AI assistant for a portfolio website.
    Your goal is to answer questions about the developer's experience, skills, and projects.
    Be polite, professional, and concise.
    If you don't know the answer, say "I don't have that information right now."
    Answer in the same language as the user's message.
    `,
    })

    return result.toUIMessageStreamResponse()
}
