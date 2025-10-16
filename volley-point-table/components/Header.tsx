
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-slate-900/50 backdrop-blur-sm sticky top-0">
      <div className="flex items-center justify-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Volley Point Table
        </h1>
      </div>
      <p className="text-slate-400 mt-2">Track scores and rankings with persistent storage.</p>
    </header>
  );
};

export default Header;
