"use client";

import { useState } from "react";

interface InputBoxProps {
    onSend: (message: string) => void;
    loading: boolean;
    clearChat: () => void;
}

export default function InputBox({
    onSend,
    loading,
    clearChat,
}: InputBoxProps) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-3 items-end">
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 shadow-sm"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    disabled={loading || !input.trim()}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending
                        </div>
                    ) : (
                        "Send"
                    )}
                </button>
                <button
                    type="button"
                    onClick={clearChat}
                    className="px-4 py-3 rounded-2xl bg-gray-500 text-white hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    Clear
                </button>
            </div>
        </form>
    );
}
