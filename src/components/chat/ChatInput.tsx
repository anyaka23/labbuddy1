import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading = false, placeholder = "Ask about your experiment..." }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="relative rounded-2xl bg-card border border-border overflow-hidden shadow-card">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className={cn(
            "w-full bg-transparent px-4 py-4 pr-24 resize-none",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-0 border-0",
            "disabled:opacity-50"
          )}
          style={{ minHeight: "56px", maxHeight: "120px" }}
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="w-9 h-9 text-muted-foreground hover:text-foreground"
          >
            <Mic size={18} />
          </Button>
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-xl"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
