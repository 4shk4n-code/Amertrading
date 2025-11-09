import { motion } from "framer-motion";

type MetricChartProps = {
  label: string;
  value: number;
  unit?: string;
  target?: number;
};

export function MetricChart({
  label,
  value,
  unit = "",
  target = 100,
}: MetricChartProps) {
  const percent = Math.min(100, Math.round((value / target) * 100));
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-6">
      <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-white/60">
        <span>{label}</span>
        <span>
          {value}
          {unit}
        </span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <motion.div
          className="h-2 rounded-full bg-gold-500"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className="mt-3 text-xs text-white/40">Target: {target}</p>
    </div>
  );
}

