import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TerminalLine {
  id: string;
  type: "input" | "output";
  content: string;
}

const TERMINAL_COMMANDS: Record<string, string> = {
  whoami: "Juan Andrés Aliaga Fuentes — Software Developer",
  "ls projects": `1. ISEN Smart Companion (Mobile - Kotlin, Jetpack Compose)
2. Universe Dragon Ball SPA (Web - Angular, TypeScript)
3. Spotify Clone (Backend - MySQL, PHP)`,
  "skills --list": `Frontend: Angular, TypeScript, HTML5, CSS3
Backend & DB: MySQL, SQL, PHP, Microsoft Access
Mobile: Kotlin, Jetpack Compose, Android Studio
Cloud & DevOps: Git, Google Cloud, Azure, AWS
Software Engineering: Java, C#, Bash, UML`,
  contact: `Email: juanandres234t@gmail.com
Phone: +34 639 058 109
GitHub: github.com/JuanAndres-source
LinkedIn: linkedin.com/in/juanandres`,
  languages: `Spanish: Native (5/5)
English: Advanced C1 Cambridge (5/5)
French: Intermediate (3/5)`,
  help: `Available commands:
  whoami - Show identity
  ls projects - List projects
  skills --list - Show all skills
  contact - Show contact information
  languages - Show language proficiency
  clear - Clear terminal
  exit - Close terminal`,
  clear: "",
  exit: "CLOSE_TERMINAL",
};

interface TerminalProps {
  onClose: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "output",
      content: "Welcome to Juan Andrés's Terminal 🖥️",
    },
    {
      id: "2",
      type: "output",
      content: 'Type "help" for available commands',
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    inputRef.current?.focus();
  }, [lines]);

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();

    // Add command to history
    setCommandHistory((prev) => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Add input line
    setLines((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "input",
        content: `$ ${command}`,
      },
    ]);

    // Process command
    if (trimmedCommand === "clear") {
      setLines([]);
    } else if (trimmedCommand === "exit") {
      onClose();
    } else {
      const response =
        TERMINAL_COMMANDS[trimmedCommand] || `Command not found: ${command}`;

      if (response) {
        setLines((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            type: "output",
            content: response,
          },
        ]);
      }
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-96 bg-slate-900 rounded-lg border border-green-500 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 border-b border-green-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-code text-green-500 text-sm font-bold">
              juan-andres@portfolio:~$
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-green-500 hover:text-green-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-950"
        >
          {lines.map((line) => (
            <div key={line.id} className="font-code text-sm">
              {line.type === "input" ? (
                <span className="text-green-400">{line.content}</span>
              ) : (
                <span className="text-green-500 whitespace-pre-wrap">
                  {line.content}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Input Line */}
        <div className="border-t border-green-500 px-4 py-3 bg-slate-900 flex items-center gap-2">
          <span className="font-code text-green-500 text-sm font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-500 font-code text-sm outline-none"
            placeholder="Type command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
