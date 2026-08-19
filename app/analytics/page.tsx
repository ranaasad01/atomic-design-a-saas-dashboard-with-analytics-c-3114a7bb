"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Users, MousePointerClick, RefreshCw } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/motion";

type DateRangeKey = "7d" | "30d" | "90d" | "12m" | "custom";

// ─── Mock data ─────────────────────────────────────────────────────────────────────────────

const MONTHLY_BAR_DATA: Record<DateRangeKey, { month: string; thisYear: number; lastYear: number }[]> = {
  "7d": [
    { month: "Mon", thisYear: 42000, lastYear: 31000 },
    { month: "Tue", thisYear: 55000, lastYear: 38000 },
    { month: "Wed", thisYear: 48000, lastYear: 41000 },
    { month: "Thu", thisYear: 61000, lastYear: 44000 },
    { month: "Fri", thisYear: 73000, lastYear: 52000 },
    { month: "Sat", thisYear: 39000, lastYear: 29000 },
    { month: "Sun", thisYear: 34000, lastYear: 25000 },
  ],
  "30d": [
    { month: "Week 1", thisYear: 182000, lastYear: 141000 },
    { month: "Week 2", thisYear: 214000, lastYear: 168000 },
    { month: "Week 3", thisYear: 198000, lastYear: 155000 },
    { month: "Week 4", thisYear: 241000, lastYear: 189000 },
  ],
  "90d": [
    { month: "Jan", thisYear: 620000, lastYear: 480000 },
    { month: "Feb", thisYear: 710000, lastYear: 530000 },
    { month: "Mar", thisYear: 680000, lastYear: 510000 },
  ],
  "12m": [
    { month: "Jan", thisYear: 620000, lastYear: 480000 },
    { month: "Feb", thisYear: 710000, lastYear: 530000 },
    { month: "Mar", thisYear: 680000, lastYear: 510000 },
    { month: "Apr", thisYear: 740000, lastYear: 560000 },
    { month: "May", thisYear: 820000, lastYear: 610000 },
    { month: "Jun", thisYear: 890000, lastYear: 650000 },
    { month: "Jul", thisYear: 950000, lastYear: 700000 },
    { month: "Aug", thisYear: 1020000, lastYear: 760000 },
    { month: "Sep", thisYear: 980000, lastYear: 730000 },
    { month: "Oct", thisYear: 1100000, lastYear: 810000 },
    { month: "Nov", thisYear: 1240000, lastYear: 890000 },
    { month: "Dec", thisYear: 1380000, lastYear: 960000 },
  ],
  custom: [
    { month: "Jan", thisYear: 620000, lastYear: 480000 },
    { month: "Feb", thisYear: 710000, lastYear: 530000 },
    { month: "Mar", thisYear: 680000, lastYear: 510000 },
  ],
};

const TRAFFIC_DATA: Record<DateRangeKey, { week: string; visitors: number; dau: number; sessions: number }[]> = {
  "7d": [
    { week: "Mon", visitors: 3200, dau: 2100, sessions: 4800 },
    { week: "Tue", visitors: 4100, dau: 2800, sessions: 6200 },
    { week: "Wed", visitors: 3800, dau: 2500, sessions: 5700 },
    { week: "Thu", visitors: 4600, dau: 3100, sessions: 6900 },
    { week: "Fri", visitors: 5200, dau: 3600, sessions: 7800 },
    { week: "Sat", visitors: 2900, dau: 1900, sessions: 4300 },
    { week: "Sun", visitors: 2400, dau: 1600, sessions: 3600 },
  ],
  "30d": [
    { week: "Week 1", visitors: 18200, dau: 12400, sessions: 27300 },
    { week: "Week 2", visitors: 21400, dau: 14600, sessions: 32100 },
    { week: "Week 3", visitors: 19800, dau: 13500, sessions: 29700 },
    { week: "Week 4", visitors: 24100, dau: 16400, sessions: 36200 },
  ],
  "90d": [
    { week: "Jan", visitors: 72000, dau: 49000, sessions: 108000 },
    { week: "Feb", visitors: 84000, dau: 57000, sessions: 126000 },
    { week: "Mar", visitors: 91000, dau: 62000, sessions: 137000 },
  ],
  "12m": [
    { week: "Jan", visitors: 72000, dau: 49000, sessions: 108000 },
    { week: "Feb", visitors: 84000, dau: 57000, sessions: 126000 },
    { week: "Mar", visitors: 91000, dau: 62000, sessions: 137000 },
    { week: "Apr", visitors: 98000, dau: 67000, sessions: 147000 },
    { week: "May", visitors: 112000, dau: 76000, sessions: 168000 },
    { week: "Jun", visitors: 124000, dau: 85000, sessions: 186000 },
    { week: "Jul", visitors: 138000, dau: 94000, sessions: 207000 },
    { week: "Aug", visitors: 151000, dau: 103000, sessions: 227000 },
    { week: "Sep", visitors: 143000, dau: 97000, sessions: 215000 },
    { week: "Oct", visitors: 162000, dau: 110000, sessions: 243000 },
    { week: "Nov", visitors: 178000, dau: 121000, sessions: 267000 },
    { week: "Dec", visitors: 195000, dau: 133000, sessions: 293000 },
  ],
  custom: [
    { week: "Jan", visitors: 72000, dau: 49000, sessions: 108000 },
    { week: "Feb", visitors: 84000, dau: 57000, sessions: 126000 },
    { week: "Mar", visitors: 91000, dau: 62000, sessions: 137000 },
  ],
};

