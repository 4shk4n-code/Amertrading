import { format, parseISO } from "date-fns";

export function formatTimestamp(timestamp: string) {
  try {
    return format(parseISO(timestamp), "PPPpp");
  } catch {
    return timestamp;
  }
}

