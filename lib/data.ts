export const BRAND = {
  name: "Rao",
  tagline: "Your command center for every metric that matters.",
  email: "hello@raoapp.io",
  twitter: "https://twitter.com/raoapp",
  github: "https://github.com/raoapp",
} as const;

export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/", key: "dashboard" },
  { label: "Analytics", href: "/analytics", key: "analytics" },
  { label: "Reports", href: "/reports", key: "reports" },
  { label: "Settings", href: "/settings", key: "settings" },
];

export interface KPICardData {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
  status: "healthy" | "growing" | "improving" | "on-track" | "warning" | "critical";
  icon: string;
}

export interface QuickStat {
  label: string;
  value: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
}

export interface ActivityDataPoint {
  week: string;
  dau: number;
}

export interface BarDataPoint {
  month: string;
  thisYear: number;
  lastYear: number;
}

export interface DonutDataPoint {
  name: string;
  value: number;
  percentage: number;
}

export interface TrafficDataPoint {
  week: string;
  visitors: number;
  dau: number;
  sessions: number;
}

export interface TableRow {
  id: string;
  timestamp: string;
  user: string;
  eventType: string;
  channel: string;
  revenueImpact: string;
  status: "completed" | "pending" | "failed" | "refunded";
}

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  column: string;
  direction: SortDirection;
}