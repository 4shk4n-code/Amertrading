import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCheck } from "lucide-react";

type HealthIndicatorProps = {
  label: string;
  status: "good" | "warning" | "alert";
  description: string;
};

const STATUS_MAP = {
  good: {
    color: "text-green-400",
    Icon: CheckCheck,
  },
  warning: {
    color: "text-amber-300",
    Icon: Activity,
  },
  alert: {
    color: "text-red-400",
    Icon: AlertTriangle,
  },
};

export function HealthIndicator({
  label,
  status,
  description,
}: HealthIndicatorProps) {
  const { color, Icon } = STATUS_MAP[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-start gap-4 rounded-2xl border border-zinc-700 bg-zinc-900/70 p-5"
    >
      <Icon className={color} size={24} />
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">
          {label}
        </p>
        <p className="mt-1 text-sm text-white/80">{description}</p>
      </div>
    </motion.div>
  );
}

