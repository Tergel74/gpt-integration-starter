interface Message {
    role: "user" | "assistant" | "system";
    content: string;
}

type Mode = "friend" | "mentor" | "developer";

export type { Message, Mode };
