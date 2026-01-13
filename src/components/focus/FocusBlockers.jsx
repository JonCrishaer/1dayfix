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
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">Focus Blockers</h3>
            <p className="text-sm text-gray-600">{removedCount} of {totalBlockers} addressed</p>
          </div>
        </div>
        <Button
          onClick={() => setShowAdd(!showAdd)}
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-black"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-black"
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
                className="bg-gray-50 border-gray-300 text-black"
              />
              <Button onClick={addCustomBlocker} className="bg-black hover:bg-gray-900">
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
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                isRemoved 
                  ? 'bg-gray-100 border border-gray-300' 
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {isRemoved ? (
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-gray-600" />
                  </div>
                )}
                <span className={`text-sm ${isRemoved ? 'text-gray-500 line-through' : 'text-black'}`}>
                  {blocker.label}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                blocker.category === 'digital' ? 'bg-gray-200 text-gray-700' :
                blocker.category === 'environment' ? 'bg-gray-200 text-gray-700' :
                'bg-gray-200 text-gray-700'
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