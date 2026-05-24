// src/data/data.js
import { LayoutDashboard, Globe, User, Settings } from "lucide-react";

export const TEMPLATES = [
  {
    id: 1,
    name: "NexaDash",
    category: "Dashboard",
    desc: "Analytics dashboard with dark mode",
    stack: ["React", "Tailwind CSS"],
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    icon: LayoutDashboard,
    color: "#7c3aed",
  },
  {
    id: 2,
    name: "LaunchKit",
    category: "Landing Page",
    desc: "SaaS landing page template",
    stack: ["React", "Tailwind CSS"],
    gradient: "from-cyan-500 via-blue-500 to-blue-700",
    icon: Globe,
    color: "#0ea5e9",
  },
  {
    id: 3,
    name: "FolioX",
    category: "Portfolio",
    desc: "Minimal developer portfolio",
    stack: ["React", "Tailwind CSS"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    icon: User,
    color: "#10b981",
  },
];

export const CATEGORIES = ["All", "Dashboard", "Landing Page", "Portfolio"];
export const STACK_COLORS = {
  React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Tailwind CSS": "bg-sky-500/10 text-sky-400 border-sky-500/20",
};