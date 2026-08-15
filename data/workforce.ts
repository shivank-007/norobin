import {
  BriefcaseBusiness,
  PhoneCall,
  Headset,
  Workflow,
} from "lucide-react";

import type { WorkforceMember } from "@/types/workforce";

export const workforce: WorkforceMember[] = [
  {
    id: "sales",
    title: "AI Sales Executive",
    description:
      "Qualifies leads, follows up automatically, books meetings, and keeps your CRM updated.",
    status: "Online",
    featured: true,
    icon: BriefcaseBusiness,
    skills: [
      "Lead Qualification",
      "CRM Sync",
      "Meeting Booking",
      "Email Follow-up",
    ],
    cta: "Try Sales Demo",
  },
  {
    id: "receptionist",
    title: "AI Receptionist",
    description:
      "Answers incoming calls, books appointments, and routes customers to the right team.",
    status: "Online",
    featured: false,
    icon: PhoneCall,
    skills: [
      "Voice Calls",
      "Appointment Booking",
      "Call Routing",
      "24/7 Availability",
    ],
    cta: "Call Receptionist",
  },
  {
    id: "support",
    title: "AI Customer Support",
    description:
      "Resolves customer questions instantly using your documentation and business knowledge.",
    status: "Online",
    featured: false,
    icon: Headset,
    skills: [
      "FAQ Resolution",
      "Order Tracking",
      "Knowledge Base",
      "Human Handoff",
    ],
    cta: "Chat with Support AI",
  },
  {
    id: "operations",
    title: "AI Operations Manager",
    description:
      "Automates repetitive internal workflows across your business tools and databases.",
    status: "Online",
    featured: false,
    icon: Workflow,
    skills: [
      "Workflow Automation",
      "CRM Updates",
      "Reporting",
      "Invoice Processing",
    ],
    cta: "See Workflow Demo",
  },
];