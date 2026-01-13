import React from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Target, Flame } from 'lucide-react';
import Logo from '../components/Logo';
import { createPageUrl } from '../utils';

export default function Home() {
  const handleSignUp = async () => {
    await base44.auth.redirectToLogin(createPageUrl('Dashboard'));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <span className="font-bold text-black text-lg tracking-tight">1day</span>
          </div>
          <Button 
            onClick={handleSignUp}
            className="bg-black hover:bg-gray-900 text-white"
          >
            Get Started
          </Button>
        </div>
      </nav>

      <div className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-600 tracking-wide uppercase">Focus Training</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                Master Deep Work in One Day
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Learn the proven techniques from Dan Koe to eliminate distractions, enter flow state, and accomplish more in one focused session than most people do in a week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleSignUp}
                  className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-lg"
                >
                  Start Training
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-50 px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-black mb-1">5</p>
                  <p className="text-sm text-gray-600">Comprehensive lessons</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-black mb-1">100+</p>
                  <p className="text-sm text-gray-600">XP to earn</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-black mb-1">10x</p>
                  <p className="text-sm text-gray-600">Productivity boost</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg overflow-hidden border border-gray-200 shadow-lg"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696692ec69545bc4cde3c4e7/bd63a2380_G-efypCbQAEEi8a.jpg"
                alt="Focus illustration"
                className="w-full h-auto"
              />
              <p className="p-4 text-xs text-gray-600 border-t border-gray-200">
                Illustration by Dan Koe
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">What You'll Learn</h2>
              <p className="text-lg text-gray-600">Master the science and practice of deep focus</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'The 4 Cycles of Progress',
                  description: 'Understand how growth actually works—not linear, but in powerful seasonal cycles.'
                },
                {
                  icon: Target,
                  title: 'Remove Focus Blockers',
                  description: 'Identify and eliminate the digital, environmental, and physical barriers to deep work.'
                },
                {
                  icon: Flame,
                  title: 'Deep Work Routine',
                  description: 'A proven system to structure your day for maximum output in minimum time.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all"
                >
                  <feature.icon className="w-10 h-10 text-black mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-black rounded-lg p-12 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Focus?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands learning to work smarter, not harder. Start with the fundamentals, track your progress, and unlock your potential.
            </p>
            <Button 
              onClick={handleSignUp}
              className="bg-white hover:bg-gray-100 text-black px-8 py-6 text-lg"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-6 md:mb-0">
                <Logo size="sm" />
                <span className="font-semibold text-black">1day</span>
              </div>
              <p className="text-sm text-gray-600 text-center md:text-right">
                Inspired by the deep focus techniques from <a href="https://twitter.com/thedankoe" target="_blank" rel="noopener noreferrer" className="font-semibold text-black hover:underline">Dan Koe</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}