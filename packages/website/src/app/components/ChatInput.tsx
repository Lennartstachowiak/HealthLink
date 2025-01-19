"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { Card } from "@/components/ui/card";
import { sendMessage } from "../actions";
import { Result } from "@/types/results";
import { StatusChip } from "./StatusChip";

interface Message {
  id: number;
  text: string;
  sender: "User" | "Agent";
}

interface ChatInputProps {
  suggestedQuestions: string[];
  result: Result;
}

export function ChatInput(props: ChatInputProps) {
  const { suggestedQuestions, result } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Open chat only when scrolling down to the bottom, close when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const buffer = 50;

      // Detect scroll direction
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        if (scrollTop + clientHeight >= scrollHeight - buffer) {
          setIsMinimized(false); // Open chat when near the bottom
        }
      } else {
        // Scrolling up
        if (scrollTop + clientHeight < scrollHeight - buffer) {
          setIsMinimized(true); // Close chat when scrolling up
        }
      }

      // Update the last scroll position
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handleSend = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!input.trim()) return;

      setLoading(true);

      const userMessage: Message = {
        id: Date.now(),
        text: input,
        sender: "User",
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const messageAnswer = await sendMessage(userMessage.text, result);
      const agentMessage: Message = {
        id: Date.now(),
        text: messageAnswer,
        sender: "Agent",
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out ${
        isMinimized ? "h-2" : "pb-6 pt-3"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4">
        {/* Open/Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute right-4 top-0  -translate-y-full 
             rounded-t-lg rounded-b-none px-5 py-3 font-semibold shadow-none transition-all duration-300 ${
               isMinimized
                 ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
                 : "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-black-800 hover:bg-gray-100"
             }`}
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? (
            <>
              <ChevronUp className="h-5 w-5" />
              <span className="ml-2 ">Open Chat</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-5 w-5" />
              <span className="ml-2 ">Close Chat</span>
            </>
          )}
        </Button>

        {!isMinimized && (
          <>
            <SuggestedQuestions
              suggestedQuestions={suggestedQuestions}
              onClick={handleSuggestionClick}
            />
            {messages.length > 0 ||
              (loading && (
                <div className="mb-4 max-h-96 overflow-y-auto rounded-lg border bg-gray-50 p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-2 rounded-lg p-2 ${
                        message.sender === "User"
                          ? "ml-auto bg-blue-100 text-right"
                          : "mr-auto bg-white"
                      }`}
                    >
                      <p className="text-xs font-semibold text-gray-600">
                        {message.sender}
                      </p>
                      <p className="text-sm text-gray-800">{message.text}</p>
                    </div>
                  ))}
                  <StatusChip isLoading={loading} />
                  <div ref={messagesEndRef} />
                </div>
              ))}

            {/* Input */}
            <form onSubmit={handleSend} className="flex gap-2 items-center">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your lab results..."
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-[#4AA69A] focus:outline-none focus:ring-1 focus:ring-[#4AA69A]"
              />
              <Button
                type="submit"
                size="icon"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4AA69A] text-white transition-colors hover:bg-[#3d8a80]"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </>
        )}
      </div>
    </Card>
  );
}
