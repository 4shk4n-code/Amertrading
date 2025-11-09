"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Send, Slack } from "lucide-react";
import { formatTimestamp } from "@/lib/utils/date";
import type { AlertEntry } from "@/lib/alerts/store";

const channelIcons = {
  telegram: Send,
  email: Mail,
  slack: Slack,
};

export function NotificationsPanel() {
  const [alerts, setAlerts] = useState<AlertEntry[]>([]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/admin/alerts");
        if (res.ok) {
          const data = await res.json();
          if (active) {
            setAlerts(data.alerts ?? []);
          }
        }
      } catch (error) {
        console.error("Failed to load alerts", error);
      }
    }
    void load();
    const interval = setInterval(() => {
      void load();
    }, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-6">
      <div className="mb-4 flex items-center gap-3">
        <Bell className="text-gold-300" size={24} />
        <h3 className="text-lg font-semibold text-white">
          Recent CMS Alerts
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {alerts.length === 0 && (
          <p className="text-sm text-white/50">
            No alerts yet. Updates will appear here.
          </p>
        )}
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-white/10 bg-white/[0.05] p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {alert.type}
                </p>
                <p className="text-base font-semibold text-white">
                  {alert.title}
                </p>
              </div>
              <span className="rounded-full bg-gold-500/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold-200">
                {alert.event}
              </span>
            </div>
            <p className="mt-2 text-xs text-white/40">
              {formatTimestamp(alert.timestamp)}
            </p>
            <div className="mt-3 flex items-center gap-2">
              {alert.channels.map((channel) => {
                const Icon = channelIcons[channel];
                return (
                  <Icon key={channel} size={18} className="text-gold-300" />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

