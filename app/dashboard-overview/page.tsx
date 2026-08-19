"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart, ArrowUpRight, ArrowDownRight, Calendar, Download, RefreshCw, Eye, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  completed: "#10B981",
  pending: "#F59E0B",
  failed: "#EF4444",
  refunded: "#6366F1",
};

const APP_NAME = "Dashboard";

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 48500, expenses: 31000 },
  { month: "Mar", revenue: 55200, expenses: 29500 },
  { month: "Apr", revenue: 51800, expenses: 33000 },
  { month: "May", revenue: 63400, expenses: 35000 },
  { month: "Jun", revenue: 71200, expenses: 38000 },
  { month: "Jul", revenue: 68900, expenses: 36500 },
  { month: "Aug", revenue: 79500, expenses: 41000 },
  { month: "Sep", revenue: 84200, expenses: 43500 },
  { month: "Oct", revenue: 91800, expenses: 46000 },
  { month: "Nov", revenue: 88400, expenses: 44000 },
  { month: "Dec", revenue: 97600, expenses: 49000 },
];

const USER_ACTIVITY = [
  { week: "W1", dau: 3200, wau: 8400, mau: 24000 },
  { week: "W2", dau: 3800, wau: 9100, mau: 25200 },
  { week: "W3", dau: 4100, wau: 9800, mau: 26100 },
  { week: "W4", dau: 3700, wau: 9400, mau: 25800 },
  { week: "W5", dau: 4500, wau: 10200, mau: 27400 },
  { week: "W6", dau: 4900, wau: 11000, mau: 28900 },
  { week: "W7", dau: 5200, wau: 11800, mau: 30100 },
  { week: "W8", dau: 5600, wau: 12400, mau: 31500 },
];

const CHANNEL_DATA = [
  { name: "Organic Search", value: 38, color: "#6366F1" },
  { name: "Direct", value: 24, color: "#22D3EE" },
  { name: "Referral", value: 18, color: "#10B981" },
  { name: "Social Media", value: 12, color: "#F59E0B" },
  { name: "Email", value: 8, color: "#EC4899" },
];

const RECENT_EVENTS = [
  {
    id: "evt-001",
    timestamp: "2 min ago",
    user: "sarah.chen@acme.com",
    eventType: "Subscription Upgrade",
    channel: "In-app",
    revenueImpact: 149,
    status: "completed" as const,
  },
  {
    id: "evt-002",
    timestamp: "8 min ago",
    user: "marcus.j@startup.io",
    eventType: "New Signup",
    channel: "Organic",
    revenueImpact: 49,
    status: "completed" as const,
  },
  {
    id: "evt-003",
    timestamp: "15 min ago",
    user: "priya.k@enterprise.co",
    eventType: "Payment Failed",
    channel: "Email",
    revenueImpact: null,
    status: "failed" as const,
  },
  {
    id: "evt-004",
    timestamp: "22 min ago",
    user: "tom.w@agency.net",
    eventType: "Plan Downgrade",
    channel: "Support",
    revenueImpact: -60,
    status: "completed" as const,
  },
  {
    id: "evt-005",
    timestamp: "31 min ago",
    user: "lisa.m@corp.com",
    eventType: "Refund Request",
    channel: "In-app",
    revenueImpact: -99,
    status: "pending" as const,
  },
  {
    id: "evt-006",
    timestamp: "45 min ago",
    user: "dev.team@techco.dev",
    eventType: "API Key Created",
    channel: "API",
    revenueImpact: null,
    status: "completed" as const,
  },
  {
    id: "evt-007",
    timestamp: "1 hr ago",
    user: "anna.b@media.org",
    eventType: "Subscription Upgrade",
    channel: "Referral",
    revenueImpact: 299,
    status: "completed" as const,
  },
];

const KPI_CARDS = [
  {
    label: "Monthly Revenue",
    value: "$97,600",
    trend: "+12.4%",
    trendDirection: "up" as const,
    icon: DollarSign,
    status: "growing" as const,
    sub: "vs $86,800 last month",
  },
  {
    label: "Active Users",
    value: "31,500",
    trend: "+8.7%",
    trendDirection: "up" as const,
    icon: Users,
    status: "healthy" as const,
    sub: "28,980 last period",
  },
  {
    label: "Avg. Session Time",
    value: "4m 38s",
    trend: "+2.1%",
    trendDirection: "up" as const,
    icon: Activity,
    status: "improving" as const,
    sub: "4m 32s last period",
  },
  {
    label: "Churn Rate",
    value: "2.3%",
    trend: "-0.4%",
    trendDirection: "down" as const,
    icon: ShoppingCart,
    status: "healthy" as const,
    sub: "2.7% last period",
  },
];

