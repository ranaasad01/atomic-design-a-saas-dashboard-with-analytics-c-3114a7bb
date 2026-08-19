"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sun, Moon, Monitor, Bell, Mail, Smartphone, Calendar, User, Save, Check, Shield, Palette, Settings } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type APP_NAME = any;
const APP_NAME: any = [];
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
        checked ? "bg-[var(--accent)]" : "bg-[var(--muted)]"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-[hsl(var(--border))] pb-5 mb-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10">
        <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))]">{title}</h2>
        <p className="mt-0.5 text-sm text-[hsl(var(--muted-foreground))]">{description}</p>
      </div>
    </div>
  );
}

function ThemeSettings() {
  const t = useTranslations();
  const [selected, setSelected] = useState<Theme>("dark");

  const options: { value: Theme; label: string; icon: React.ElementType; preview: string }[] = [
    {
      value: "light",
      label: t("settings.theme.light"),
      icon: Sun,
      preview: "bg-white border-gray-200",
    },
    {
      value: "dark",
      label: t("settings.theme.dark"),
      icon: Moon,
      preview: "bg-gray-900 border-gray-700",
    },
    {
      value: "system",
      label: t("settings.theme.system"),
      icon: Monitor,
      preview: "bg-gradient-to-br from-white to-gray-900 border-gray-400",
    },
  ];

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
      <SectionHeader
        icon={Palette}
        title={t("settings.theme.title")}
        description={t("settings.theme.description")}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = selected === opt.value;
          return (
            <motion.button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)]/5"
                  : "border-[hsl(var(--border))] hover:border-[var(--accent)]/40"
              )}
              aria-pressed={isActive}
            >
              {isActive && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]">
                  <Check className="h-3 w-3 text-white" aria-hidden="true" />
                </span>
              )}

              <div
                className={cn(
                  "h-16 w-full rounded-lg border-2",
                  opt.preview
                )}
                aria-hidden="true"
              >
                <div className="flex h-full items-center justify-center">
                  <Icon
                    className={cn(
                      "h-6 w-6",
                      opt.value === "light" ? "text-gray-600" : "text-gray-300"
                    )}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <span
                className={cn(
                  "text-sm font-medium",
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[hsl(var(--foreground))]"
                )}
              >
                {opt.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
        {t("settings.theme.note")}
      </p>
    </div>
  );
}

function NotificationPreferences() {
  const t = useTranslations();

  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyDigest: true,
    productUpdates: true,
    securityAlerts: true,
    teamMentions: false,
  });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const notifGroups = [
    {
      groupLabel: t("settings.notifications.group.activity"),
      items: [
        {
          key: "emailAlerts" as const,
          icon: Mail,
          label: t("settings.notifications.emailAlerts"),
          description: t("settings.notifications.emailAlertsDesc"),
        },
        {
          key: "pushNotifications" as const,
          icon: Smartphone,
          label: t("settings.notifications.push"),
          description: t("settings.notifications.pushDesc"),
        },
        {
          key: "teamMentions" as const,
          icon: User,
          label: t("settings.notifications.teamMentions"),
          description: t("settings.notifications.teamMentionsDesc"),
        },
      ],
    },
    {
      groupLabel: t("settings.notifications.group.reports"),
      items: [
        {
          key: "weeklyDigest" as const,
          icon: Calendar,
          label: t("settings.notifications.weeklyDigest"),
          description: t("settings.notifications.weeklyDigestDesc"),
        },
        {
          key: "productUpdates" as const,
          icon: Bell,
          label: t("settings.notifications.productUpdates"),
          description: t("settings.notifications.productUpdatesDesc"),
        },
        {
          key: "securityAlerts" as const,
          icon: Shield,
          label: t("settings.notifications.securityAlerts"),
          description: t("settings.notifications.securityAlertsDesc"),
        },
      ],
    },
  ];

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
      <SectionHeader
        icon={Bell}
        title={t("settings.notifications.title")}
        description={t("settings.notifications.description")}
      />

      <div className="space-y-6">
        {notifGroups.map((group) => (
          <div key={group.groupLabel}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              {group.groupLabel}
            </p>
            <div className="divide-y divide-[hsl(var(--border))] rounded-xl border border-[hsl(var(--border))] overflow-hidden">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4 bg-[hsl(var(--background))] px-4 py-3.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className="h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))]"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                          {item.label}
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      checked={prefs[item.key]}
                      onChange={() => toggle(item.key)}
                      label={item.label}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountSettings() {
  const t = useTranslations();

  const [form, setForm] = useState({
    name: "Alex Rivera",
    email: "alex.rivera@company.io",
    role: "Admin",
    timezone: "UTC-5 (Eastern Time)",
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 900);
  };

  const timezones = [
    "UTC-8 (Pacific Time)",
    "UTC-7 (Mountain Time)",
    "UTC-6 (Central Time)",
    "UTC-5 (Eastern Time)",
    "UTC+0 (GMT)",
    "UTC+1 (CET)",
    "UTC+5:30 (IST)",
    "UTC+8 (CST)",
    "UTC+9 (JST)",
  ];

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
      <SectionHeader
        icon={User}
        title={t("settings.account.title")}
        description={t("settings.account.description")}
      />

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-2xl font-bold text-[var(--accent)]">
            {form.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">{form.name}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">{form.role}</p>
            <button className="mt-1 text-xs font-medium text-[var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded">
              {t("settings.account.changeAvatar")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="settings-name"
              className="mb-1.5 block text-xs font-medium text-[hsl(var(--muted-foreground))]"
            >
              {t("settings.account.nameLabel")}
            </label>
            <input
              id="settings-name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="settings-email"
              className="mb-1.5 block text-xs font-medium text-[hsl(var(--muted-foreground))]"
            >
              {t("settings.account.emailLabel")}
            </label>
            <input
              id="settings-email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="settings-role"
              className="mb-1.5 block text-xs font-medium text-[hsl(var(--muted-foreground))]"
            >
              {t("settings.account.roleLabel")}
            </label>
            <input
              id="settings-role"
              type="text"
              value={form.role}
              readOnly
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--muted)]/30 px-3 py-2 text-sm text-[var(--muted-foreground)] cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="settings-timezone"
              className="mb-1.5 block text-xs font-medium text-[hsl(var(--muted-foreground))]"
            >
              {t("settings.account.timezoneLabel")}
            </label>
            <select
              id="settings-timezone"
              value={form.timezone}
              onChange={(e) => handleChange("timezone", e.target.value)}
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[hsl(var(--border))] pt-5">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            {t("settings.account.lastUpdated")}
          </p>
          <motion.button
            onClick={handleSave}
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
              saved
                ? "bg-emerald-500 text-white"
                : "bg-[var(--accent)] text-[hsl(var(--background))] hover:opacity-90"
            )}
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                {t("settings.account.saved")}
              </>
            ) : saving ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                  aria-hidden="true"
                />
                {t("settings.account.saving")}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" aria-hidden="true" />
                {t("settings.account.save")}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10">
              <Settings className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                {t("settings.page.title")}
              </h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {t("settings.page.subtitle", { app: APP_NAME })}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.05}>
            <ThemeSettings />
          </Reveal>

          <Reveal delay={0.1}>
            <NotificationPreferences />
          </Reveal>

          <Reveal delay={0.15}>
            <AccountSettings />
          </Reveal>
        </div>
      </div>
    </main>
  );
}