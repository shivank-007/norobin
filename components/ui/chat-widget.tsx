"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatWidget.module.css";
import { MessageCircle, X, Send } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{id: string, role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Thanks for reaching out! I'm a simulated AI assistant for this demo. How can I help you today?"
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.widgetContainer}>
      <div className={`${styles.chatWindow} ${isOpen ? styles.open : ""}`}>
        <div className={styles.chatHeader}>
          <h3>
            <span className={styles.statusDot}></span>
            noro.ai
          </h3>
          <button type="button" className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close chat">
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={`${styles.message} ${styles.assistant}`}>
              Hi there! I&apos;m noro.ai. How can I help you learn more about Norobin today?
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.message} ${
                  m.role === "user" ? styles.user : styles.assistant
                }`}
              >
                {m.content}
              </div>
            ))
          )}
          {isLoading && (
            <div className={`${styles.message} ${styles.assistant}`}>
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            className={styles.inputField}
            value={input}
            placeholder="Ask me anything..."
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className={styles.sendButton} disabled={isLoading || !input.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>

      <button 
        type="button"
        className={styles.toggleButton} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
