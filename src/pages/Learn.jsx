import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  BookOpen, Brain, Zap, Target, Flame, Shield, 
  Compass, Sparkles, Clock, ArrowLeft, CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LessonCard from '../components/learn/LessonCard';

const lessons = [
  {
    id: 'cycles',
    title: 'The 4 Cycles of Progress',
    description: 'Master perplexity, curiosity, intensity, and consistency',
    icon: Compass,
    gradient: 'from-violet-500 to-purple-600',
    duration: '5 min',
    xp: 100,
    content: [
      {
        title: 'Perplexity',
        text: "The first cycle is feeling lost and confused. You're at the start of the story. You haven't set the scene or found your mission. Most people get trapped here—they flood their minds with instant gratification instead of sitting with boredom.",
        tip: "Escape perplexity by becoming curious. Allow yourself to be bored."
      },
      {
        title: 'Curiosity',
        text: "You identify a problem in your life and desire a solution. Your mind sees a pivotal transformation of perspective. You start noticing information that reinforces a new goal. Shiny object syndrome is GOOD here—try everything and see what sticks.",
        tip: "Read books, join new circles, buy courses, build projects. Allow ideas to accumulate."
      },
      {
        title: 'Intensity',
        text: "The climax of the story. The 3-6 months that go by in a blur. Pure flow state. This is when you pull 12-hour days—it's stupid to force them in any other phase. Know when to pull out before burnout.",
        tip: "Don't push too hard. Know when to transition to consistency."
      },
      {
        title: 'Consistency',
        text: "Consistency is a tool to MAINTAIN progress, not make progress. This is when you drop down to 4 hours of high-priority work. Enough time to experiment for the next intensity phase, enough to maintain your new baseline.",
        tip: "You have nothing to be consistent on if you haven't gone through the other cycles."
      }
    ]
  },
  {
    id: 'focus-blockers',
    title: 'Remove Focus Blockers',
    description: 'Identify and eliminate what prevents deep work',
    icon: Shield,
    gradient: 'from-rose-500 to-pink-600',
    duration: '4 min',
    xp: 80,
    content: [
      {
        title: 'The Problem',
        text: "You can't focus because your mind, life, and priorities are a mess. The moment you sense boredom, you fill it with distraction. This prevents the curiosity cycle from ever starting.",
        tip: "Focus is about REMOVING anything that prevents focus."
      },
      {
        title: 'Digital Blockers',
        text: "Phone notifications, social media, email checking, and news sites are designed to capture attention. Each check floods your mind with new information that competes with your goals.",
        tip: "Put your phone in another room. Use website blockers. Check email only 2x daily."
      },
      {
        title: 'Environmental Blockers',
        text: "A messy workspace, background noise, and poor lighting all drain mental energy. Your environment should support focus, not fight against it.",
        tip: "Clean your desk before each session. Use noise-canceling headphones."
      },
      {
        title: 'Physical Blockers',
        text: "Hunger, poor nutrition, and sleep deprivation make deep work impossible. Your brain needs fuel and rest to perform at its best.",
        tip: "Sleep 7-8 hours. Eat before focus sessions. Stay hydrated."
      }
    ]
  },
  {
    id: 'deep-work',
    title: 'The Deep Work Routine',
    description: 'Structure your day for maximum output',
    icon: Target,
    gradient: 'from-cyan-500 to-blue-600',
    duration: '6 min',
    xp: 120,
    content: [
      {
        title: 'The Core Principle',
        text: "Block out 1 hour minimum. Work on 1 meaningful project. Aim for 1 vision for your future. Take it 1 day at a time. You don't need more motivation—you need more clarity.",
        tip: "Your attention is your RAM. More open tabs = slower performance."
      },
      {
        title: 'Quantify Your Tasks',
        text: "Instead of 'write my newsletter,' have 'write 1000 words.' This creates a feedback loop—you can SEE progress, which prevents your mind from leaving the task.",
        tip: "Limit to 2-3 most important tasks per day. These should move the needle most."
      },
      {
        title: 'Set Challenging Deadlines',
        text: "Give yourself 60-90 minute blocks. That usually isn't enough time—but that's good. You don't have time to think, you just need to DO. This forces flow state.",
        tip: "Use the Zeigarnik Effect—unfinished tasks make it easier to restart."
      },
      {
        title: 'Schedule Non-Work Tasks',
        text: "Have important non-work tasks between blocks (eating, gym, etc). If you don't value other areas of your life, you have no reason to STOP working—leading to unfocused work.",
        tip: "With a prioritized life, you get more done in 4-6 hours than hustlers do in 16."
      }
    ]
  },
  {
    id: 'flow-state',
    title: 'Entering Flow State',
    description: 'Make work feel like a video game',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
    duration: '5 min',
    xp: 100,
    content: [
      {
        title: 'Why Games Are Addictive',
        text: "Video games have clear goals of increasing challenge that demand skill increases. They have rules and feedback loops that keep attention within the game. You can replicate this for work.",
        tip: "Treat your work sessions like quests in a video game."
      },
      {
        title: 'Match Skill to Challenge',
        text: "If challenge is too low for your skill = boredom. If challenge is too high = anxiety. Flow happens when they match. Both boredom and anxiety break focus.",
        tip: "Adjust task difficulty to match your current skill level."
      },
      {
        title: 'Order in Consciousness',
        text: "The optimal state is when psychic energy—attention—is invested in realistic goals, and skills match opportunities for action. Pursuing a goal brings ORDER to your mind.",
        tip: "The chaos induced by boredom or anxiety can only be cured with clarity."
      },
      {
        title: 'The Feedback Loop',
        text: "Progress must be VISIBLE. Quantified goals let you see advancement. This keeps your mind engaged instead of wandering to distractions.",
        tip: "Track your output: words written, tasks completed, time focused."
      }
    ]
  },
  {
    id: 'seasons-intensity',
    title: 'Seasons of Intensity',
    description: 'When and how to go all in',
    icon: Flame,
    gradient: 'from-orange-500 to-red-600',
    duration: '4 min',
    xp: 80,
    content: [
      {
        title: 'You Need Rare Results',
        text: "You won't find rare results in an average lifestyle. Sometimes the only thing you can do is flip the switch. Change your habits all at once. Work 12 hours and forget to eat.",
        tip: "You need seasons of intensity that launch you to a new baseline."
      },
      {
        title: 'Create a Glitch in the Matrix',
        text: "Become a completely different person. Remove every distraction. Start the business. Build the project. Look back and realize you've done more in 3 months than in 3 years.",
        tip: "Waking up at 4am gives you 3-4 hours others don't get to have."
      },
      {
        title: 'Know When to Stop',
        text: "12-hour workdays aren't sustainable forever. Know when to pull out. Don't push the bulk until you're fat. Don't get so obsessed you become desperate.",
        tip: "Like a lion hunts and rests, replicate this in your work."
      },
      {
        title: 'The New Baseline',
        text: "After intensity comes consistency. You maintain at a higher level than before. Each cycle raises your baseline—this is how real progress happens over years.",
        tip: "Progress is non-linear. You'll gain more in intensity phases than maintenance."
      }
    ]
  }
];

