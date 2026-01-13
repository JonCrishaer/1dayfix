import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Check, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FocusTimer({ onSessionComplete, defaultMinutes = 60 }) {
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialMinutes, setInitialMinutes] = useState(defaultMinutes);
  const [taskDescription, setTaskDescription] = useState('');
  const [isSetup, setIsSetup] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              handleComplete();
              return 0;
            }
            setMinutes(m => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, minutes]);

  const handleComplete = () => {
    const xp = Math.floor(initialMinutes * 2);
    onSessionComplete({
      duration_minutes: initialMinutes,
      task_description: taskDescription,
      xp_earned: xp,
      completed: true
    });
  };

  const startSession = () => {
    if (!taskDescription.trim()) return;
    setIsSetup(false);
    setIsRunning(true);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSeconds(0);
  };

  const finishEarly = () => {
    setIsRunning(false);
    const actualMinutes = initialMinutes - minutes - (seconds > 0 ? 0 : 1);
    if (actualMinutes > 0) {
      const xp = Math.floor(actualMinutes * 1.5);
      onSessionComplete({
        duration_minutes: actualMinutes,
        task_description: taskDescription,
        xp_earned: xp,
        completed: true
      });
    }
    setIsSetup(true);
    setMinutes(initialMinutes);
    setSeconds(0);
    setTaskDescription('');
  };

  const progress = 1 - ((minutes * 60 + seconds) / (initialMinutes * 60));
  const circumference = 2 * Math.PI * 140;

  if (isSetup) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Start Focus Session</h3>
            <p className="text-sm text-slate-400">Define your quest</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">What are you working on?</label>
            <Input
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="e.g., Write 1000 words for newsletter"
              className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Time block (minutes)</label>
            <div className="flex gap-2">
              {[30, 60, 90, 120].map(time => (
                <button
                  key={time}
                  onClick={() => { setInitialMinutes(time); setMinutes(time); }}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    initialMinutes === time 
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white' 
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                  }`}
                >
                  {time}m
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={startSession}
            disabled={!taskDescription.trim()}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-6 rounded-xl font-medium"
          >
            <Play className="w-5 h-5 mr-2" />
            Begin Quest
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800"
    >
      <div className="text-center mb-4">
        <p className="text-slate-400 text-sm">{taskDescription}</p>
      </div>

      <div className="relative w-72 h-72 mx-auto">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="140"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-slate-800"
          />
          <motion.circle
            cx="144"
            cy="144"
            r="140"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            initial={{ strokeDashoffset: circumference }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            key={`${minutes}:${seconds}`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-light text-white tracking-tight"
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </motion.span>
          <span className="text-slate-500 text-sm mt-2">
            +{Math.floor(initialMinutes * 2)} XP on completion
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={resetTimer}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-xl border-slate-700 bg-slate-800/50 hover:bg-slate-700/50"
        >
          <RotateCcw className="w-5 h-5 text-slate-400" />
        </Button>

        <Button
          onClick={toggleTimer}
          size="icon"
          className={`w-16 h-16 rounded-xl ${
            isRunning 
              ? 'bg-slate-700 hover:bg-slate-600' 
              : 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700'
          }`}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>

        <Button
          onClick={finishEarly}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-xl border-slate-700 bg-slate-800/50 hover:bg-slate-700/50"
        >
          <Check className="w-5 h-5 text-emerald-400" />
        </Button>
      </div>
    </motion.div>
  );
}