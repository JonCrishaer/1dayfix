import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Home } from 'lucide-react';
import Logo from './components/Logo';

export default function Layout({ children, currentPageName }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
    { name: 'Training', icon: BookOpen, page: 'Learn' },
  ];

  const isHome = currentPageName === 'Home';

  return (
    <div className="min-h-screen bg-white">
      {!isHome && (
        <>
          {/* Mobile Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 sm:hidden">
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
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-black border border-black' 
                          : 'bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                    </motion.div>
                    <span className={`text-xs ${isActive ? 'text-black' : 'text-gray-600'}`}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
            <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo size="md" />
                <span className="font-bold text-black text-lg tracking-tight">1day</span>
              </div>

              <div className="flex items-center gap-1">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentPageName === item.page;
                  return (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-black'
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
        </>
      )}

      {/* Main Content */}
      <main className={!isHome ? 'sm:pt-20 pb-24 sm:pb-8' : ''}>
        {children}
      </main>
    </div>
  );
}