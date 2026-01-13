import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';

export default function XPProgress({ level, totalXp, className = '' }) {
  const xpForLevel = (lvl) => lvl * 500;
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const progressInLevel = totalXp - currentLevelXp + xpForLevel(1);
  const xpNeeded = nextLevelXp - currentLevelXp;
  const progress = Math.min((progressInLevel / xpNeeded) * 100, 100);

  return (
    <div className={`bg-white rounded-lg p-6 border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xl font-bold">{level}</span>
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-black">Level {level}</h3>
            <p className="text-sm text-gray-600">Focus Master</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-black font-semibold">
            <Zap className="w-4 h-4" />
            <span>{totalXp.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-600">Total XP</p>
        </div>
      </div>

      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-gray-600">{progressInLevel} XP</span>
          <span className="text-gray-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {xpNeeded - progressInLevel} to level {level + 1}
          </span>
        </div>
      </div>
    </div>
  );
}