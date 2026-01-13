import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Flame, Shield } from 'lucide-react';

const cycles = [
  { id: 'perplexity', name: 'Perplexity', icon: Compass, color: 'from-slate-500 to-slate-600', description: 'Finding your path' },
  { id: 'curiosity', name: 'Curiosity', icon: Sparkles, color: 'from-violet-500 to-purple-600', description: 'Exploring possibilities' },
  { id: 'intensity', name: 'Intensity', icon: Flame, color: 'from-orange-500 to-red-600', description: 'Maximum output' },
  { id: 'consistency', name: 'Consistency', icon: Shield, color: 'from-emerald-500 to-teal-600', description: 'Maintaining gains' },
];

export default function CycleProgress({ currentCycle, onCycleChange }) {
  const currentIndex = cycles.findIndex(c => c.id === currentCycle);

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800">
      <h3 className="text-sm font-medium text-slate-400 mb-4 tracking-wide uppercase">Your Progress Cycle</h3>
      
      <div className="flex items-center justify-between relative">
        {/* Connection line */}
        <div className="absolute top-6 left-8 right-8 h-0.5 bg-slate-800" />
        <div 
          className="absolute top-6 left-8 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
          style={{ width: `${(currentIndex / (cycles.length - 1)) * (100 - 16)}%` }}
        />
        
        {cycles.map((cycle, index) => {
          const Icon = cycle.icon;
          const isActive = cycle.id === currentCycle;
          const isPast = index < currentIndex;
          
          return (
            <motion.button
              key={cycle.id}
              onClick={() => onCycleChange(cycle.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-br ${cycle.color} shadow-lg shadow-purple-500/25` 
                    : isPast 
                      ? 'bg-slate-700 text-slate-300' 
                      : 'bg-slate-800 text-slate-500'
                }`}
                animate={isActive ? { boxShadow: ['0 0 20px rgba(139, 92, 246, 0.3)', '0 0 40px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(139, 92, 246, 0.3)'] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              </motion.div>
              <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {cycle.name}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      <motion.div 
        key={currentCycle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-center"
      >
        <p className="text-slate-400 text-sm">{cycles[currentIndex]?.description}</p>
      </motion.div>
    </div>
  );
}