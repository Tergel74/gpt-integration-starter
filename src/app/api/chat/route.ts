import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompts: Record<string, string> = {
    friend: "You are Jake, a reliable friend who loves to make people smile.",
    mentor: "You are a supportive life mentor who explains concepts clearly and teaches the user with easy-to-understand examples.",
    developer:
        "You are a senior developer who responds concisely and with technical accuracy.",
};

export async function POST(req: NextRequest) {
    try {
        const { messages, mode } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid messages format" },
                { status: 400 }
            );
        }

        const systemMessage = {
            role: "system",
            content: systemPrompts[mode] || systemPrompts["friend"],
        };

        const allMessages = [systemMessage, ...messages];

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: allMessages,
            temperature: 0.7,
        });

        return NextResponse.json({
            reply: completion.choices[0].message,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error generating response" },
            { status: 500 }
        );
    }
}
