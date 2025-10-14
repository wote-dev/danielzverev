import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface TechStack {
  name: string;
  icon: string;
  color?: string;
}

interface Project {
  name: string;
  description: string;
  longDescription?: string;
  url: string;
  icon: string;
  color: string;
  techStack: TechStack[];
  timeline: string;
  status: 'Live' | 'Beta' | 'In Development' | 'Completed';
}

interface UniversalProjectDisplayProps {
  projects: Project[];
  className?: string;
  onProjectClick: (project: Project) => void;
}

const UniversalProjectDisplay: React.FC<UniversalProjectDisplayProps> = ({ projects, className = '', onProjectClick }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleProjectClick = (project: Project) => {
    onProjectClick(project);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative z-50 ${className}`}>
      {/* Floating Action Button - Matches pill aesthetic */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`group relative px-4 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 ${
          theme === 'dark'
            ? 'bg-stone-900/40 text-stone-400 embossed-subtle-dark hover:bg-stone-900/60 hover:text-stone-300 focus:ring-stone-500'
            : 'bg-stone-50/40 text-stone-500 embossed-subtle-light hover:bg-stone-50/60 hover:text-stone-600 focus:ring-stone-400'
        }`}
        aria-label="View projects"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {/* Folder Icon */}
          <svg
            className="w-4 h-4 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          
          {/* Label Text */}
          <span className="text-xs font-medium tracking-wide">
            Projects
          </span>
          
          {/* Notification Badge */}
          {projects.length > 0 && (
            <span className={`px-1.5 py-0.5 text-xs rounded-full font-medium transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-stone-700/50 text-stone-300'
                : 'bg-stone-200/50 text-stone-600'
            }`}>
              {projects.length}
            </span>
          )}
        </div>
      </button>

      {/* Project Menu */}
      <div
        ref={menuRef}
        className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div
          className={`min-w-[280px] max-w-sm rounded-2xl shadow-2xl overflow-hidden border ${
            theme === 'dark'
              ? 'bg-stone-900/95 backdrop-blur-sm border-stone-700/50'
              : 'bg-white/95 backdrop-blur-sm border-stone-200/50'
          }`}
        >
          {/* Menu Header */}
          <div
            className={`px-4 py-3 border-b ${
              theme === 'dark' ? 'border-stone-700/50' : 'border-stone-200/50'
            }`}
          >
            <h3
              className={`text-sm font-medium ${
                theme === 'dark' ? 'text-stone-200' : 'text-stone-700'
              }`}
            >
              My Projects/Work
            </h3>
            <p
              className={`text-xs ${
                theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
              }`}
            >
              Click to explore
            </p>
          </div>

          {/* Project List */}
          <div className="py-2">
            {projects.map((project, index) => {
              const baseClasses = `w-full px-4 py-3 flex items-center space-x-3 transition-all duration-200 ${
                theme === 'dark' ? 'hover:bg-stone-900/60' : 'hover:bg-stone-50/60'
              } ${
                index !== projects.length - 1
                  ? theme === 'dark'
                    ? 'border-b border-stone-700/30'
                    : 'border-b border-stone-200/30'
                  : ''
              }`;

              const content = (
                <>
                  {/* Project Icon */}
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={project.icon}
                      alt={project.name}
                      className="w-8 h-8 object-contain rounded-full"
                      loading="lazy"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 text-left">
                    <h4
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-stone-100' : 'text-stone-800'
                      }`}
                    >
                      {project.name}
                    </h4>
                    <p
                      className={`text-xs ${
                        theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* External Link Icon */}
                  <svg
                    className={`w-4 h-4 flex-shrink-0 ${
                      theme === 'dark' ? 'text-stone-400' : 'text-stone-400'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </>
              );

              return (
                <button
                  key={index}
                  onClick={() => handleProjectClick(project)}
                  className={`${baseClasses} hover:scale-[1.02] active:scale-[0.98]`}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalProjectDisplay;