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
        className="bg-white rounded-lg p-8 border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">Start Focus Session</h3>
            <p className="text-sm text-gray-600">Define your quest</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">What are you working on?</label>
            <Input
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="e.g., Write 1000 words for newsletter"
              className="bg-gray-50 border-gray-300 text-black placeholder:text-gray-500 focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Time block (minutes)</label>
            <div className="flex gap-2">
              {[30, 60, 90, 120].map(time => (
                <button
                  key={time}
                  onClick={() => { setInitialMinutes(time); setMinutes(time); }}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                    initialMinutes === time 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            className="w-full bg-black hover:bg-gray-900 text-white py-6 rounded-lg font-medium"
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
      className="bg-white rounded-lg p-8 border border-gray-200"
    >
      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm">{taskDescription}</p>
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
            className="text-gray-200"
          />
          <motion.circle
            cx="144"
            cy="144"
            r="140"
            stroke="black"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            initial={{ strokeDashoffset: circumference }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            key={`${minutes}:${seconds}`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-light text-black tracking-tight"
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </motion.span>
          <span className="text-gray-600 text-sm mt-2">
            +{Math.floor(initialMinutes * 2)} XP on completion
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={resetTimer}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-lg border-gray-300 bg-gray-100 hover:bg-gray-200"
        >
          <RotateCcw className="w-5 h-5 text-black" />
        </Button>

        <Button
          onClick={toggleTimer}
          size="icon"
          className={`w-16 h-16 rounded-lg ${
            isRunning 
              ? 'bg-gray-200 hover:bg-gray-300 text-black' 
              : 'bg-black hover:bg-gray-900 text-white'
          }`}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>

        <Button
          onClick={finishEarly}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-lg border-gray-300 bg-gray-100 hover:bg-gray-200"
        >
          <Check className="w-5 h-5 text-black" />
        </Button>
      </div>
    </motion.div>
  );
}