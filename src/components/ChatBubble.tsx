import { Message } from "../app/types/main";

interface ChatBubbleProps extends Message {}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
    const isUser = role === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
        >
            <div
                className={`flex items-start gap-3 max-w-[80%] ${
                    isUser ? "flex-row-reverse" : "flex-row"
                }`}
            >
                {/* Avatar */}
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                        isUser
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700"
                    }`}
                >
                    {isUser ? "You" : "AI"}
                </div>

                {/* Message bubble */}
                <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap transition-all duration-200 group-hover:shadow-md ${
                        isUser
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md"
                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                    }`}
                >
                    {content}
                </div>
            </div>
        </div>
    );
}
