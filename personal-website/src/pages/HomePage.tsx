import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="h-full bg-stone-50 flex items-center justify-center overflow-hidden relative">
      {/* X (Twitter) Button - Top Left */}
      <a
        href="https://x.com/wote_dev"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 left-6 bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow-md"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-sm font-semibold">@wote_dev</span>
      </a>
      
      <div className="text-center">
        <h1 className="text-6xl font-bold text-stone-800 mb-4">
          Hi, I'm Daniel.
        </h1>
        <p className="text-xl text-stone-600 font-medium px-8 sm:px-0">
           I am a software developer and enjoy building websites and iOS apps.
         </p>
      </div>
    </div>
  );
};

export default HomePage;