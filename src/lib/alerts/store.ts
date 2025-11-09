export type AlertChannel = "telegram" | "email" | "slack";

export type AlertEntry = {
  id: string;
  title: string;
  type: string;
  event: string;
  locale: string;
  channels: AlertChannel[];
  timestamp: string;
  url?: string;
};

const MAX_ALERTS = 10;
const alerts: AlertEntry[] = [];

export function pushAlert(entry: AlertEntry) {
  alerts.unshift(entry);
  if (alerts.length > MAX_ALERTS) {
    alerts.length = MAX_ALERTS;
  }
}

export function getAlerts() {
  return alerts;
}

