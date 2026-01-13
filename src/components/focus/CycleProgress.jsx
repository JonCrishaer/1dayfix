import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Flame, Shield } from 'lucide-react';

const cycles = [
  { id: 'perplexity', name: 'Perplexity', icon: Compass, description: 'Finding your path' },
  { id: 'curiosity', name: 'Curiosity', icon: Sparkles, description: 'Exploring possibilities' },
  { id: 'intensity', name: 'Intensity', icon: Flame, description: 'Maximum output' },
  { id: 'consistency', name: 'Consistency', icon: Shield, description: 'Maintaining gains' },
];

export default function CycleProgress({ currentCycle, onCycleChange }) {
  const currentIndex = cycles.findIndex(c => c.id === currentCycle);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-xs font-semibold text-gray-600 mb-4 tracking-wider uppercase">Your Progress Cycle</h3>
      
      <div className="flex items-center justify-between relative">
        {/* Connection line */}
        <div className="absolute top-6 left-8 right-8 h-0.5 bg-gray-200" />
        <div 
          className="absolute top-6 left-8 h-0.5 bg-black transition-all duration-500"
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
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-black text-white shadow-lg' 
                    : isPast 
                      ? 'bg-gray-300 text-gray-600' 
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className={`text-xs font-medium ${isActive ? 'text-black' : 'text-gray-600'}`}>
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
        <p className="text-gray-600 text-sm">{cycles[currentIndex]?.description}</p>
      </motion.div>
    </div>
  );
}