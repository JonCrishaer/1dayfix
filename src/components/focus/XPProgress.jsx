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
    <div className={`bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xl font-bold text-white">{level}</span>
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-white">Level {level}</h3>
            <p className="text-sm text-slate-400">Focus Master</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-amber-400">
            <Zap className="w-4 h-4" />
            <span className="font-semibold">{totalXp.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500">Total XP</p>
        </div>
      </div>

      <div className="relative">
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-slate-500">{progressInLevel} XP</span>
          <span className="text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {xpNeeded - progressInLevel} to level {level + 1}
          </span>
        </div>
      </div>
    </div>
  );
}