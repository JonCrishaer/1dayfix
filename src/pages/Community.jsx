import React from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Users, Trophy, Flame, CheckCircle2 } from 'lucide-react';

export default function Community() {
  const { data: allUsers = [] } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const users = await base44.entities.User.list();
      return users.sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0)).slice(0, 20);
    }
  });

  const { data: sessions = [] } = useQuery({
    queryKey: ['communityStats'],
    queryFn: async () => {
      return await base44.entities.FocusSession.list('-session_date', 50);
    }
  });

  const totalCommunityXP = allUsers.reduce((sum, user) => sum + (user.total_xp || 0), 0);
  const totalSessionsCompleted = sessions.filter(s => s.completed).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-black mb-3">Community & Accountability</h1>
          <p className="text-gray-600 text-lg">Connect with deep workers, track progress together, and level up as a community.</p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Active Members', value: allUsers.length, icon: Users },
            { label: 'Community XP', value: `${(totalCommunityXP / 1000).toFixed(1)}K`, icon: Trophy },
            { label: 'Sessions Logged', value: totalSessionsCompleted, icon: Flame },
            { label: 'Avg Streak', value: '7 days', icon: CheckCircle2 }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <Icon className="w-6 h-6 text-black mb-3" />
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-black">{stat.value}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-black" />
            <h2 className="text-2xl font-bold text-black">Leaderboard</h2>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Member</div>
              <div className="col-span-3">XP</div>
              <div className="col-span-2">Level</div>
              <div className="col-span-2">Streak</div>
            </div>

            {allUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors items-center"
              >
                <div className="col-span-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-300 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="col-span-4">
                  <p className="font-medium text-black">{user.full_name}</p>
                </div>
                <div className="col-span-3">
                  <p className="font-bold text-black">{user.total_xp || 0}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">{user.level || 1}</p>
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <p className="text-gray-600">{user.current_streak || 0}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accountability Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div>
            <h3 className="text-xl font-bold text-black mb-4">Weekly Challenges</h3>
            <div className="space-y-3">
              {[
                { name: 'Marathon Session', desc: '120+ minutes focus', xp: '500 XP' },
                { name: '7-Day Streak', desc: 'Complete sessions daily', xp: '750 XP' },
                { name: 'Deep Blocker', desc: 'Address 5 focus blockers', xp: '600 XP' }
              ].map((challenge, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-black">{challenge.name}</p>
                      <p className="text-sm text-gray-600">{challenge.desc}</p>
                    </div>
                    <p className="text-sm font-bold text-black">{challenge.xp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black mb-4">Join Study Groups</h3>
            <div className="space-y-3">
              {[
                { name: 'Morning Warriors', members: 142, focus: '5am-8am', next: 'Tomorrow' },
                { name: 'Deep Focus Collective', members: 287, focus: '2pm-5pm', next: 'Today' },
                { name: 'Night Owls', members: 64, focus: '9pm-12am', next: 'Tonight' }
              ].map((group, i) => (
                <div key={i} className="p-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{group.name}</p>
                      <p className="text-sm text-gray-300">{group.members} members</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">Focus window: {group.focus}</p>
                  <p className="text-xs text-gray-400 mt-1">Next session: {group.next}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}