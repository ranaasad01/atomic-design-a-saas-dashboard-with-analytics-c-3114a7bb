"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Download, FileText, Printer, ChevronUp, ChevronDown, ArrowUpDown, Search, Filter, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Clock, AlertTriangle, Activity } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc" | null;
type SortKey =
  | "date"
  | "metric"
  | "category"
  | "value"
  | "change"
  | "status";

type ReportStatus = "healthy" | "growing" | "warning" | "critical" | "stable";

interface ReportRow {
  id: string;
  date: string;
  metric: string;
  category: string;
  value: number;
  unit: string;
  change: number;
  status: ReportStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const REPORT_DATA: ReportRow[] = [
  { id: "r01", date: "2024-06-01", metric: "Monthly Recurring Revenue", category: "Revenue", value: 128400, unit: "$", change: 12.4, status: "growing" },
  { id: "r02", date: "2024-06-01", metric: "Daily Active Users", category: "Engagement", value: 8921, unit: "", change: 5.2, status: "healthy" },
  { id: "r03", date: "2024-06-01", metric: "Churn Rate", category: "Retention", value: 2.1, unit: "%", change: -0.4, status: "healthy" },
  { id: "r04", date: "2024-06-01", metric: "Avg Session Duration", category: "Engagement", value: 4.7, unit: "min", change: 8.1, status: "growing" },
  { id: "r05", date: "2024-06-01", metric: "Support Ticket Volume", category: "Support", value: 342, unit: "", change: 18.3, status: "warning" },
  { id: "r06", date: "2024-05-01", metric: "Monthly Recurring Revenue", category: "Revenue", value: 114200, unit: "$", change: 9.7, status: "growing" },
  { id: "r07", date: "2024-05-01", metric: "Daily Active Users", category: "Engagement", value: 8480, unit: "", change: 3.1, status: "healthy" },
  { id: "r08", date: "2024-05-01", metric: "Churn Rate", category: "Retention", value: 2.5, unit: "%", change: 0.3, status: "warning" },
  { id: "r09", date: "2024-05-01", metric: "Avg Session Duration", category: "Engagement", value: 4.3, unit: "min", change: -1.2, status: "stable" },
  { id: "r10", date: "2024-05-01", metric: "Support Ticket Volume", category: "Support", value: 289, unit: "", change: -5.4, status: "healthy" },
  { id: "r11", date: "2024-04-01", metric: "Monthly Recurring Revenue", category: "Revenue", value: 104100, unit: "$", change: 7.2, status: "growing" },
  { id: "r12", date: "2024-04-01", metric: "Daily Active Users", category: "Engagement", value: 8220, unit: "", change: -1.8, status: "stable" },
  { id: "r13", date: "2024-04-01", metric: "Churn Rate", category: "Retention", value: 2.2, unit: "%", change: -0.6, status: "healthy" },
  { id: "r14", date: "2024-04-01", metric: "Conversion Rate", category: "Revenue", value: 3.8, unit: "%", change: 0.5, status: "growing" },
  { id: "r15", date: "2024-04-01", metric: "API Error Rate", category: "Infrastructure", value: 0.12, unit: "%", change: -0.08, status: "healthy" },
  { id: "r16", date: "2024-03-01", metric: "Monthly Recurring Revenue", category: "Revenue", value: 97100, unit: "$", change: 5.1, status: "growing" },
  { id: "r17", date: "2024-03-01", metric: "Daily Active Users", category: "Engagement", value: 8370, unit: "", change: 6.4, status: "growing" },
  { id: "r18", date: "2024-03-01", metric: "API Error Rate", category: "Infrastructure", value: 0.20, unit: "%", change: 0.09, status: "warning" },
  { id: "r19", date: "2024-03-01", metric: "Churn Rate", category: "Retention", value: 2.8, unit: "%", change: 0.7, status: "critical" },
  { id: "r20", date: "2024-03-01", metric: "Avg Session Duration", category: "Engagement", value: 4.5, unit: "min", change: 2.3, status: "healthy" },
  { id: "r21", date: "2024-02-01", metric: "Monthly Recurring Revenue", category: "Revenue", value: 92400, unit: "$", change: 4.8, status: "growing" },
  { id: "r22", date: "2024-02-01", metric: "Support Ticket Volume", category: "Support", value: 410, unit: "", change: 22.1, status: "critical" },
  { id: "r23", date: "2024-02-01", metric: "Conversion Rate", category: "Revenue", value: 3.3, unit: "%", change: -0.2, status: "stable" },
  { id: "r24", date: "2024-02-01", metric: "API Error Rate", category: "Infrastructure", value: 0.31, unit: "%", change: 0.19, status: "critical" },
  { id: "r25", date: "2024-02-01", metric: "Daily Active Users", category: "Engagement", value: 7870, unit: "", change: -2.1, status: "stable" },
  { id: "r26", date: "2024-01-01", metric: "Monthly Recurring Revenue", category: "Revenue", value: 88200, unit: "$", change: 3.9, status: "growing" },
  { id: "r27", date: "2024-01-01", metric: "Churn Rate", category: "Retention", value: 2.1, unit: "%", change: -0.3, status: "healthy" },
  { id: "r28", date: "2024-01-01", metric: "Avg Session Duration", category: "Engagement", value: 4.1, unit: "min", change: 1.0, status: "stable" },
  { id: "r29", date: "2024-01-01", metric: "Conversion Rate", category: "Revenue", value: 3.5, unit: "%", change: 0.3, status: "growing" },
  { id: "r30", date: "2024-01-01", metric: "Support Ticket Volume", category: "Support", value: 336, unit: "", change: 4.2, status: "stable" },
];

const CATEGORIES = ["All", ...Array.from(new Set(REPORT_DATA.map((r) => r.category)))] as const;
const PAGE_SIZE_OPTIONS = [10, 20, 30] as const;

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_META: Record<ReportStatus, { label: string; icon: React.ReactNode; classes: string }> = {
  healthy: {
    label: "Healthy",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  growing: {
    label: "Growing",
    icon: <Activity className="h-3.5 w-3.5" />,
    classes: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  warning: {
    label: "Warning",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  critical: {
    label: "Critical",
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    classes: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  stable: {
    label: "Stable",
    icon: <Clock className="h-3.5 w-3.5" />,
    classes: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  },
};

function StatusBadge({ status }: { status: ReportStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        meta.classes
      )}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ dir }: { dir: SortDir }) {
  if (dir === "asc") return <ChevronUp className="h-3.5 w-3.5 text-[var(--accent)]" />;
  if (dir === "desc") return <ChevronDown className="h-3.5 w-3.5 text-[var(--accent)]" />;
  return <ArrowUpDown className="h-3.5 w-3.5 opacity-30" />;
}

// ─── Format helpers ───────────────────────────────────────────────────────────

function formatValue(value: number, unit: string): string {
  if (unit === "$") {
    return `$${value >= 1000 ? (value / 1000).toFixed(1) + "K" : value}`;
  }
  if (unit === "%") return `${value}%`;
  if (unit === "min") return `${value} min`;
  return value.toLocaleString("en-US");
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ─── Export Actions ───────────────────────────────────────────────────────────

function ExportActions({ t }: { t: ReturnType<typeof useTranslations> }) {
  const handleExport = useCallback((type: string) => {
    // Mock export — in production this would trigger a real download
    console.log(`Exporting as ${type}`);
  }, []);

  const actions = [
    { key: "csv", label: t("reports.export.csv"), icon: <Download className="h-4 w-4" /> },
    { key: "pdf", label: t("reports.export.pdf"), icon: <FileText className="h-4 w-4" /> },
    { key: "print", label: t("reports.export.print"), icon: <Printer className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center gap-2">
      {actions.map((action) => (
        <motion.button
          key={action.key}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleExport(action.key)}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))]",
            "bg-[hsl(var(--card))] px-3.5 py-2 text-sm font-medium",
            "text-[hsl(var(--muted-foreground))] transition-all duration-200",
            "hover:border-[var(--accent)]/40 hover:text-[hsl(var(--foreground))]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
          )}
        >
          {action.icon}
          <span className="hidden sm:inline">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  totalRows: number;
  onPage: (p: number) => void;
  onPageSize: (s: number) => void;
  t: ReturnType<typeof useTranslations>;
}

function Pagination({ page, totalPages, pageSize, totalRows, onPage, onPageSize, t }: PaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRows);

  const pages = useMemo(() => {
    const arr: (number | "…")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (page > 3) arr.push("…");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) arr.push(i);
      if (page < totalPages - 2) arr.push("…");
      arr.push(totalPages);
    }
    return arr;
  }, [page, totalPages]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] px-6 py-4 sm:flex-row">
      <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
        <span>
          {t("reports.pagination.showing", { start, end, total: totalRows })}
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSize(Number(e.target.value))}
          className={cn(
            "rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]",
            "px-2 py-1 text-sm text-[hsl(var(--foreground))]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
          )}
        >
          {PAGE_SIZE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s} {t("reports.pagination.perPage")}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          aria-label={t("reports.pagination.prev")}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))]",
            "text-[hsl(var(--muted-foreground))] transition-colors",
            "hover:border-[var(--accent)]/40 hover:text-[hsl(var(--foreground))]",
            "disabled:pointer-events-none disabled:opacity-30"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-sm text-[hsl(var(--muted-foreground))]">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p as number)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-medium transition-all",
                page === p
                  ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                  : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[var(--accent)]/40 hover:text-[hsl(var(--foreground))]"
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          aria-label={t("reports.pagination.next")}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))]",
            "text-[hsl(var(--muted-foreground))] transition-colors",
            "hover:border-[var(--accent)]/40 hover:text-[hsl(var(--foreground))]",
            "disabled:pointer-events-none disabled:opacity-30"
          )}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const t = useTranslations();

  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
      setPage(1);
    },
    [sortKey]
  );

  const filtered = useMemo(() => {
    let rows = REPORT_DATA;
    if (activeCategory !== "All") {
      rows = rows.filter((r) => r.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.metric.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q)
      );
    }
    if (sortKey && sortDir) {
      rows = [...rows].sort((a, b) => {
        let av: string | number = a[sortKey] as string | number;
        let bv: string | number = b[sortKey] as string | number;
        if (typeof av === "string" && typeof bv === "string") {
          av = av.toLowerCase();
          bv = bv.toLowerCase();
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return rows;
  }, [activeCategory, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize]
  );

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageSize = (s: number) => {
    setPageSize(s);
    setPage(1);
  };

  // Summary stats
  const summaryStats = useMemo(() => {
    const total = REPORT_DATA.length;
    const healthy = REPORT_DATA.filter((r) => r.status === "healthy" || r.status === "growing").length;
    const warnings = REPORT_DATA.filter((r) => r.status === "warning").length;
    const critical = REPORT_DATA.filter((r) => r.status === "critical").length;
    return [
      { label: t("reports.summary.totalMetrics"), value: String(total) },
      { label: t("reports.summary.healthy"), value: String(healthy) },
      { label: t("reports.summary.warnings"), value: String(warnings) },
      { label: t("reports.summary.critical"), value: String(critical) },
    ];
  }, [t]);

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: "date", label: t("reports.table.date") },
    { key: "metric", label: t("reports.table.metric"), className: "min-w-[200px]" },
    { key: "category", label: t("reports.table.category") },
    { key: "value", label: t("reports.table.value") },
    { key: "change", label: t("reports.table.change") },
    { key: "status", label: t("reports.table.status") },
  ];

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ── Header ── */}
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                <FileText className="h-3.5 w-3.5" />
                {t("reports.badge")}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
                {t("reports.heading")}
              </h1>
              <p className="mt-2 max-w-xl text-[hsl(var(--muted-foreground))]">
                {t("reports.subheading")}
              </p>
            </div>
            <ExportActions t={t} />
          </div>
        </Reveal>

        {/* ── Summary Stats ── */}
        <Reveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {summaryStats.map((stat, i) => {
              const colorMap = [
                "text-[hsl(var(--foreground))]",
                "text-emerald-400",
                "text-amber-400",
                "text-red-400",
              ];
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className={cn(
                    "rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]",
                    "p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.12)]"
                  )}
                >
                  <div className={cn("text-3xl font-bold tabular-nums", colorMap[i])}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Reveal>

        {/* ── Filters & Search ── */}
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                    activeCategory === cat
                      ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                      : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:border-[var(--accent)]/40 hover:text-[hsl(var(--foreground))]"
                  )}
                >
                  <Filter className="h-3 w-3" />
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder={t("reports.search.placeholder")}
                className={cn(
                  "w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]",
                  "py-2 pl-9 pr-4 text-sm text-[hsl(var(--foreground))]",
                  "placeholder:text-[hsl(var(--muted-foreground))]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all"
                )}
              />
            </div>
          </div>
        </Reveal>

        {/* ── Data Table ── */}
        <Reveal>
          <div className={cn(
            "overflow-hidden rounded-2xl border border-[hsl(var(--border))]",
            "bg-[hsl(var(--card))] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.14)]"
          )}>
            {/* Table header */}
            <div className="border-b border-[hsl(var(--border))] px-6 py-4">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {t("reports.table.resultCount", { count: filtered.length })}
              </p>
            </div>

            {/* Scrollable table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/40">
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className={cn(
                          "px-6 py-3.5 text-left font-semibold text-[hsl(var(--muted-foreground))]",
                          col.className
                        )}
                      >
                        <button
                          onClick={() => handleSort(col.key)}
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-[hsl(var(--foreground))] focus-visible:outline-none"
                        >
                          {col.label}
                          <SortIcon dir={sortKey === col.key ? sortDir : null} />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center text-[hsl(var(--muted-foreground))]">
                        {t("reports.table.empty")}
                      </td>
                    </tr>
                  ) : (
                    paginated.map((row, i) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.25, ease: "easeOut" }}
                        className={cn(
                          "border-b border-[hsl(var(--border))]/60 transition-colors",
                          "hover:bg-[hsl(var(--background))]/60",
                          i === paginated.length - 1 && "border-b-0"
                        )}
                      >
                        {/* Date */}
                        <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-[hsl(var(--muted-foreground))]">
                          {formatDate(row.date)}
                        </td>
                        {/* Metric */}
                        <td className="px-6 py-4 font-medium text-[hsl(var(--foreground))]">
                          {row.metric}
                        </td>
                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="rounded-md bg-[hsl(var(--background))]/60 px-2.5 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                            {row.category}
                          </span>
                        </td>
                        {/* Value */}
                        <td className="whitespace-nowrap px-6 py-4 font-semibold tabular-nums text-[hsl(var(--foreground))]">
                          {formatValue(row.value, row.unit)}
                        </td>
                        {/* Change */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 font-semibold tabular-nums",
                              row.change > 0
                                ? "text-emerald-400"
                                : row.change < 0
                                ? "text-red-400"
                                : "text-[hsl(var(--muted-foreground))]"
                            )}
                          >
                            {row.change > 0 ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : row.change < 0 ? (
                              <ChevronDown className="h-3.5 w-3.5" />
                            ) : null}
                            {Math.abs(row.change).toFixed(1)}%
                          </span>
                        </td>
                        {/* Status */}
                        <td className="px-6 py-4">
                          <StatusBadge status={row.status} />
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              page={page}
              totalPages={totalPages}
              pageSize={pageSize}
              totalRows={filtered.length}
              onPage={setPage}
              onPageSize={handlePageSize}
              t={t}
            />
          </div>
        </Reveal>

        {/* ── Footer note ── */}
        <Reveal>
          <p className="text-center text-xs text-[hsl(var(--muted-foreground))]">
            {t("reports.footerNote")}
          </p>
        </Reveal>
      </div>
    </main>
  );
}