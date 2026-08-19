"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
type APP_NAME = any;
const APP_NAME: any = [];
type APP_TAGLINE = any;
const APP_TAGLINE: any = [];
type CHART_COLORS = any;
const CHART_COLORS: any = [];
type STATUS_COLORS = any;
const STATUS_COLORS: any = [];
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
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
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowRight, BarChart as BarChartIcon, Star, Check, Zap, Shield, Globe } from 'lucide-react';
import Link from "next/link";

// ─── Inline mock data ────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "98.7%", label: "Uptime SLA" },
  { value: "4.2B", label: "Events tracked" },
  { value: "12ms", label: "Avg latency" },
  { value: "340+", label: "Integrations" },
];

const KPI_CARDS = [
  {
    label: "Monthly Revenue",
    value: "$284,920",
    trend: "+18.4%",
    trendDirection: "up" as const,
    icon: DollarSign,
    status: "growing" as const,
  },
  {
    label: "Active Users",
    value: "47,382",
    trend: "+9.2%",
    trendDirection: "up" as const,
    icon: Users,
    status: "healthy" as const,
  },
  {
    label: "Churn Rate",
    value: "1.8%",
    trend: "-0.4%",
    trendDirection: "down" as const,
    icon: Activity,
    status: "improving" as const,
  },
  {
    label: "Avg. Session",
    value: "8m 42s",
    trend: "+1m 12s",
    trendDirection: "up" as const,
    icon: BarChartIcon,
    status: "on-track" as const,
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 148000 },
  { month: "Feb", revenue: 162000 },
  { month: "Mar", revenue: 155000 },
  { month: "Apr", revenue: 178000 },
  { month: "May", revenue: 192000 },
  { month: "Jun", revenue: 210000 },
  { month: "Jul", revenue: 224000 },
  { month: "Aug", revenue: 238000 },
  { month: "Sep", revenue: 251000 },
  { month: "Oct", revenue: 268000 },
  { month: "Nov", revenue: 275000 },
  { month: "Dec", revenue: 284920 },
];

const CHANNEL_DATA = [
  { name: "Organic", value: 42, percentage: 42 },
  { name: "Paid", value: 28, percentage: 28 },
  { name: "Referral", value: 18, percentage: 18 },
  { name: "Direct", value: 12, percentage: 12 },
];

const CHANNEL_COLORS = ["#6366F1", "#22D3EE", "#10B981", "#F59E0B"];

const RECENT_EVENTS = [
  {
    id: "e1",
    user: "sarah.chen@acme.com",
    event: "Subscription upgraded",
    channel: "In-app",
    impact: "+$299",
    status: "completed" as const,
    time: "2m ago",
  },
  {
    id: "e2",
    user: "james.k@nova.io",
    event: "Trial started",
    channel: "Organic",
    impact: null,
    status: "pending" as const,
    time: "14m ago",
  },
  {
    id: "e3",
    user: "priya.m@loop.co",
    event: "Payment processed",
    channel: "Stripe",
    impact: "+$149",
    status: "completed" as const,
    time: "31m ago",
  },
  {
    id: "e4",
    user: "tom.r@drift.com",
    event: "Subscription cancelled",
    channel: "Email",
    impact: "-$99",
    status: "failed" as const,
    time: "1h ago",
  },
  {
    id: "e5",
    user: "ana.v@pulse.ai",
    event: "Feature unlocked",
    channel: "In-app",
    impact: null,
    status: "completed" as const,
    time: "2h ago",
  },
];

