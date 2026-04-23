import { CHAT_SUGGESTIONS, PERSONAL_INFO, INTERESTS_DATA } from "@/lib/constants";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simulate AI response - in production, connect to Claude API
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(message),
      };

      // Simulate delay
      setTimeout(() => {
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Running questions
    if (
      lowerMessage.includes("run") ||
      lowerMessage.includes("marathon") ||
      lowerMessage.includes("5k") ||
      lowerMessage.includes("strava")
    ) {
      return `Juan Andrés is a passionate runner! Here are his achievements:

🏃 **Running Personal Bests:**
- **Half Marathon:** ${INTERESTS_DATA.running.halfMarathonPB}
- **5K:** ${INTERESTS_DATA.running.fiveKPB}

${INTERESTS_DATA.running.description}

You can check out his running activities on Strava: ${INTERESTS_DATA.running.stravaProfile}`;
    }

    // Chess questions
    if (
      lowerMessage.includes("chess") ||
      lowerMessage.includes("elo") ||
      lowerMessage.includes("bullet") ||
      lowerMessage.includes("rapid")
    ) {
      return `Juan Andrés is an active chess player! Here's his rating:

♙️ **Chess Ratings:**
- **Bullet:** ${INTERESTS_DATA.chess.bulletElo} Elo (Peak)
- **Rapid:** ${INTERESTS_DATA.chess.rapidElo} Elo (Peak)

${INTERESTS_DATA.chess.description}

You can view his chess profile here: ${INTERESTS_DATA.chess.chessComProfile}`;
    }

    // Technology questions
    if (
      lowerMessage.includes("technolog") ||
      lowerMessage.includes("skill") ||
      lowerMessage.includes("know")
    ) {
      return `Juan Andrés has expertise in multiple technologies:
      
**Frontend:** Angular, TypeScript, HTML5, CSS3
**Backend & DB:** MySQL, SQL, PHP
**Mobile:** Kotlin, Jetpack Compose, Android Studio
**Cloud & DevOps:** Git, Google Cloud, Azure, AWS
**Software Engineering:** Java, C#, Bash, UML

He's particularly strong in full-stack development with a focus on clean, scalable code.`;
    }

    // Mobile project
    if (lowerMessage.includes("mobile") || lowerMessage.includes("android")) {
      return `Juan Andrés's most recent project is the **ISEN Smart Companion** - a native Android application developed solo using:
      
- **Kotlin** with **Jetpack Compose** for modern UI
- **MVVM architecture** for clean code organization
- **AI services integration** and REST APIs
- **Coroutines** for async network optimization

This project demonstrates his ability to build production-ready mobile applications with modern best practices.`;
    }

    // Job opportunities
    if (
      lowerMessage.includes("opportunit") ||
      lowerMessage.includes("job") ||
      lowerMessage.includes("hire") ||
      lowerMessage.includes("work")
    ) {
      return `Yes! Juan Andrés is actively looking for his first professional opportunity. He's a 4th-year Computer Engineering student with:

✓ Solid technical foundation across multiple domains
✓ Real project experience (3 major projects)
✓ International experience (exchange in France)
✓ Strong communication skills (3 languages)
✓ Passion for software development

He's eager to join a team, add value, and grow in the tech sector. Feel free to reach out at ${PERSONAL_INFO.email}`;
    }

    // Education
    if (lowerMessage.includes("stud") || lowerMessage.includes("school") || lowerMessage.includes("universit")) {
      return `Juan Andrés is studying at:

**University of Almería** (2022-2026)
- Computer Engineering degree
- Double major: Information Systems & Information Technologies

**ISEN Toulon, France** (Spring 2025)
- Exchange semester
- Master 1 level: Software Engineering & BigData

He also holds a **C1 English Certificate from Cambridge**.`;
    }

    // Languages
    if (lowerMessage.includes("language") || lowerMessage.includes("speak")) {
      return `Juan Andrés is multilingual:

🇪🇸 **Spanish** - Native speaker from Almería
🇬🇧 **English** - Advanced (C1 Cambridge certified)
🇫🇷 **French** - Intermediate (studied in France)

His language skills enable him to work in international environments and collaborate with diverse teams.`;
    }

    // Default response
    return `I'm here to help you learn about Juan Andrés! You can ask me about:
    
- His technologies and skills
- His projects and experience
- Job opportunities
- His education and background
- Languages he speaks
- How to contact him

What would you like to know?`;
  };

  const handleSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-border flex flex-col max-h-96">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg">
            <h3 className="font-display text-lg font-bold">Ask About Juan Andrés</h3>
            <p className="font-body text-xs opacity-90">Powered by AI</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="font-body text-sm text-muted-foreground">
                  Hi! I'm an AI assistant representing Juan Andrés. Ask me anything about his skills, projects, or experience.
                </p>
                <div className="space-y-2">
                  {CHAT_SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestion(suggestion)}
                      className="w-full text-left p-2 bg-secondary dark:bg-slate-700 hover:bg-primary/10 dark:hover:bg-primary/20 rounded text-xs font-body text-foreground transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-secondary dark:bg-slate-700 text-foreground"
                    }`}
                  >
                    <p className="font-body text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary dark:bg-slate-700 px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body text-sm"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="bg-primary hover:bg-primary-dark text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
