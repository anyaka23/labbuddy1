import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant && (
        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow-primary">
          <Bot size={16} className="text-primary-foreground" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-3",
          isAssistant 
            ? "bg-card border border-border rounded-tl-none" 
            : "bg-gradient-primary text-primary-foreground rounded-tr-none"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p className={cn(
          "text-xs mt-2",
          isAssistant ? "text-muted-foreground" : "text-primary-foreground/70"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-secondary-foreground" />
        </div>
      )}
    </motion.div>
  );
}
