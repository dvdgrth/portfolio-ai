"use client";

import { BaseSyntheticEvent, useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import CircleLoader from "react-spinners/CircleLoader";

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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus(); // Refocus the textarea
    }
  }, [isLoading]);

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

      if (res.status === 429) {
        const rateLimitMessage = {
          role: "assistant",
          content:
            "Rate-Limit überschritten. Bitte warte einen Moment, bevor du es erneut versuchst.",
        };
        setMessages((prev) => [...prev, rateLimitMessage]);
      } else if (res.ok) {
        const data = await res.json();
        const assistantMessage = {
          role: "assistant",
          content: data.message.content,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage = {
          role: "assistant",
          content:
            "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht:", error);
      const errorMessage = {
        role: "assistant",
        content:
          "Ein Verbindungsfehler ist aufgetreten. Bitte überprüfe deine Internetverbindung und versuche es erneut.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col rounded-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`rounded-lg  ${
              msg.role === "user"
                ? "bg-background-darker self-end ml-auto text-right px-4 py-2"
                : "self-start mr-auto text-left"
            } w-fit max-w-[85%] break-words`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-left items-center text-gray-500">
            <div className="mr-4">Antwort wird generiert...</div>
            <CircleLoader
              color="#6a7282 "
              size={36}
              className="color-black fill-amber-50"
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form>
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            rows={1}
            placeholder="Schreibe eine Nachricht..."
            maxLength={500}
            className="flex-1 bg-gray-50 border rounded-lg px-4 py-2 resize-none"
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
            className={`px-6 py-2 rounded-lg hover:text-black hover:bg-background-darker transition-all border ${
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
