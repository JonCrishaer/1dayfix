import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, Plus, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const defaultBlockers = [
  { id: 'phone', label: 'Phone notifications', category: 'digital' },
  { id: 'social', label: 'Social media apps', category: 'digital' },
  { id: 'email', label: 'Email checking', category: 'digital' },
  { id: 'news', label: 'News/media sites', category: 'digital' },
  { id: 'clutter', label: 'Messy workspace', category: 'environment' },
  { id: 'noise', label: 'Background noise', category: 'environment' },
  { id: 'food', label: 'Hunger/poor nutrition', category: 'physical' },
  { id: 'sleep', label: 'Sleep deprivation', category: 'physical' },
];

export default function FocusBlockers({ removedBlockers = [], onUpdateBlockers }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newBlocker, setNewBlocker] = useState('');

  const toggleBlocker = (blockerId) => {
    const updated = removedBlockers.includes(blockerId)
      ? removedBlockers.filter(b => b !== blockerId)
      : [...removedBlockers, blockerId];
    onUpdateBlockers(updated);
  };

  const addCustomBlocker = () => {
    if (newBlocker.trim()) {
      const customId = `custom_${Date.now()}`;
      onUpdateBlockers([...removedBlockers, customId]);
      setNewBlocker('');
      setShowAdd(false);
    }
  };

  const removedCount = removedBlockers.length;
  const totalBlockers = defaultBlockers.length;
  const progress = (removedCount / totalBlockers) * 100;

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Focus Blockers</h3>
            <p className="text-sm text-slate-400">{removedCount} of {totalBlockers} addressed</p>
          </div>
        </div>
        <Button
          onClick={() => setShowAdd(!showAdd)}
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-white"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex gap-2">
              <Input
                value={newBlocker}
                onChange={(e) => setNewBlocker(e.target.value)}
                placeholder="Add custom blocker..."
                className="bg-slate-800/50 border-slate-700 text-white"
              />
              <Button onClick={addCustomBlocker} className="bg-rose-500 hover:bg-rose-600">
                Add
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {defaultBlockers.map(blocker => {
          const isRemoved = removedBlockers.includes(blocker.id);
          return (
            <motion.button
              key={blocker.id}
              onClick={() => toggleBlocker(blocker.id)}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                isRemoved 
                  ? 'bg-slate-800/30 border border-emerald-500/30' 
                  : 'bg-slate-800/50 border border-transparent hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {isRemoved ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-slate-500" />
                  </div>
                )}
                <span className={`text-sm ${isRemoved ? 'text-slate-400 line-through' : 'text-white'}`}>
                  {blocker.label}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                blocker.category === 'digital' ? 'bg-violet-500/20 text-violet-300' :
                blocker.category === 'environment' ? 'bg-blue-500/20 text-blue-300' :
                'bg-amber-500/20 text-amber-300'
              }`}>
                {blocker.category}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}