const DONUT_DATA = [
  { name: "Organic Search", value: 42800, percentage: 38 },
  { name: "Direct", value: 28400, percentage: 25 },
  { name: "Referral", value: 19700, percentage: 17 },
  { name: "Social Media", value: 14200, percentage: 13 },
  { name: "Email", value: 7900, percentage: 7 },
];

const DONUT_COLORS = ["#6366F1", "#22D3EE", "#10B981", "#F59E0B", "#EC4899"];

const CONVERSION_DATA: Record<DateRangeKey, { week: string; rate: number; leads: number; signups: number }[]> = {
  "7d": [
    { week: "Mon", rate: 2.1, leads: 142, signups: 31 },
    { week: "Tue", rate: 2.8, leads: 198, signups: 44 },
    { week: "Wed", rate: 2.4, leads: 171, signups: 38 },
    { week: "Thu", rate: 3.1, leads: 224, signups: 52 },
    { week: "Fri", rate: 3.6, leads: 267, signups: 61 },
    { week: "Sat", rate: 1.9, leads: 118, signups: 27 },
    { week: "Sun", rate: 1.6, leads: 98, signups: 22 },
  ],
  "30d": [
    { week: "Week 1", rate: 2.4, leads: 820, signups: 184 },
    { week: "Week 2", rate: 2.9, leads: 1040, signups: 231 },
    { week: "Week 3", rate: 2.7, leads: 960, signups: 214 },
    { week: "Week 4", rate: 3.2, leads: 1180, signups: 263 },
  ],
  "90d": [
    { week: "Jan", rate: 2.6, leads: 3800, signups: 840 },
    { week: "Feb", rate: 2.9, leads: 4200, signups: 930 },
    { week: "Mar", rate: 3.1, leads: 4600, signups: 1020 },
  ],
  "12m": [
    { week: "Jan", rate: 2.1, leads: 3200, signups: 710 },
    { week: "Feb", rate: 2.3, leads: 3600, signups: 800 },
    { week: "Mar", rate: 2.6, leads: 3800, signups: 840 },
    { week: "Apr", rate: 2.8, leads: 4100, signups: 910 },
    { week: "May", rate: 2.9, leads: 4200, signups: 930 },
    { week: "Jun", rate: 3.1, leads: 4600, signups: 1020 },
    { week: "Jul", rate: 3.3, leads: 4900, signups: 1090 },
    { week: "Aug", rate: 3.5, leads: 5200, signups: 1160 },
    { week: "Sep", rate: 3.2, leads: 4800, signups: 1070 },
    { week: "Oct", rate: 3.6, leads: 5500, signups: 1230 },
    { week: "Nov", rate: 3.8, leads: 5900, signups: 1320 },
    { week: "Dec", rate: 4.1, leads: 6400, signups: 1430 },
  ],
  custom: [
    { week: "Jan", rate: 2.6, leads: 3800, signups: 840 },
    { week: "Feb", rate: 2.9, leads: 4200, signups: 930 },
    { week: "Mar", rate: 3.1, leads: 4600, signups: 1020 },
  ],
};

