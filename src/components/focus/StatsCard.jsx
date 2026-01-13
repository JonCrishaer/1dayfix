import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, label, value, sublabel }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-lg p-5 border border-gray-200"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{label}</p>
          <p className="text-2xl font-bold text-black">{value}</p>
          {sublabel && <p className="text-xs text-gray-600 mt-1">{sublabel}</p>}
        </div>
        <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}