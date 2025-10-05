"use client";

import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import InputBox from "../components/InputBox";
import Loader from "../components/Loader";
import { Message, Mode } from "./types/main";

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<Mode>("friend");

    const sendMessage = async (content: string) => {
        const newMessages: Message[] = [...messages, { role: "user", content }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages, mode }),
            });

            const data = await res.json();
            if (data.reply) {
                setMessages([...newMessages, data.reply]);
            }
        } catch (err) {
            console.error(err);
            setMessages([
                ...newMessages,
                { role: "assistant", content: "Error generating response." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => setMessages([]);

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header with Mode Selector */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            AI Chat Assistant
                        </h1>
                        <div className="text-sm text-gray-500">
                            Mode:{" "}
                            <span className="font-medium capitalize">
                                {mode}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {(["friend", "mentor", "developer"] as Mode[]).map(
                            (m) => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                                        mode === m
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                                    }`}
                                >
                                    {m.charAt(0).toUpperCase() + m.slice(1)}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white text-2xl">💬</span>
                            </div>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">
                                Start a conversation
                            </h3>
                            <p className="text-gray-500">
                                Choose a mode above and send your first message!
                            </p>
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className="animate-in slide-in-from-bottom-4 duration-300"
                        >
                            <ChatBubble role={msg.role} content={msg.content} />
                        </div>
                    ))}
                    {loading && (
                        <div className="animate-in slide-in-from-bottom-4 duration-300">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>

            {/* Input area */}
            <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
                <div className="max-w-4xl mx-auto">
                    <InputBox
                        onSend={sendMessage}
                        loading={loading}
                        clearChat={clearChat}
                    />
                </div>
            </div>
        </div>
    );
}
