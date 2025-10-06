import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface TechStack {
  name: string;
  icon: string;
  color?: string;
}

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
}

interface Project {
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  techStack: TechStack[];
  media?: MediaItem[];
  caseStudy: {
    challenge: string;
    solution: string;
    impact: string;
    metrics?: string[];
  };
  features: string[];
  timeline: string;
  status: 'Live' | 'Beta' | 'In Development' | 'Completed';
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && project) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Stagger content animations
        setTimeout(() => setAnimationStage(1), 200);
        setTimeout(() => setAnimationStage(2), 350);
        setTimeout(() => setAnimationStage(3), 500);
        setTimeout(() => setAnimationStage(4), 650);
        setTimeout(() => setAnimationStage(5), 800);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setAnimationStage(0);
      setSelectedMediaIndex(0);
      setVideoErrors({});
    }
  }, [isOpen, project]);

  // Force video playback when media changes or modal opens
  useEffect(() => {
    if (isOpen && videoRef.current && project?.media?.[selectedMediaIndex]?.type === 'video') {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.log('Autoplay prevented:', error);
        }
      };
      // Small delay to ensure the video element is ready
      const timer = setTimeout(playVideo, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedMediaIndex, project]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setAnimationStage(0);
    setTimeout(onClose, 400);
  }, [onClose]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const getStatusColor = (status: string) => {
    const { theme } = useTheme();
    const baseClasses = theme === 'dark' ? 'embossed-subtle-dark' : 'embossed-subtle-light';
    
    switch (status) {
      case 'Live':
        return `bg-green-500/20 text-green-600 border-green-500/30 ${baseClasses}`;
      case 'Beta':
        return `bg-blue-500/20 text-blue-600 border-blue-500/30 ${baseClasses}`;
      case 'In Development':
        return `bg-yellow-500/20 text-yellow-600 border-yellow-500/30 ${baseClasses}`;
      case 'Completed':
        return `bg-purple-500/20 text-purple-600 border-purple-500/30 ${baseClasses}`;
      default:
        return `bg-stone-500/20 text-stone-600 border-stone-500/30 ${baseClasses}`;
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      {/* Enhanced Backdrop with Prismatic Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-out ${
          isVisible 
            ? 'opacity-100' 
            : 'opacity-0'
        } ${
          theme === 'dark'
            ? 'bg-stone-900/90 backdrop-blur-xl'
            : 'bg-stone-50/90 backdrop-blur-xl'
        }`}
      />
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-30' : 'opacity-0'
            } ${
              theme === 'dark' ? 'bg-stone-400' : 'bg-stone-600'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 200}ms`
            }}
          />
        ))}
      </div>
      
      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-2xl mx-auto my-auto transition-all duration-600 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <div 
          className={`relative w-full rounded-3xl p-8 transition-all duration-400 max-h-[90vh] overflow-y-auto ${
            theme === 'dark'
              ? 'bg-stone-900/95 embossed-subtle-dark backdrop-blur-lg border border-stone-700/30'
              : 'bg-stone-50/95 embossed-subtle-light backdrop-blur-lg border border-stone-200/30'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className={`absolute top-6 right-6 p-2.5 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 group z-50 pointer-events-auto ${
              theme === 'dark'
                ? 'text-stone-400 hover:text-stone-200 embossed-subtle-dark hover:bg-stone-800/40'
                : 'text-stone-500 hover:text-stone-700 embossed-subtle-light hover:bg-white/40'
            }`}
            aria-label="Close"
            type="button"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header Section */}
          <div className={`text-center mb-8 transition-all duration-500 ease-out ${
            animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Project Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 overflow-hidden transition-all duration-300 hover:scale-105">
                <img 
                  src={project.icon} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className={`absolute inset-0 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-transparent via-transparent to-stone-900/20'
                    : 'bg-gradient-to-br from-transparent via-transparent to-stone-900/10'
                }`} />
              </div>
            </div>

            {/* Project Name & Status (status hidden for ZeddFlight) */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className={`text-4xl font-sf-display-medium tracking-tight transition-all duration-300 ${
                theme === 'dark' 
                  ? 'text-stone-100' 
                  : 'text-stone-900'
              }`}>
                {project.name}
              </h2>
              {project.name !== 'ZeddFlight' && (
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className={`text-lg ${
              theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
            }`}>
              {project.description}
            </p>

            {/* Timeline */}
            <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm ${
              theme === 'dark'
                ? 'bg-stone-800/40 text-stone-400'
                : 'bg-white/40 text-stone-600'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{project.timeline}</span>
            </div>
          </div>

          {/* Media Gallery Section */}
          {project.media && project.media.length > 0 && (
            <div className={`mb-8 transition-all duration-500 ease-out delay-200 ${
              animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {/* Main Media Display */}
              <div className={`relative w-full aspect-video rounded-2xl overflow-hidden mb-4 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-stone-800/40 embossed-subtle-dark'
                  : 'bg-white/40 embossed-subtle-light'
              }`}>
                {project.media[selectedMediaIndex].type === 'video' ? (
                  videoErrors[selectedMediaIndex] ? (
                    // Fallback to poster image if video fails
                    <img
                      src={project.media[selectedMediaIndex].poster || project.icon}
                      alt={project.media[selectedMediaIndex].alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      key={selectedMediaIndex}
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={project.media[selectedMediaIndex].poster}
                      className="w-full h-full object-cover"
                      onError={() => {
                        setVideoErrors(prev => ({ ...prev, [selectedMediaIndex]: true }));
                      }}
                      onLoadedData={() => {
                        // Ensure video plays when loaded
                        videoRef.current?.play().catch(() => {});
                      }}
                    >
                      <source src={project.media[selectedMediaIndex].src} type="video/webm" />
                      <source src={project.media[selectedMediaIndex].src} type="video/mp4" />
                      <source src={project.media[selectedMediaIndex].src} type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <img
                    src={project.media[selectedMediaIndex].src}
                    alt={project.media[selectedMediaIndex].alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Media Thumbnails */}
              {project.media.length > 1 && (
                <div className="flex gap-3 justify-center overflow-x-auto pb-2">
                  {project.media.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMediaIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                        selectedMediaIndex === index
                          ? theme === 'dark'
                            ? 'ring-2 ring-stone-400 embossed-subtle-dark shadow-lg'
                            : 'ring-2 ring-stone-600 embossed-subtle-light shadow-lg'
                          : theme === 'dark'
                            ? 'ring-1 ring-stone-700/50 embossed-subtle-dark opacity-60 hover:opacity-100'
                            : 'ring-1 ring-stone-300/50 embossed-subtle-light opacity-60 hover:opacity-100'
                      }`}
                    >
                      {media.type === 'video' ? (
                        <>
                          <img
                            src={media.poster || project.icon}
                            alt={media.alt}
                            className="w-full h-full object-cover"
                          />
                          {/* Play icon overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <img
                          src={media.src}
                          alt={media.alt}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tech Stack Section */}
          <div className={`mb-8 transition-all duration-500 ease-out delay-300 ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className={`text-xl font-medium mb-4 ${
              theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
            }`}>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {project.techStack.map((tech, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-stone-800/40 embossed-subtle-dark'
                      : 'bg-white/40 embossed-subtle-light'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-5 h-5 object-contain"
                  />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
                  }`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study Section */}
          <div className={`mb-8 transition-all duration-500 ease-out delay-500 ${
            animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className={`text-xl font-medium mb-6 ${
              theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
            }`}>
              Case Study
            </h3>
            
            <div className="space-y-6">
              {/* Challenge */}
              <div className={`p-6 rounded-2xl ${
                theme === 'dark'
                  ? 'bg-stone-800/30 embossed-subtle-dark'
                  : 'bg-white/30 embossed-subtle-light'
              }`}>
                <h4 className={`text-lg font-medium mb-3 flex items-center gap-2 ${
                  theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Challenge
                </h4>
                <p className={`text-base leading-relaxed ${
                  theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
                }`}>
                  {project.caseStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className={`p-6 rounded-2xl ${
                theme === 'dark'
                  ? 'bg-stone-800/30 embossed-subtle-dark'
                  : 'bg-white/30 embossed-subtle-light'
              }`}>
                <h4 className={`text-lg font-medium mb-3 flex items-center gap-2 ${
                  theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Solution
                </h4>
                <p className={`text-base leading-relaxed ${
                  theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
                }`}>
                  {project.caseStudy.solution}
                </p>
              </div>

              {/* Impact */}
              <div className={`p-6 rounded-2xl ${
                theme === 'dark'
                  ? 'bg-stone-800/30 embossed-subtle-dark'
                  : 'bg-white/30 embossed-subtle-light'
              }`}>
                <h4 className={`text-lg font-medium mb-3 flex items-center gap-2 ${
                  theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Impact
                </h4>
                <p className={`text-base leading-relaxed mb-4 ${
                  theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
                }`}>
                  {project.caseStudy.impact}
                </p>
                
                {/* Metrics */}
                {project.caseStudy.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.caseStudy.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-stone-700/40 text-stone-300'
                            : 'bg-stone-100/60 text-stone-700'
                        }`}
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className={`mb-8 transition-all duration-500 ease-out delay-700 ${
            animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className={`text-xl font-medium mb-4 ${
              theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
            }`}>
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'dark'
                      ? 'bg-stone-800/30 embossed-subtle-dark'
                      : 'bg-white/30 embossed-subtle-light'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Section (hidden for ZeddFlight) */}
          <div className={`pt-6 border-t transition-all duration-500 ease-out delay-900 ${
            animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${
            theme === 'dark'
              ? 'border-stone-700/50'
              : 'border-stone-200/50'
          }`}>
            {project.name !== 'ZeddFlight' && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-stone-100/90 text-stone-900 embossed-subtle-light hover:bg-white'
                      : 'bg-stone-900/90 text-white embossed-subtle-dark hover:bg-stone-800'
                  }`}
                >
                  <span>View Project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  );
};