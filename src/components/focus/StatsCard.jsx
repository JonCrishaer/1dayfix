import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, label, value, sublabel, gradient }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-800"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-sm mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {sublabel && <p className="text-xs text-slate-500 mt-1">{sublabel}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}