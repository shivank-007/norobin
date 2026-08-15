export type AIEmployee = {
  id: string;
  name: string;
  role: string;
  description: string;
  status: "online" | "ready" | "busy" | "offline";
  capabilities: string[];
  avatar: string;
  greeting: string;
  tags: string[]; // for matching in selector
};

export const employeesData: AIEmployee[] = [
  {
    id: "maya",
    name: "Maya",
    role: "Customer Success",
    description: "Handles inquiries, onboarding, and general support.",
    status: "online",
    avatar: "/avatars/maya.png",
    capabilities: ["Answer FAQs", "Process Refunds", "Book Demos"],
    greeting: "Hi! I'm Maya. I handle customer success at Norobin. I can help you with pricing, booking a demo, or answering general questions.",
    tags: ["Customer Support", "Follow-ups"]
  },
  {
    id: "alex",
    name: "Alex",
    role: "Sales Employee",
    description: "Qualifies leads and books meetings automatically.",
    status: "ready",
    avatar: "/avatars/alex.png",
    capabilities: ["Lead Qualification", "Outreach", "CRM Sync"],
    greeting: "Hey there, I'm Alex! I can qualify leads and book meetings directly into your calendar. Want to see how it works?",
    tags: ["Sales", "Lead Qualification"]
  },
  {
    id: "aria",
    name: "Aria",
    role: "Front Desk",
    description: "Manages scheduling and incoming requests 24/7.",
    status: "online",
    avatar: "/avatars/aria.png",
    capabilities: ["Scheduling", "Call Routing", "Basic Q&A"],
    greeting: "Hello, Aria here! I answer calls and schedule appointments 24/7 so you never miss a lead.",
    tags: ["Appointments", "Voice Calls", "WhatsApp"]
  },
  {
    id: "nova",
    name: "Nova",
    role: "Operations",
    description: "Connects systems and automates back-office workflows.",
    status: "busy",
    avatar: "/avatars/nova.png",
    capabilities: ["Data Entry", "API Workflows", "Reporting"],
    greeting: "I'm Nova. I connect to your CRM, update records, and run background workflows automatically.",
    tags: ["Operations", "CRM Updates", "Other"]
  }
];

export const getEmployeeById = (id: string): AIEmployee | undefined => {
  return employeesData.find(e => e.id === id);
};

export const recommendEmployees = (selectedTags: string[]): AIEmployee[] => {
  if (selectedTags.length === 0) return [employeesData[0]]; // Default Maya
  
  const matches = employeesData.map(emp => {
    const matchCount = emp.tags.filter(tag => selectedTags.includes(tag)).length;
    return { emp, matchCount };
  });
  
  // Sort by highest match
  matches.sort((a, b) => b.matchCount - a.matchCount);
  
  // Return ones that matched at least one, or default to highest
  const bestMatches = matches.filter(m => m.matchCount > 0).map(m => m.emp);
  
  return bestMatches.length > 0 ? bestMatches : [employeesData[0]];
};
