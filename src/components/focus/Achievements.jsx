import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Clock, Target, Zap, Star, Award, Crown } from 'lucide-react';

const allAchievements = [
  { id: 'first_session', name: 'First Step', description: 'Complete your first focus session', icon: Target, color: 'from-violet-500 to-purple-600', xpRequired: 0 },
  { id: 'streak_3', name: 'On Fire', description: '3 day streak', icon: Flame, color: 'from-orange-500 to-red-600', streakRequired: 3 },
  { id: 'streak_7', name: 'Unstoppable', description: '7 day streak', icon: Flame, color: 'from-orange-500 to-red-600', streakRequired: 7 },
  { id: 'streak_30', name: 'Month Master', description: '30 day streak', icon: Crown, color: 'from-amber-500 to-orange-600', streakRequired: 30 },
  { id: 'hours_10', name: 'Deep Diver', description: '10 hours of focus', icon: Clock, color: 'from-blue-500 to-cyan-600', hoursRequired: 10 },
  { id: 'hours_50', name: 'Time Lord', description: '50 hours of focus', icon: Clock, color: 'from-blue-500 to-cyan-600', hoursRequired: 50 },
  { id: 'xp_1000', name: 'Rising Star', description: 'Earn 1,000 XP', icon: Zap, color: 'from-amber-500 to-yellow-500', xpRequired: 1000 },
  { id: 'xp_5000', name: 'XP Champion', description: 'Earn 5,000 XP', icon: Star, color: 'from-amber-500 to-yellow-500', xpRequired: 5000 },
  { id: 'level_5', name: 'Apprentice', description: 'Reach level 5', icon: Award, color: 'from-emerald-500 to-teal-600', levelRequired: 5 },
  { id: 'level_10', name: 'Focus Expert', description: 'Reach level 10', icon: Trophy, color: 'from-amber-400 to-yellow-500', levelRequired: 10 },
];

export default function Achievements({ unlockedAchievements = [], totalXp, level, streak, totalMinutes }) {
  const checkUnlocked = (achievement) => {
    if (unlockedAchievements.includes(achievement.id)) return true;
    if (achievement.xpRequired !== undefined && totalXp >= achievement.xpRequired) return true;
    if (achievement.levelRequired && level >= achievement.levelRequired) return true;
    if (achievement.streakRequired && streak >= achievement.streakRequired) return true;
    if (achievement.hoursRequired && (totalMinutes / 60) >= achievement.hoursRequired) return true;
    return false;
  };

  const unlockedCount = allAchievements.filter(a => checkUnlocked(a)).length;

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Achievements</h3>
            <p className="text-sm text-slate-400">{unlockedCount} of {allAchievements.length} unlocked</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {allAchievements.map(achievement => {
          const Icon = achievement.icon;
          const isUnlocked = checkUnlocked(achievement);

          return (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.05 }}
              className={`relative group cursor-pointer ${!isUnlocked && 'opacity-40'}`}
            >
              <div className={`aspect-square rounded-xl flex items-center justify-center ${
                isUnlocked 
                  ? `bg-gradient-to-br ${achievement.color}` 
                  : 'bg-slate-800'
              }`}>
                <Icon className={`w-6 h-6 ${isUnlocked ? 'text-white' : 'text-slate-600'}`} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                <p className="text-white text-xs font-medium">{achievement.name}</p>
                <p className="text-slate-400 text-xs">{achievement.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}