const SUMMARY_STATS: Record<DateRangeKey, { label: string; value: string; change: string; up: boolean; icon: string }[]> = {
  "7d": [
    { label: "Total Visitors", value: "26,200", change: "+14.2%", up: true, icon: "users" },
    { label: "Avg. Session", value: "4m 38s", change: "+8.1%", up: true, icon: "activity" },
    { label: "Bounce Rate", value: "34.7%", change: "-3.2%", up: false, icon: "click" },
    { label: "Conversions", value: "275", change: "+21.4%", up: true, icon: "trending" },
  ],
  "30d": [
    { label: "Total Visitors", value: "83,500", change: "+18.6%", up: true, icon: "users" },
    { label: "Avg. Session", value: "4m 52s", change: "+11.3%", up: true, icon: "activity" },
    { label: "Bounce Rate", value: "32.1%", change: "-5.8%", up: false, icon: "click" },
    { label: "Conversions", value: "892", change: "+29.7%", up: true, icon: "trending" },
  ],
  "90d": [
    { label: "Total Visitors", value: "247,000", change: "+22.4%", up: true, icon: "users" },
    { label: "Avg. Session", value: "5m 04s", change: "+14.7%", up: true, icon: "activity" },
    { label: "Bounce Rate", value: "30.4%", change: "-8.1%", up: false, icon: "click" },
    { label: "Conversions", value: "2,790", change: "+35.2%", up: true, icon: "trending" },
  ],
  "12m": [
    { label: "Total Visitors", value: "1,429,000", change: "+31.8%", up: true, icon: "users" },
    { label: "Avg. Session", value: "5m 18s", change: "+19.2%", up: true, icon: "activity" },
    { label: "Bounce Rate", value: "28.9%", change: "-12.4%", up: false, icon: "click" },
    { label: "Conversions", value: "12,520", change: "+48.6%", up: true, icon: "trending" },
  ],
  custom: [
    { label: "Total Visitors", value: "247,000", change: "+22.4%", up: true, icon: "users" },
    { label: "Avg. Session", value: "5m 04s", change: "+14.7%", up: true, icon: "activity" },
    { label: "Bounce Rate", value: "30.4%", change: "-8.1%", up: false, icon: "click" },
    { label: "Conversions", value: "2,790", change: "+35.2%", up: true, icon: "trending" },
  ],
};

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
              {typeof entry.value === "number"
                ? entry.value.toLocaleString("en-US")
                : entry.value}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

function StatIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "users": return <Users className="h-5 w-5" />;
    case "activity": return <Activity className="h-5 w-5" />;
    case "click": return <MousePointerClick className="h-5 w-5" />;
    case "trending": return <TrendingUp className="h-5 w-5" />;
    default: return <Activity className="h-5 w-5" />;
  }
}

export default function AnalyticsPage() {
  const t = useTranslations();
  const [dateRange, setDateRange] = useState<DateRangeKey>("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const barData = MONTHLY_BAR_DATA[dateRange];
  const trafficData = TRAFFIC_DATA[dateRange];
  const conversionData = CONVERSION_DATA[dateRange];
  const summaryStats = SUMMARY_STATS[dateRange];

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Header */}
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
                Analytics
              </h1>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Track performance across all your key metrics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)]">
                <Calendar className="h-4 w-4 text-[var(--muted-foreground)]" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as DateRangeKey)}
                  className="bg-transparent text-sm outline-none cursor-pointer text-[var(--foreground)]"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="12m">Last 12 months</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                Refresh
              </button>
            </div>
          </div>
        </Reveal>

        {/* Summary Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {summaryStats.map((stat: { label: string; value: string; change: string; up: boolean; icon: string }, i: number) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-[var(--muted)] p-2 text-[var(--muted-foreground)]">
                  <StatIcon icon={stat.icon} />
                </div>
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    stat.up ? "text-emerald-500" : "text-rose-500"
                  )}
                >
                  {stat.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {stat.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
              <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bar Chart */}
        <Reveal>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-base font-semibold text-[var(--foreground)]">Revenue Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="thisYear" name="This Year" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lastYear" name="Last Year" fill="#22D3EE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        {/* Traffic Chart */}
        <Reveal>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-base font-semibold text-[var(--foreground)]">Traffic Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="visitors" name="Visitors" stroke="#6366F1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="dau" name="DAU" stroke="#10B981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        {/* Donut + Conversion Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Donut */}
          <Reveal>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="mb-4 text-base font-semibold text-[var(--foreground)]">Traffic Sources</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={DONUT_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {DONUT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [value.toLocaleString("en-US"), "Visitors"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          {/* Conversion */}
          <Reveal>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="mb-4 text-base font-semibold text-[var(--foreground)]">Conversion Funnel</h2>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={conversionData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    name="Conv. Rate %"
                    stroke="#6366F1"
                    fill="url(#colorRate)"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="leads" name="Leads" stroke="#10B981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="signups" name="Signups" stroke="#F59E0B" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>

      </div>
    </main>
  );
}