const FEATURES = [
  {
    icon: BarChartIcon,
    title: "Real-time analytics",
    desc: "Watch your metrics update live. No refresh needed, no stale data, no guessing.",
  },
  {
    icon: Zap,
    title: "Instant alerts",
    desc: "Set thresholds on any metric and get notified the moment something shifts.",
  },
  {
    icon: Globe,
    title: "340+ integrations",
    desc: "Connect Stripe, Segment, HubSpot, Salesforce, and hundreds more in minutes.",
  },
  {
    icon: Shield,
    title: "SOC 2 Type II",
    desc: "Enterprise-grade security with end-to-end encryption and full audit trails.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Rao replaced four separate tools. Our team finally has one place to see what's actually happening.",
    author: "Mia Tanaka",
    role: "Head of Growth, Luma",
    avatar: "/images/mia-tanaka-growth-lead.jpg",
    stars: 5,
  },
  {
    quote:
      "The revenue chart alone saved us from a bad pricing decision. We saw the drop in real time.",
    author: "Carlos Reyes",
    role: "CEO, Fieldwork",
    avatar: "/images/carlos-reyes-ceo-fieldwork.jpg",
    stars: 5,
  },
  {
    quote:
      "Setup took 20 minutes. We were looking at live data before the end of the sprint.",
    author: "Priya Nair",
    role: "Engineering Lead, Orbit",
    avatar: "/images/priya-nair-engineering-lead.jpg",
    stars: 5,
  },
];

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    desc: "For small teams getting started with data-driven decisions.",
    features: [
      "Up to 5 team members",
      "10M events/month",
      "30-day data retention",
      "Core dashboards",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    desc: "For scaling teams that need deeper insight and more control.",
    features: [
      "Up to 25 team members",
      "100M events/month",
      "1-year data retention",
      "Custom dashboards",
      "Slack + email alerts",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations with advanced security and compliance needs.",
    features: [
      "Unlimited team members",
      "Unlimited events",
      "Unlimited retention",
      "SSO + SCIM",
      "SOC 2 reports",
      "Dedicated CSM",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KPICard({
  card,
  delay,
}: {
  card: (typeof KPI_CARDS)[number];
  delay: number;
}) {
  const Icon = card.icon;
  const isUp = card.trendDirection === "up";
  const statusColor = STATUS_COLORS[card.status] ?? "#6366F1";

  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
      >
        <div
          className="absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-10"
          style={{ background: statusColor }}
        />
        <div className="flex items-start justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${statusColor}22` }}
          >
            <Icon className="h-5 w-5" style={{ color: statusColor }} />
          </div>
          <span
            className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
            style={{
              background: `${statusColor}18`,
              color: statusColor,
            }}
          >
            {isUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {card.trend}
          </span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            {card.value}
          </div>
          <div className="mt-0.5 text-sm text-[hsl(var(--muted-foreground))]">
            {card.label}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? "#94A3B8";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
      style={{ background: `${color}18`, color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
      {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* ── Hero ── */}
      <Reveal>
        <section
          id="hero"
          className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[600px] w-[900px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left: copy */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeInUp}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {t("hero.badge")}
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="mt-5 text-5xl font-bold tracking-tight text-[hsl(var(--foreground))] lg:text-6xl"
                >
                  {t("hero.headline1")}
                  <span className="block text-[var(--accent)]">
                    {t("hero.headline2")}
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="mt-5 max-w-lg text-lg leading-relaxed text-[hsl(var(--muted-foreground))]"
                >
                  {t("hero.subhead")}
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <Link
                    href="/analytics"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[hsl(var(--background))] transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {t("hero.cta.primary")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/reports"
                    className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-3 text-sm font-semibold text-[hsl(var(--foreground))] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {t("hero.cta.secondary")}
                  </Link>
                </motion.div>

                {/* Hero stats */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
                >
                  {HERO_STATS.map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl font-bold text-[hsl(var(--foreground))]">
                        {s.value}
                      </div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: mini dashboard preview */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_64px_-16px_rgba(0,0,0,0.2)]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      {t("hero.chart.title")}
                    </span>
                    <span className="rounded-full bg-[var(--accent)] bg-opacity-10 px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                      {t("hero.chart.badge")}
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={REVENUE_DATA}>
                      <defs>
                        <linearGradient
                          id="heroGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366F1"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366F1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{
                          fontSize: 10,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                        formatter={(v: number) =>
                          [`$${(v / 1000).toFixed(0)}k`, "Revenue"]
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366F1"
                        strokeWidth={2}
                        fill="url(#heroGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  {/* Mini KPI row */}
                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[hsl(var(--border))] pt-4">
                    {[
                      { label: "MRR", value: "$284k" },
                      { label: "Users", value: "47.4k" },
                      { label: "Churn", value: "1.8%" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-base font-bold text-[hsl(var(--foreground))]">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-[hsl(var(--muted-foreground))]">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-[hsl(var(--foreground))]">
                      {t("hero.live")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── KPI Cards ── */}
      <section id="kpis" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KPI_CARDS.map((card, i) => (
              <KPICard key={card.label} card={card} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Analytics Preview ── */}
      <Reveal>
        <section
          id="analytics"
          className="px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                {t("analytics.heading")}
              </h2>
              <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                {t("analytics.subhead")}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Revenue area chart — 2/3 width */}
              <div className="lg:col-span-2 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      {t("analytics.revenue.title")}
                    </div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">
                      {t("analytics.revenue.sub")}
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    +18.4%
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={REVENUE_DATA}>
                    <defs>
                      <linearGradient
                        id="revGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6366F1"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6366F1"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 11,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fontSize: 11,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${v / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [
                        `$${(v / 1000).toFixed(0)}k`,
                        "Revenue",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366F1"
                      strokeWidth={2.5}
                      fill="url(#revGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Donut — 1/3 width */}
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-[hsl(var(--foreground))]">
                    {t("analytics.channels.title")}
                  </div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">
                    {t("analytics.channels.sub")}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={CHANNEL_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {CHANNEL_DATA.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [`${v}%`, "Share"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-2">
                  {CHANNEL_DATA.map((ch, i) => (
                    <div
                      key={ch.name}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background:
                              CHANNEL_COLORS[i % CHANNEL_COLORS.length],
                          }}
                        />
                        <span className="text-[hsl(var(--muted-foreground))]">
                          {ch.name}
                        </span>
                      </div>
                      <span className="font-medium text-[hsl(var(--foreground))]">
                        {ch.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Recent Events Table ── */}
      <Reveal>
        <section id="events" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                  {t("events.heading")}
                </h2>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  {t("events.subhead")}
                </p>
              </div>
              <Link
                href="/analytics"
                className="flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
              >
                {t("events.viewAll")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <table className="w-full text-sm">
                <thead className="border-b border-[hsl(var(--border))]">
                  <tr>
                    {[
                      t("events.col.user"),
                      t("events.col.event"),
                      t("events.col.channel"),
                      t("events.col.impact"),
                      t("events.col.status"),
                      t("events.col.time"),
                    ].map((col) => (
                      <th
                        key={col}
                        className="p-4 text-left text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {RECENT_EVENTS.map((row) => (
                    <tr
                      key={row.id}
                      className="transition-colors hover:bg-[hsl(var(--muted))/0.4]"
                    >
                      <td className="p-4 font-medium text-[hsl(var(--foreground))]">
                        {row.user}
                      </td>
                      <td className="p-4 text-[hsl(var(--muted-foreground))]">
                        {row.event}
                      </td>
                      <td className="p-4 text-[hsl(var(--muted-foreground))]">
                        {row.channel}
                      </td>
                      <td className="p-4">
                        {row.impact ? (
                          <span
                            className={
                              row.impact.startsWith("+")
                                ? "font-medium text-emerald-400"
                                : "font-medium text-red-400"
                            }
                          >
                            {row.impact}
                          </span>
                        ) : (
                          <span className="text-[hsl(var(--muted-foreground))]">
                            —
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="p-4 text-[hsl(var(--muted-foreground))]">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Features ── */}
      <Reveal>
        <section
          id="features"
          className="px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] lg:text-4xl">
                {t("features.heading")}
              </h2>
              <p className="mt-3 text-lg text-[hsl(var(--muted-foreground))]">
                {t("features.subhead")}
              </p>
            </div>

            {/* Asymmetric bento grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Reveal key={f.title} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-[var(--accent)]/40"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 transition-colors group-hover:bg-[var(--accent)]/20">
                        <Icon className="h-5 w-5 text-[var(--accent)]" />
                      </div>
                      <h3 className="mb-2 font-semibold text-[hsl(var(--foreground))]">
                        {f.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {f.desc}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials ── */}
      <Reveal>
        <section
          id="testimonials"
          className="px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                {t("testimonials.heading")}
              </h2>
              <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                {t("testimonials.subhead")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t_, i) => (
                <Reveal key={t_.author} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
                  >
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t_.stars }).map((_, si) => (
                        <Star
                          key={si}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-[hsl(var(--foreground))]">
                      &ldquo;{t_.quote}&rdquo;
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <img
                        src={t_.avatar}
                        alt={t_.author}
                        className="h-9 w-9 rounded-full object-cover ring-1 ring-[hsl(var(--border))]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(t_.author)}&background=6366F1&color=fff&size=36`;
                        }}
                      />
                      <div>
                        <div className="text-sm font-semibold text-[hsl(var(--foreground))]">
                          {t_.author}
                        </div>
                        <div className="text-xs text-[hsl(var(--muted-foreground))]">
                          {t_.role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Pricing ── */}
      <Reveal>
        <section
          id="pricing"
          className="px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                {t("pricing.heading")}
              </h2>
              <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                {t("pricing.subhead")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {PRICING_TIERS.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`relative flex flex-col rounded-2xl border p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] ${
                      tier.highlighted
                        ? "border-[var(--accent)] bg-[var(--accent)]/5"
                        : "border-[hsl(var(--border))] bg-[hsl(var(--card))]"
                    }`}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-[var(--accent)] px-3 py-0.5 text-xs font-semibold text-white">
                          {t("pricing.popular")}
                        </span>
                      </div>
                    )}
                    <div className="mb-1 text-base font-semibold text-[hsl(var(--foreground))]">
                      {tier.name}
                    </div>
                    <div className="mb-2 flex items-end gap-1">
                      <span className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="mb-1 text-sm text-[hsl(var(--muted-foreground))]">
                          {tier.period}
                        </span>
                      )}
                    </div>
                    <p className="mb-6 text-sm text-[hsl(var(--muted-foreground))]">
                      {tier.desc}
                    </p>
                    <ul className="mb-8 flex-1 space-y-2.5">
                      {tier.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/settings"
                      className={`block rounded-xl px-5 py-2.5 text-center text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                        tier.highlighted
                          ? "bg-[var(--accent)] text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                          : "border border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA Banner ── */}
      <Reveal>
        <section id="cta" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent)]/8 p-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_64px_-16px_rgba(99,102,241,0.2)]">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-64 w-96 rounded-full bg-[var(--accent)] opacity-10 blur-[80px]" />
              </div>
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] lg:text-4xl">
                  {t("cta.heading")}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-[hsl(var(--muted-foreground))]">
                  {t("cta.subhead")}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/analytics"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {t("cta.primary")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/reports"
                    className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-7 py-3 text-sm font-semibold text-[hsl(var(--foreground))] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {t("cta.secondary")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}