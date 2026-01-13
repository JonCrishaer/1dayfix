import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Zap } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
    { name: 'Training', icon: BookOpen, page: 'Learn' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 sm:hidden">
        <div className="flex justify-around py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className="flex flex-col items-center gap-1 py-2 px-4"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-gradient-to-br from-violet-500 to-purple-600' 
                      : 'bg-slate-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </motion.div>
                <span className={`text-xs ${isActive ? 'text-white' : 'text-slate-500'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Deep Focus</span>
          </div>

          <div className="flex items-center gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="sm:pt-16 pb-24 sm:pb-8">
        {children}
      </main>
    </div>
  );
}