"use client";

import { useState, useEffect } from "react";
import styles from "./DemoSection.module.css";
import Image from "next/image";
import { employeesData } from "@/lib/ai/employees";
import { useWorkforce } from "@/context/WorkforceContext";

export default function DemoSection() {
  const { activeDemoEmployeeId, setActiveDemoEmployee, incrementConversations } = useWorkforce();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const activeEmployee = employeesData.find(e => e.id === activeDemoEmployeeId) || employeesData[0];

  // Reset chat when employee changes
  // Reset chat when employee changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMessages([]);
    setIsTyping(false);
    setInput("");
  }, [activeEmployee.id]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput("");
    setIsTyping(true);
    incrementConversations();

    // Simulate typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `I'm ${activeEmployee.name}. Since I'm currently running in demo mode, I can't process that exact request, but normally I would execute workflows related to ${activeEmployee.capabilities.join(' and ')}.`
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="demos" className={styles.section} aria-labelledby="demo-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="demo-title">Try them in action.</h2>
          <p>Click on any employee to see a live demo of how they interact with customers.</p>
        </div>

        <div className={styles.demoTabs}>
          {employeesData.map(emp => (
            <button
              key={emp.id}
              className={activeDemoEmployeeId === emp.id ? styles.activeTab : styles.tab}
              onClick={() => setActiveDemoEmployee(emp.id)}
            >
              {emp.name}
            </button>
          ))}
        </div>

        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <div className={styles.chatAvatar}>
              <Image src={activeEmployee.avatar} alt={activeEmployee.name} width={40} height={40} className={styles.avatarImg} />
            </div>
            <div className={styles.chatInfo}>
              <strong>{activeEmployee.name}</strong>
              <span>{activeEmployee.role}</span>
            </div>
            <div className={styles.chatStatus}>
              <span className={styles.statusDot}></span> {activeEmployee.status.toUpperCase()}
            </div>
          </div>

          <div className={styles.chatMessages}>
            <div className={styles.messageBubble}>
              {activeEmployee.greeting}
            </div>

            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === 'user' ? styles.userBubble : styles.messageBubble}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className={styles.messageBubble}>
                <span className={styles.typingIndicator}>...</span>
              </div>
            )}
          </div>

          <form className={styles.chatInput} onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={!input.trim() || isTyping}>Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}
