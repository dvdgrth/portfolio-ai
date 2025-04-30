"use client";

export default function ChatUI() {
  const name = process.env.NEXT_PUBLIC_PROFILE_NAME || "[name]";
  const messages = [
    {
      sender: "bot",
      text: `Hallo, ich bin der persönliche Chatbot von ${name}. Frag mich etwas!`,
    },
    { sender: "user", text: "Welche Sprachen kann er?" },
    { sender: "bot", text: "Python, JavaScript" },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-lg shadow ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto text-right"
                : "bg-gray-200 text-black self-start mr-auto text-left"
            } w-fit max-w-[85%] break-words`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form className="p-4 border-t border-gray-300 bg-gray-50">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <textarea
            rows={1}
            placeholder="Schreibe eine Nachricht..."
            className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Absenden
          </button>
        </div>
      </form>
    </div>
  );
}
