import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo size="sm" />
              <span className="font-bold text-black">1DAY</span>
            </div>
            <p className="text-sm text-gray-600">Change your life in one day</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-black mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to={createPageUrl('Dashboard')} className="hover:text-black transition">Dashboard</Link></li>
              <li><Link to={createPageUrl('Learn')} className="hover:text-black transition">Training</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-4 text-sm">Learning</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition">Deep Work</a></li>
              <li><a href="#" className="hover:text-black transition">Focus Techniques</a></li>
              <li><a href="#" className="hover:text-black transition">Productivity</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="https://twitter.com/thedankoe" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">Dan Koe</a></li>
              <li><a href="#" className="hover:text-black transition">Documentation</a></li>
              <li><a href="#" className="hover:text-black transition">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2026 1DAY. Inspired by Dan Koe's deep work methodology.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-black transition">Privacy</a>
            <a href="#" className="hover:text-black transition">Terms</a>
            <a href="#" className="hover:text-black transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}