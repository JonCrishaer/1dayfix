import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Clock, Target, Calendar } from 'lucide-react';
import CycleProgress from '../components/focus/CycleProgress';
import FocusTimer from '../components/focus/FocusTimer';
import XPProgress from '../components/focus/XPProgress';
import StatsCard from '../components/focus/StatsCard';
import DailyQuests from '../components/focus/DailyQuests';
import FocusBlockers from '../components/focus/FocusBlockers';
import Achievements from '../components/focus/Achievements';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0];

  const { data: progress, isLoading: loadingProgress } = useQuery({
    queryKey: ['userProgress'],
    queryFn: async () => {
      const user = await base44.auth.me();
      const records = await base44.entities.UserProgress.filter({ created_by: user.email });
      if (records.length === 0) {
        const newProgress = await base44.entities.UserProgress.create({
          current_cycle: 'perplexity',
          total_xp: 0,
          level: 1,
          current_streak: 0,
          longest_streak: 0,
          total_focus_minutes: 0,
          sessions_completed: 0,
          achievements: [],
          focus_blockers_removed: []
        });
        return newProgress;
      }
      return records[0];
    }
  });

  const { data: dailyTasks = [] } = useQuery({
    queryKey: ['dailyTasks', today],
    queryFn: async () => {
      const user = await base44.auth.me();
      return base44.entities.DailyTask.filter({ created_by: user.email, task_date: today });
    }
  });

  const { data: sessions = [] } = useQuery({
    queryKey: ['recentSessions'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return base44.entities.FocusSession.filter({ created_by: user.email }, '-session_date', 10);
    }
  });

  const updateProgressMutation = useMutation({
    mutationFn: (data) => base44.entities.UserProgress.update(progress.id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProgress'] })
  });

  const createSessionMutation = useMutation({
    mutationFn: (data) => base44.entities.FocusSession.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recentSessions'] })
  });

  const createTaskMutation = useMutation({
    mutationFn: (data) => base44.entities.DailyTask.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dailyTasks', today] })
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.DailyTask.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dailyTasks', today] })
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => base44.entities.DailyTask.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dailyTasks', today] })
  });

  const handleSessionComplete = async (sessionData) => {
    await createSessionMutation.mutateAsync({
      ...sessionData,
      session_date: new Date().toISOString(),
      cycle_phase: progress?.current_cycle
    });

    const newXp = (progress?.total_xp || 0) + sessionData.xp_earned;
    const newMinutes = (progress?.total_focus_minutes || 0) + sessionData.duration_minutes;
    const newSessions = (progress?.sessions_completed || 0) + 1;
    const newLevel = Math.floor(newXp / 500) + 1;

    // Check streak
    const lastDate = progress?.last_session_date;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = progress?.current_streak || 0;
    
    if (lastDate === yesterday) {
      newStreak += 1;
    } else if (lastDate !== today) {
      newStreak = 1;
    }

    await updateProgressMutation.mutateAsync({
      total_xp: newXp,
      level: newLevel,
      total_focus_minutes: newMinutes,
      sessions_completed: newSessions,
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, progress?.longest_streak || 0),
      last_session_date: today
    });
  };

  const handleCycleChange = (cycle) => {
    updateProgressMutation.mutate({ current_cycle: cycle });
  };

  const handleBlockersUpdate = (blockers) => {
    updateProgressMutation.mutate({ focus_blockers_removed: blockers });
  };

  if (loadingProgress) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Deep Focus
          </h1>
          <p className="text-slate-500 mt-1">Master your cycles of progress</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatsCard
            icon={Flame}
            label="Current Streak"
            value={`${progress?.current_streak || 0} days`}
            gradient="from-orange-500 to-red-600"
          />
          <StatsCard
            icon={Clock}
            label="Focus Time"
            value={`${Math.floor((progress?.total_focus_minutes || 0) / 60)}h`}
            sublabel={`${(progress?.total_focus_minutes || 0) % 60}m`}
            gradient="from-blue-500 to-cyan-600"
          />
          <StatsCard
            icon={Target}
            label="Sessions"
            value={progress?.sessions_completed || 0}
            gradient="from-emerald-500 to-teal-600"
          />
          <StatsCard
            icon={Calendar}
            label="Best Streak"
            value={`${progress?.longest_streak || 0} days`}
            gradient="from-violet-500 to-purple-600"
          />
        </div>

        {/* XP Progress */}
        <XPProgress
          level={progress?.level || 1}
          totalXp={progress?.total_xp || 0}
          className="mb-6"
        />

        {/* Cycle Progress */}
        <div className="mb-6">
          <CycleProgress
            currentCycle={progress?.current_cycle || 'perplexity'}
            onCycleChange={handleCycleChange}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Focus Timer */}
          <FocusTimer onSessionComplete={handleSessionComplete} />

          {/* Daily Quests */}
          <DailyQuests
            tasks={dailyTasks}
            onAddTask={(task) => createTaskMutation.mutate(task)}
            onCompleteTask={(id) => {
              const task = dailyTasks.find(t => t.id === id);
              updateTaskMutation.mutate({ id, data: { completed: !task?.completed } });
            }}
            onDeleteTask={(id) => deleteTaskMutation.mutate(id)}
          />
        </div>

        {/* Focus Blockers */}
        <div className="mb-6">
          <FocusBlockers
            removedBlockers={progress?.focus_blockers_removed || []}
            onUpdateBlockers={handleBlockersUpdate}
          />
        </div>

        {/* Achievements */}
        <Achievements
          unlockedAchievements={progress?.achievements || []}
          totalXp={progress?.total_xp || 0}
          level={progress?.level || 1}
          streak={progress?.current_streak || 0}
          totalMinutes={progress?.total_focus_minutes || 0}
        />
      </div>
    </div>
  );
}