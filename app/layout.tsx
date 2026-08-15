import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "NOROBIN",
  description: "AI Employees for Modern Businesses",
};

import { ChatWidget } from "@/components/ui/chat-widget";
import { WorkforceProvider } from "@/context/WorkforceContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WorkforceProvider>
          {children}
          <ChatWidget />
        </WorkforceProvider>
      </body>
    </html>
  );
}

