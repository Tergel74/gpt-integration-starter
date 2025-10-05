# Next.js GPT Chat App - Mini Course

A beginner-friendly tutorial project that teaches you how to build a modern AI-powered chat application using Next.js, OpenAI's GPT API, and TailwindCSS. Perfect for developers who want to learn how to integrate AI into their web applications.

## ✨ Features

-   **💬 Modern Chat Interface** - Beautiful gradient-themed UI with glass morphism effects
-   **👤 Avatar System** - Distinct avatars for user and AI messages with gradient styling
-   **🧠 Session Memory** - AI remembers conversation context throughout the chat session
-   **🎭 Three AI Modes** - Switch between different AI personalities:
    -   **Friend** - Jake, a reliable friend who loves to make people smile
    -   **Mentor** - A supportive life mentor with clear explanations
    -   **Developer** - A senior developer with concise, technical responses
-   **✨ Smooth Animations** - Slide-in animations for messages and hover effects
-   **⏳ Smart Loading States** - "AI is typing" indicator with animated dots
-   **🎨 Gradient Themes** - Modern blue-to-purple color scheme throughout
-   **🧹 Clear Chat** - Reset conversation with one click
-   **🌟 Empty State** - Welcoming interface when starting a new conversation
-   **📱 Responsive Design** - Works seamlessly on all devices with mobile-first approach

## 🛠️ Tech Stack

-   **[Next.js 15](https://nextjs.org/)** - React framework with App Router
-   **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
-   **[OpenAI API](https://openai.com/api/)** - GPT-4o-mini for AI responses
-   **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better developer experience

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai_saas_starter
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# .env.local
OPENAI_API_KEY=your_openai_api_key_here
```

> 💡 **Get your API key**: Visit [OpenAI's API platform](https://platform.openai.com/api-keys) to create an account and generate your API key.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your chat app in action!

## 🔧 How It Works

### API Integration with Serverless Route

The magic happens in `/src/app/api/chat/route.ts`:

```typescript
// Serverless API route that handles chat requests
export async function POST(req: NextRequest) {
    const { messages, mode } = await req.json();

    // Add system prompt based on selected mode
    const systemMessage = {
        role: "system",
        content: systemPrompts[mode] || systemPrompts["friend"],
    };

    // Send to OpenAI with conversation history
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [systemMessage, ...messages],
        temperature: 0.7,
    });

    return NextResponse.json({ reply: completion.choices[0].message });
}
```

### Conversation Memory

-   Messages are stored in React state as an array
-   Each new message includes the entire conversation history
-   AI maintains context throughout the session
-   Memory resets when chat is cleared

### Mode Selection with System Prompts

Three distinct AI personalities controlled by system prompts:

```typescript
const systemPrompts = {
    friend: "You are Jake, a reliable friend who loves to make people smile.",
    mentor: "You are a supportive life mentor who explains concepts clearly...",
    developer: "You are a senior developer who responds concisely...",
};
```

### Frontend Chat UI Components

**Main Chat Interface** (`/src/app/page.tsx`)

-   Manages conversation state and API calls
-   Handles mode switching and loading states

**ChatBubble Component** (`/src/components/ChatBubble.tsx`)

-   Renders individual messages with avatar system and gradient styling
-   Smooth hover effects and consistent design language
-   Differentiates between user and AI messages with visual hierarchy

**InputBox Component** (`/src/components/InputBox.tsx`)

-   Modern input field with focus states and transitions
-   Gradient send button with loading animations
-   Smart form validation and visual feedback

**Loader Component** (`/src/components/Loader.tsx`)

-   Contextual "AI is typing" indicator with bouncing dots
-   Matches overall chat bubble design system

### UI/UX Design Features

This project showcases modern web design principles:

-   **🎨 Glass Morphism** - Semi-transparent backgrounds with backdrop blur effects
-   **🌈 Gradient Themes** - Beautiful blue-to-purple color schemes throughout
-   **✨ Micro-animations** - Smooth transitions, hover effects, and slide-in animations
-   **👤 Avatar System** - Visual identity for user vs AI messages
-   **🎯 Interactive Feedback** - Buttons scale on hover, focus states, loading indicators
-   **📐 Consistent Spacing** - Proper padding, margins, and layout hierarchy
-   **🌟 Empty States** - Welcoming interface when no messages exist
-   **💫 Smooth Scrolling** - Optimized chat area with proper overflow handling

### Prompt Engineering Basics

Learn fundamental prompt engineering concepts:

-   **System Prompts** - Define AI personality and behavior
-   **Temperature Control** - Adjust creativity vs consistency (0.7 used here)
-   **Context Management** - How conversation history affects responses
-   **Role-based Messaging** - User vs Assistant vs System roles

## 🔮 Optional Enhancements

Ready to take your chat app to the next level? Try adding:

-   **📝 Markdown Rendering** - Use `react-markdown` for rich text formatting
-   **💾 Persistent Storage** - Save conversations to localStorage or database
-   **� Dark Mode Toggle** - Switch between light and dark themes
-   **📁 File Uploads** - Allow users to share images or documents
-   **🔊 Speech Integration** - Text-to-speech and voice input
-   **👥 Multi-user Support** - Authentication and user sessions
-   **📊 Usage Analytics** - Track API usage and costs
-   **🔧 Custom AI Models** - Switch between different OpenAI models
-   **🎨 Theme Customization** - User-selectable color schemes and fonts
-   **💬 Message Reactions** - Like/dislike system for AI responses
-   **🔊 Speech Integration** - Text-to-speech and voice input
-   **👥 Multi-user Support** - Authentication and user sessions
-   **📊 Usage Analytics** - Track API usage and costs
-   **🔧 Custom AI Models** - Switch between different OpenAI models

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/new)
3. Import your repository
4. Add your `OPENAI_API_KEY` in Environment Variables
5. Deploy!

### Other Platforms

-   **Netlify** - Serverless functions support
-   **Railway** - Simple deployment with built-in databases
-   **DigitalOcean App Platform** - Scalable hosting solution

> ⚠️ **Important**: Always keep your OpenAI API key secure and never commit it to version control!

## 📈 Next Steps & Learning Path

### What You've Learned

-   ✅ Next.js App Router and API routes
-   ✅ OpenAI API integration
-   ✅ React state management for chat applications
-   ✅ TypeScript for type safety
-   ✅ TailwindCSS for responsive design
-   ✅ Environment variable management

### Continue Your Journey

Want to build production-ready AI applications? Check out our **comprehensive paid template** that includes:

-   🔐 **Complete Authentication System** (NextAuth.js)
-   💳 **Stripe Payment Integration**
-   📊 **Advanced Analytics Dashboard**
-   🏢 **Multi-tenant Architecture**
-   🔒 **Rate Limiting & Usage Tracking**
-   📱 **Mobile App (React Native)**
-   🎯 **Advanced Prompt Management**
-   📈 **Scaling Best Practices**

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

**What this means:**

-   ✅ Free to use for personal and commercial projects
-   ✅ Modify and distribute as you wish
-   ✅ No warranty or liability
-   ✅ Just keep the license notice in copies

## 🤝 Contributing

Contributions are welcome! Feel free to:

-   Report bugs
-   Suggest features
-   Submit pull requests
-   Improve documentation

---

**Happy coding! 🚀**

_Built with ❤️ for developers learning AI integration_

Tergel
