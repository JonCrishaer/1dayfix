import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, ChevronRight } from 'lucide-react';

export default function LessonCard({ lesson, isCompleted, isLocked, onClick }) {
  const Icon = lesson.icon;

  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      whileHover={!isLocked ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`w-full text-left p-5 rounded-2xl border transition-all ${
        isLocked 
          ? 'bg-slate-900/30 border-slate-800/50 cursor-not-allowed opacity-50' 
          : isCompleted 
            ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50' 
            : 'bg-slate-900/50 border-slate-800 hover:border-violet-500/50'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isLocked 
            ? 'bg-slate-800' 
            : isCompleted 
              ? 'bg-emerald-500/20' 
              : `bg-gradient-to-br ${lesson.gradient}`
        }`}>
          {isLocked ? (
            <Lock className="w-5 h-5 text-slate-600" />
          ) : isCompleted ? (
            <Check className="w-5 h-5 text-emerald-400" />
          ) : (
            <Icon className="w-5 h-5 text-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${isLocked ? 'text-slate-600' : 'text-white'}`}>
            {lesson.title}
          </h3>
          <p className={`text-sm mt-0.5 truncate ${isLocked ? 'text-slate-700' : 'text-slate-400'}`}>
            {lesson.description}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-slate-500">{lesson.duration}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isLocked ? 'bg-slate-800 text-slate-600' : 'bg-violet-500/20 text-violet-300'
            }`}>
              +{lesson.xp} XP
            </span>
          </div>
        </div>

        <ChevronRight className={`w-5 h-5 ${isLocked ? 'text-slate-700' : 'text-slate-500'}`} />
      </div>
    </motion.button>
  );
}