export default function Learn() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const queryClient = useQueryClient();

  const { data: progress } = useQuery({
    queryKey: ['userProgress'],
    queryFn: async () => {
      const user = await base44.auth.me();
      const records = await base44.entities.UserProgress.filter({ created_by: user.email });
      return records[0];
    }
  });

  const updateProgressMutation = useMutation({
    mutationFn: (data) => base44.entities.UserProgress.update(progress?.id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProgress'] })
  });

  const completedLessons = progress?.achievements?.filter(a => a.startsWith('lesson_')) || [];

  const handleCompleteLesson = () => {
    const lessonAchievement = `lesson_${selectedLesson.id}`;
    if (!completedLessons.includes(lessonAchievement)) {
      const newXp = (progress?.total_xp || 0) + selectedLesson.xp;
      const newLevel = Math.floor(newXp / 500) + 1;
      updateProgressMutation.mutate({
        total_xp: newXp,
        level: newLevel,
        achievements: [...(progress?.achievements || []), lessonAchievement]
      });
    }
    setSelectedLesson(null);
    setCurrentStep(0);
  };

  const isLessonCompleted = (lessonId) => completedLessons.includes(`lesson_${lessonId}`);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!selectedLesson ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold">Training Center</h1>
                </div>
                <p className="text-slate-400">Master the techniques of deep focus</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="text-slate-500">
                    {completedLessons.length} of {lessons.length} completed
                  </span>
                  <div className="h-2 flex-1 max-w-xs bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={isLessonCompleted(lesson.id)}
                    isLocked={false}
                    onClick={() => setSelectedLesson(lesson)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => { setSelectedLesson(null); setCurrentStep(0); }}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to lessons
              </button>

              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden">
                {/* Progress bar */}
                <div className="h-1 bg-slate-800">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${selectedLesson.gradient}`}
                    animate={{ width: `${((currentStep + 1) / selectedLesson.content.length) * 100}%` }}
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedLesson.gradient} flex items-center justify-center`}>
                      <selectedLesson.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedLesson.title}</h2>
                      <p className="text-sm text-slate-400">
                        Step {currentStep + 1} of {selectedLesson.content.length}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="min-h-[200px]"
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {selectedLesson.content[currentStep].title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        {selectedLesson.content[currentStep].text}
                      </p>
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedLesson.gradient} bg-opacity-10 border border-white/10`}>
                        <p className="text-sm text-slate-200">
                          <span className="font-semibold">💡 Key Insight:</span>{' '}
                          {selectedLesson.content[currentStep].tip}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between mt-8">
                    <Button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      variant="outline"
                      disabled={currentStep === 0}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      Previous
                    </Button>

                    {currentStep < selectedLesson.content.length - 1 ? (
                      <Button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className={`bg-gradient-to-r ${selectedLesson.gradient}`}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        onClick={handleCompleteLesson}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete (+{selectedLesson.xp} XP)
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}