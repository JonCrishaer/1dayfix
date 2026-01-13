import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Check, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DailyQuests({ tasks = [], onAddTask, onCompleteTask, onDeleteTask }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', target_value: '', deadline_minutes: 60 });

  const handleAdd = () => {
    if (newTask.title.trim()) {
      onAddTask({
        ...newTask,
        priority: tasks.length + 1,
        completed: false,
        task_date: new Date().toISOString().split('T')[0]
      });
      setNewTask({ title: '', target_value: '', deadline_minutes: 60 });
      setShowAdd(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">Daily Quests</h3>
            <p className="text-sm text-gray-600">{completedCount} of {tasks.length} completed</p>
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

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 space-y-3"
          >
            <Input
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task name (e.g., Write newsletter)"
              className="bg-gray-50 border-gray-300 text-black"
            />
            <div className="flex gap-2">
              <Input
                value={newTask.target_value}
                onChange={(e) => setNewTask({ ...newTask, target_value: e.target.value })}
                placeholder="Target (e.g., 1000 words)"
                className="bg-gray-50 border-gray-300 text-black flex-1"
              />
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-md px-3">
                <Clock className="w-4 h-4 text-gray-600" />
                <Input
                  type="number"
                  value={newTask.deadline_minutes}
                  onChange={(e) => setNewTask({ ...newTask, deadline_minutes: parseInt(e.target.value) || 60 })}
                  className="w-16 bg-transparent border-0 text-black p-0"
                />
                <span className="text-gray-600 text-sm">min</span>
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full bg-black hover:bg-gray-900">
              Add Quest
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-sm">No quests for today</p>
          <p className="text-gray-500 text-xs mt-1">Add 2-3 most important tasks</p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  task.completed 
                    ? 'bg-gray-100 border border-gray-300' 
                    : 'bg-white border border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => onCompleteTask(task.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    task.completed 
                      ? 'bg-black text-white' 
                      : 'border-2 border-gray-400 hover:border-black'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.completed ? 'text-gray-500 line-through' : 'text-black'}`}>
                    {task.title}
                  </p>
                  {task.target_value && (
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <span>{task.target_value}</span>
                      {task.deadline_minutes && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.deadline_minutes}m
                          </span>
                        </>
                      )}
                    </p>
                  )}
                </div>

                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  task.priority === 1 ? 'bg-gray-300 text-gray-700' :
                  task.priority === 2 ? 'bg-gray-300 text-gray-700' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  P{task.priority}
                </span>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}