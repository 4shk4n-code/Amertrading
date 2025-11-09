import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

type StatusCardProps = {
  title: string;
  value: number | string;
  ok: boolean;
};

export default function StatusCard({ title, value, ok }: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-between rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
    >
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      <div className="flex items-center gap-3">
        {ok ? (
          <CheckCircle className="text-green-400" size={24} />
        ) : (
          <AlertCircle className="text-red-400" size={24} />
        )}
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
    </motion.div>
  );
}

