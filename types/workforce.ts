import { LucideIcon } from "lucide-react";

export interface WorkforceMember {
  id: string;
  title: string;
  description: string;
  status: "Online" | "Offline";
  featured: boolean;
  icon: LucideIcon;
  skills: string[];
  cta: string;
}