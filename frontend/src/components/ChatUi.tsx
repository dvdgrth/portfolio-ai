"use client";

import { BaseSyntheticEvent, useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatUI() {
  const first_name =
    process.env.NEXT_PUBLIC_PROFILE_FIRST_NAME || "[first name]";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! Ich bin der **KI-Assistent** von ${first_name}. Frag mich ruhig alles über seine Qualifikationen, seinen Lebenslauf oder wer er ist!`,
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (event: BaseSyntheticEvent) => {
    event.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    scrollToBottom();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();

      const assistantMessage = {
        role: "assistant",
        content: data.message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-lg shadow ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto text-right"
                : "bg-gray-200 text-black self-start mr-auto text-left"
            } w-fit max-w-[85%] break-words`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">
            Nachricht wird gesendet...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form className="p-4 border-t border-gray-300 bg-gray-50">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <textarea
            rows={1}
            placeholder="Schreibe eine Nachricht..."
            maxLength={500}
            className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSend}
            disabled={isLoading}
          >
            {isLoading ? "Senden..." : "Absenden"}
          </button>
        </div>
      </form>
    </div>
  );
}
