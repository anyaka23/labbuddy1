import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChatMessage, Message } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { GlowCard } from "@/components/ui/glow-card";

const suggestedQuestions = [
  "How do I set up an oscilloscope for measuring AC voltage?",
  "What's the correct procedure for using a multimeter?",
  "Explain Ohm's Law experiment step by step",
  "How do I calibrate a pH meter before use?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm LAB-BUDDY, your intelligent lab assistant. I can help you with:\n\n• Step-by-step experiment guidance\n• Instrument usage and setup\n• Error diagnosis and troubleshooting\n• Understanding lab concepts\n\nWhat would you like to learn about today?",
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      oscilloscope: `Great question! Here's how to set up an oscilloscope for measuring AC voltage:\n\n**Step 1: Initial Setup**\n• Turn on the oscilloscope and wait for it to initialize\n• Connect the probe to Channel 1\n\n**Step 2: Configure Settings**\n• Set the coupling to AC mode\n• Adjust VOLT/DIV to expected voltage range\n• Set TIME/DIV for your signal frequency\n\n**Step 3: Connect & Measure**\n• Attach probe tip to your signal source\n• Connect ground clip to circuit ground\n• Adjust trigger to stabilize the waveform\n\n⚡ **Pro Tip:** Start with higher VOLT/DIV and work down to avoid clipping!`,
      multimeter: `Here's the correct procedure for using a digital multimeter:\n\n**Safety First:**\n⚠️ Always check the multimeter rating matches your circuit\n⚠️ Never measure resistance on a live circuit\n\n**For Voltage Measurement:**\n1. Set the dial to V~ (AC) or V⎓ (DC)\n2. Insert black probe in COM, red in VΩ\n3. Touch probes to circuit points in parallel\n\n**For Current Measurement:**\n1. Set dial to A~ or A⎓\n2. Move red probe to current jack\n3. Connect in series with the load\n\n**For Resistance:**\n1. Ensure circuit is de-energized\n2. Set dial to Ω\n3. Touch probes across component`,
      default: `That's a great question! Based on my analysis, here's what you need to know:\n\nI can provide detailed guidance on this topic. The key points to consider are:\n\n1. **Preparation**: Ensure you have all required equipment ready\n2. **Procedure**: Follow the standard laboratory protocol\n3. **Safety**: Always wear appropriate PPE\n4. **Recording**: Document all observations systematically\n\nWould you like me to elaborate on any specific aspect? I can also help you with:\n• Troubleshooting common issues\n• Understanding theoretical concepts\n• Suggesting alternative approaches`,
    };

    let responseContent = responses.default;
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("oscilloscope")) {
      responseContent = responses.oscilloscope;
    } else if (lowerContent.includes("multimeter")) {
      responseContent = responses.multimeter;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary">
              <Bot size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">AI Lab Assistant</h1>
              <p className="text-sm text-muted-foreground">Real-time guidance for your experiments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/20 rounded-full">
            <div className="w-2 h-2 rounded-full status-online" />
            <span className="text-xs text-success font-medium">Online</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden rounded-2xl bg-card/50 border border-border">
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                    <Bot size={16} className="text-primary-foreground" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSend(question)}
                      className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <ChatInput onSend={handleSend} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
