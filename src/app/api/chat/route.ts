import { streamText } from 'ai'
import { geminiModel } from '@/lib/gemini'

export const runtime = 'edge'

export async function POST(req: Request) {
    const { messages } = await req.json()

    const result = streamText({
        model: geminiModel,
        messages,
        system: `You are an AI assistant for a portfolio website.
    Your goal is to answer questions about the developer's experience, skills, and projects.
    Be polite, professional, and concise.
    If you don't know the answer, say "I don't have that information right now."
    `,
    })

    return result.toTextStreamResponse()
}
