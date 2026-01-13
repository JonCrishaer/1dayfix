import React from 'react';

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizes[size]} rounded-lg bg-black flex items-center justify-center font-bold text-white`}>
      <span className="text-xs">1</span>
    </div>
  );
}