const QUICK_STATS = [
  { label: "New Trials Today", value: "142" },
  { label: "Conversions (30d)", value: "68.4%" },
  { label: "Support Tickets Open", value: "23" },
  { label: "Avg. Revenue / User", value: "$3.10" },
];

function StatusBadge({ status }: { status: string }) {
  const icons: Record<string, React.ReactNode> = {
    completed: <CheckCircle className="h-3.5 w-3.5" />,
    pending: <Clock className="h-3.5 w-3.5" />,
    failed: <XCircle className="h-3.5 w-3.5" />,
    refunded: <AlertCircle className="h-3.5 w-3.5" />,
  };
  const labels: Record<string, string> = {
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
    refunded: "Refunded",
  };
  const color = STATUS_COLORS[status] ?? "#94A3B8";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
    >
      {icons[status]}
      {labels[status] ?? status}
    </span>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
      <p className="mb-2 text-xs font-semibold text-[var(--muted-foreground)]">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-[var(--foreground)]">
            {entry.name}:{" "}
            <span className="font-semibold">
              {typeof entry.value === "number" && entry.name.toLowerCase().includes("revenue")
                ? `$${entry.value.toLocaleString("en-US")}`
                : entry.value.toLocaleString("en-US")}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardOverviewPage() {
  const t = useTranslations();
  const [dateRange, setDateRange] = useState("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Header */}
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
                {t("dashboardOverview.heading")}
              </h1>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {t("dashboardOverview.subheading")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)]">
                <Calendar className="h-4 w-4 text-[var(--muted-foreground)]" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-transparent text-sm outline-none cursor-pointer text-[var(--foreground)]"
                  aria-label="Date range"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="12m">Last 12 months</option>
                </select>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                Refresh
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </Reveal>

        {/* Quick Stats */}
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"
              >
                <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                <p className="mt-1 text-lg font-bold text-[var(--foreground)]">{stat.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* KPI Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {KPI_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={fadeInUp}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-[var(--muted)] p-2">
                    <Icon className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-xs font-medium",
                      card.trendDirection === "up" ? "text-emerald-500" : "text-rose-500"
                    )}
                  >
                    {card.trendDirection === "up" ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    {card.trend}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">{card.value}</p>
                <p className="mt-0.5 text-sm font-medium text-[var(--foreground)]">{card.label}</p>
                <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">{card.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Revenue Chart */}
        <Reveal>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-base font-semibold text-[var(--foreground)]">Revenue vs Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366F1" fill="url(#colorRevenue)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EC4899" fill="url(#colorExpenses)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        {/* User Activity + Channel Mix */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="mb-4 text-base font-semibold text-[var(--foreground)]">User Activity</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={USER_ACTIVITY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="dau" name="DAU" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="wau" name="WAU" fill="#22D3EE" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="mb-4 text-base font-semibold text-[var(--foreground)]">Channel Mix</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={CHANNEL_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {CHANNEL_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, "Share"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>

        {/* Recent Events Table */}
        <Reveal>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[var(--foreground)]">Recent Events</h2>
              <button className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                <Eye className="h-3.5 w-3.5" />
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-xs text-[var(--muted-foreground)]">
                    <th className="pb-2 text-left font-medium">User</th>
                    <th className="pb-2 text-left font-medium">Event</th>
                    <th className="pb-2 text-left font-medium">Channel</th>
                    <th className="pb-2 text-left font-medium">Impact</th>
                    <th className="pb-2 text-left font-medium">Status</th>
                    <th className="pb-2 text-right font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {RECENT_EVENTS.map((evt) => (
                    <tr key={evt.id} className="group">
                      <td className="py-3 text-[var(--foreground)] font-medium">{evt.user}</td>
                      <td className="py-3 text-[var(--muted-foreground)]">{evt.eventType}</td>
                      <td className="py-3 text-[var(--muted-foreground)]">{evt.channel}</td>
                      <td className="py-3">
                        {evt.revenueImpact !== null ? (
                          <span
                            className={cn(
                              "font-medium",
                              evt.revenueImpact > 0 ? "text-emerald-500" : "text-rose-500"
                            )}
                          >
                            {evt.revenueImpact > 0 ? "+" : ""}${Math.abs(evt.revenueImpact)}
                          </span>
                        ) : (
                          <span className="text-[var(--muted-foreground)]">—</span>
                        )}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={evt.status} />
                      </td>
                      <td className="py-3 text-right text-xs text-[var(--muted-foreground)]">
                        {evt.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Footer note */}
        <p className="text-center text-xs text-[var(--muted-foreground)]">
          {APP_NAME} &mdash; All data is illustrative
        </p>

      </div>
    </main>
  );
}
