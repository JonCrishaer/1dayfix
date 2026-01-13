import React from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Logo from '../components/Logo';
import { createPageUrl } from '../utils';

export default function Home() {
  const handleSignUp = async () => {
    await base44.auth.redirectToLogin(createPageUrl('Dashboard'));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <span className="font-bold text-white text-lg tracking-tight">1DAY</span>
          </div>
          <Button 
            onClick={handleSignUp}
            className="bg-white hover:bg-gray-100 text-black"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Full Bleed Hero with Image */}
      <section className="relative min-h-screen pt-24 overflow-hidden flex items-center">
        {/* Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696692ec69545bc4cde3c4e7/bd63a2380_G-efypCbQAEEi8a.jpg"
            alt="Focus illustration"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-block"
            >
              <span className="text-xs font-semibold text-white tracking-widest uppercase bg-white/10 px-4 py-2 rounded-full border border-white/20">
                Change your life in one day
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Dive Into Deep Work
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg"
            >
              Master the exact techniques that transform ordinary people into unstoppable productivity machines. Learn from Dan Koe's proven methodology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                onClick={handleSignUp}
                className="bg-white hover:bg-gray-100 text-black px-8 py-6 text-lg font-semibold"
              >
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                See How It Works
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-8"
            >
              <div>
                <p className="text-4xl font-bold text-white mb-2">5</p>
                <p className="text-sm text-gray-400">Deep Lessons</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">∞</p>
                <p className="text-sm text-gray-400">XP & Streaks</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">1</p>
                <p className="text-sm text-gray-400">Day to Change</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-4">What Makes 1DAY Different</h2>
            <p className="text-xl text-gray-400">Not your typical productivity app</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: '01',
                title: 'Gamified Mastery',
                description: 'Track XP, unlock achievements, and climb levels as you master deep focus techniques.'
              },
              {
                number: '02',
                title: 'Cycle Intelligence',
                description: 'Work with your natural rhythms: Perplexity, Curiosity, Intensity, and Consistency.'
              },
              {
                number: '03',
                title: 'Real Focus Blockers',
                description: 'Not theory. Practical frameworks to eliminate what actually stops you.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <p className="text-6xl font-bold text-gray-800 mb-4">{feature.number}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-black py-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white">Your Path to Mastery</h2>
          </motion.div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              { step: 'Learn', description: 'Absorb deep-work principles from Dan Koe\'s methodology' },
              { step: 'Track', description: 'Log your focus sessions and watch your stats grow' },
              { step: 'Progress', description: 'Climb levels, unlock achievements, extend your streak' },
              { step: 'Transform', description: 'Become the unstoppable focus master you know you can be' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-6 p-8 rounded-lg border border-gray-900 bg-gray-900/30 hover:border-gray-700 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.step}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black py-24 border-t border-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="text-6xl font-bold text-white mb-6">Stop Procrastinating. Start Dominating.</h2>
          <p className="text-xl text-gray-400 mb-12">
            Your breakthrough moment is one session away. Transform your focus, transform your life.
          </p>
          <Button 
            onClick={handleSignUp}
            className="bg-white hover:bg-gray-100 text-black px-10 py-7 text-lg font-semibold"
          >
            Unlock Deep Focus Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="font-semibold text-white">1DAY</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-500">
              <p>© 2026 1DAY</p>
              <a href="https://twitter.com/thedankoe" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                Inspired by Dan Koe
              </a>
              <a href="#" className="hover:text-gray-300 transition">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}