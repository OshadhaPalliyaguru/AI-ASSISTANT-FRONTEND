"use client";

import { useState } from "react";

import { chatService } from "@/service/chat.service";

export default function ChatApp() {

  const [messages, setMessages] = useState([
    { role: "AI", content: "Ado machan! I'm your Enterprise AI. What's on your mind today?" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

   
    const newUserMsg = { role: "USER", content: inputText };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputText(""); 
    setIsLoading(true);

    try {
    
      const aiResponse = await chatService.sendUserMessage(1, newUserMsg.content); 
      
      
      setMessages((prev) => [...prev, { role: "AI", content: aiResponse.content }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { role: "AI", content: "Oops! Backend eka connect une na. Spring Boot server eka UP da balapan machan." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="p-5 border-b border-gray-700 bg-gray-800 text-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wider text-blue-400">AI Assistant Pro</h1>
      </header>

      {/* Chat Messages Area */}
      <main className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "USER" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`max-w-[75%] p-4 rounded-xl shadow-lg ${
                msg.role === "USER" 
                  ? "bg-blue-600 text-white rounded-br-none" 
                  : "bg-gray-700 text-gray-200 rounded-bl-none"
              }`}
            >
              <p className="text-sm font-semibold mb-1 opacity-75">
                {msg.role === "USER" ? "You" : "AI Engine"}
              </p>
              <p className="leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {/* Loading Spinner / Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 p-4 rounded-xl rounded-bl-none shadow-lg flex space-x-2 items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="p-5 bg-gray-800 border-t border-gray-700 flex items-center gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message here..."
          className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </footer>
    </div>
  );
}