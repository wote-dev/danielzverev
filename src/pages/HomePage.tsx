import React, { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { TechStackCarousel } from '@/components/ui/tech-stack-carousel';
import { SocialLink } from '@/components/ui/social-link';
import { BioModal } from '@/components/ui/bio-modal';
import { ProjectModal } from '@/components/ui/project-modal';
import { InteractiveSubtitle } from '@/components/ui/interactive-subtitle';
import { useTheme } from '@/contexts/ThemeContext';
import UniversalProjectDisplay from '@/components/UniversalProjectDisplay';


interface HomePageProps {
  isVisible: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isVisible }) => {
  const { theme } = useTheme();
  const [showBioModal, setShowBioModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [animationStage, setAnimationStage] = useState(0);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  // Projects data for the universal display
  const projects = [
    {
      name: "Simplr (iOS)",
      description: "Minimal iOS To-Do App",
      url: "https://apps.apple.com/us/app/simplr-minimal-to-do-app/id6748098464",
      icon: "/simplr-round.png",
      color: "#5227FF",
      status: "Live" as const,
      timeline: "1 month",
      techStack: [
        { name: "Swift", icon: "/swift.png" },
        { name: "SwiftUI", icon: "/swift.png" },
        { name: "CloudKit", icon: "/swift.png" }
      ],
      caseStudy: {
        challenge: "The to-do app market is oversaturated with complex, feature-heavy applications that overwhelm users. Most apps prioritize functionality over user experience, leading to abandoned workflows and decreased productivity.",
        solution: "I designed Simplr with a radical minimalist approach, focusing on three core principles: instant task capture, zero cognitive load, and beautiful simplicity. The app uses advanced SwiftUI animations and haptic feedback to create an almost meditative user experience.",
        impact: "Simplr has achieved remarkable user engagement with a 4.8-star rating and consistent daily usage patterns. Users report feeling less overwhelmed and more productive, with many describing it as 'the only to-do app they actually use.'",
        metrics: [
          "4.8★ App Store Rating",
          "85% Daily Active Users",
          "2.3s Average Task Creation",
          "Featured by Apple"
        ]
      },
      features: [
        "Instant task capture with haptic feedback",
        "Intelligent priority sorting",
        "Cross-device CloudKit sync",
        "Dark mode with custom themes",
        "Gesture-based interactions",
        "Privacy-first design"
      ]
    },
    {
      name: "Cece Natalie",
      description: "UMG Artist Website",
      url: "https://cece-natalie.com",
      icon: "/circle.png",
      color: "#10B981",
      status: "Live" as const,
      timeline: "2 months",
      techStack: [
        { name: "HTML", icon: "/html-5.png" },
        { name: "CSS", icon: "/css.png" },
        { name: "JavaScript", icon: "/js-svg.svg" }
      ],
      caseStudy: {
        challenge: "Universal Music Group needed a simple, yet moody artist website for Cece that would showcase her music while maintaining her unique grunge aesthetic. The site needed to handle high traffic spikes during releases.",
        solution: "I created a visually grungy, performance-optimised website using vanilla HTML, CSS, and JavaScript. As a one-page, multi-tab site, it didn't warrant a complex framework. The design features custom animations, responsive layouts, and seamless music integration. Advanced caching and CDN optimization ensure lightning-fast load times globally.",
        impact: "The website successfully launched alongside Cece's debut single, handling massive traffic spikes without performance degradation. The site has become a template for other UMG artist websites due to its exceptional design and technical excellence.",
        metrics: [
          "100% Uptime",
          "< 1.2s Load Time",
          "Thousands of Monthly Visitors",
          "95+ Lighthouse Score"
        ]
      },
      features: [
        "Immersive music player integration",
        "Dynamic content management",
        "Social media aggregation",
        "Tour date management",
        "Mobile-first responsive design",
        "SEO optimized for music discovery"
      ]
    },
    {
      name: "Spaces (Beta)",
      description: "Auto Assigning Task Manager",
      url: "https://web.simplr-app.com",
      icon: "/favicon-spaces.png",
      color: "#6366F1",
      status: "Beta" as const,
      timeline: "3 weeks (ongoing)",
      techStack: [
        { name: "React", icon: "/react.png" },
        { name: "TypeScript", icon: "/typescript.png" },
        { name: "Node.js", icon: "/node-js.png" },
        { name: "Supabase", icon: "/supabase.png" },
        { name: "Tailwind CSS", icon: "/Tailwind.png" },
        { name: "Vite", icon: "/vite.png" }
      ],
      caseStudy: {
        challenge: "Modern knowledge workers struggle with fragmented workflows across dozens of apps. Context switching between tools destroys focus and productivity. Existing productivity platforms are either too simple or overwhelmingly complex.",
        solution: "Spaces reimagines productivity by creating intelligent, contextual workspaces that adapt to your workflow. Using advanced AI and intuitive design, it seamlessly connects tasks, notes, files, and communications in a unified experience that feels natural and powerful.",
        impact: "Beta users report a 40% reduction in context switching and significantly improved focus. The platform is being tested by several Fortune 500 companies for potential enterprise adoption, with overwhelmingly positive feedback on user experience.",
        metrics: [
          "40% Reduced Context Switching",
          "2.5x Faster Task Completion",
          "92% User Satisfaction",
          "Enterprise Interest from F500"
        ]
      },
      features: [
        "AI-powered workspace organization",
        "Real-time collaborative editing",
        "Intelligent task prioritization",
        "Cross-platform synchronization",
        "Advanced search and filtering",
        "Customizable workflow automation"
      ]
    },
    {
      name: "HaircutFun",
      description: "Interactive Hair Styling Platform",
      url: "https://haircutfun.com",
      icon: "/haircutfun.png",
      color: "#FF6B6B",
      status: "Live" as const,
      timeline: "2 weeks (ongoing)",
      techStack: [
        { name: "React", icon: "/react.png" },
        { name: "TypeScript", icon: "/typescript.png" },
        { name: "Tailwind CSS", icon: "/Tailwind.png" },
        { name: "Next.js", icon: "/nextjs.svg" },
        { name: "Vercel", icon: "/vercel.svg" }
      ],
      caseStudy: {
        challenge: "The hair styling industry lacks accessible, interactive tools for clients to visualize different hairstyles before committing to a cut. Traditional consultation methods rely heavily on static images and verbal descriptions, leading to miscommunication and unsatisfied customers.",
        solution: "HaircutFun bridges this gap with an innovative web platform that allows users to experiment with various hairstyles in real-time. Built with React 19 and modern web technologies, the platform offers intuitive styling tools, realistic previews, and seamless user experience across all devices.",
        impact: "The platform has revolutionized how people approach hair styling decisions, reducing consultation time and increasing customer satisfaction. Hair salons using the platform report significantly fewer revision requests and higher client retention rates.",
        metrics: [
          "95% User Satisfaction",
          "50% Reduced Consultation Time",
          "10K+ Monthly Active Users",
          "Featured in Beauty Tech"
        ]
      },
      features: [
        "Real-time hair style visualization",
        "Interactive styling tools",
        "Mobile-responsive design",
        "Social sharing capabilities",
        "Salon integration features",
        "Performance-optimized rendering"
      ]
    }
  ];

  useEffect(() => {
    if (isVisible) {
      const stages = [1, 2, 3, 4, 5];
      stages.forEach((stage, index) => {
        setTimeout(() => {
          setAnimationStage(stage);
        }, index * 150);
      });
      

    }
  }, [isVisible]);
  
  useEffect(() => {
    if (isVisible) {
      const nudgeTimer = setTimeout(() => {
        setShowNudge(true);
      }, 3000); // Show nudge after 3 seconds

      return () => clearTimeout(nudgeTimer);
    }
  }, [isVisible]);

  const handleInteraction = () => {
    setShowNudge(false);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };
  
  return (
    <div className={`w-full min-h-dvh flex items-center justify-center overflow-y-auto fixed inset-0`}>
      {/* Content wrapper - background bleeds to edges, content uses safe areas */}
      <div className="w-full h-full relative flex items-center justify-center">

      

      {/* Coordinates - Top Center */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 ease-out hidden sm:block ${
        animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`} style={{top: `calc(2rem + env(safe-area-inset-top))`}}>
        <div className={`px-4 py-2 font-sans text-xs font-medium rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
          theme === 'dark'
            ? 'bg-stone-900/40 text-stone-400 embossed-subtle-dark hover:bg-stone-900/60 hover:text-stone-300'
            : 'bg-stone-50/40 text-stone-500 embossed-subtle-light hover:bg-stone-50/60 hover:text-stone-600'
        }`}>
          <span className="tracking-wide flex items-center gap-1.5">
            <svg className="w-3 h-3 fill-red-500" viewBox="0 0 16 16">
              <path d="M8 0a5 5 0 0 0-5 5c0 5 5 10 5 10s5-5 5-10a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            <span>Melbourne, AU</span>
          </span>
        </div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className={`absolute z-10 transition-all duration-700 ease-out delay-75 ${
        animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`} style={{top: `calc(2rem + env(safe-area-inset-top))`, right: `calc(1.2rem + env(safe-area-inset-right))`}}>
        <ThemeToggle />
      </div>

      {/* Status Indicator - Top Left */}
      <div className={`absolute z-10 transition-all duration-700 ease-out delay-150 ${
        animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`} style={{top: `calc(2rem + env(safe-area-inset-top))`, left: `calc(1.5rem + env(safe-area-inset-left))`}}>
        <div className={`px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
          theme === 'dark'
            ? 'bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
            : 'bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className={`text-xs font-medium transition-colors duration-300 ${
              theme === 'dark' 
                ? 'text-stone-400' 
                : 'text-stone-500'
            }`}>
              Available
            </span>
          </div>
        </div>
      </div>
      
      {/* Social Links and Projects - Bottom */}
      <div className={`absolute z-10 transition-all duration-700 ease-out delay-300 ${
        animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`} style={{bottom: `calc(2rem + env(safe-area-inset-bottom))`, left: `calc(1.5rem + env(safe-area-inset-left))`, right: `calc(1.5rem + env(safe-area-inset-right))`}}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <SocialLink
              href="mailto:admin@blackcubesolutions.com"
              label="Email"
              delay={100}
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              }
            />
            
            <SocialLink
              href="https://x.com/wote_dev"
              target="_blank"
              rel="noopener noreferrer"
              label="X (Twitter)"
              delay={200}
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              }
            />
            
            <SocialLink
              href="https://www.linkedin.com/in/daniel-zverev/"
              target="_blank"
              rel="noopener noreferrer"
              label="LinkedIn"
              delay={300}
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              }
            />
            
            <SocialLink
              href="https://github.com/wote-dev"
              target="_blank"
              rel="noopener noreferrer"
              label="GitHub"
              delay={400}
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              }
            />
          </div>
          
          <div className={`transition-all duration-700 ease-out delay-375 ${
            animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <UniversalProjectDisplay projects={projects} onProjectClick={handleProjectClick} />
          </div>
        </div>
      </div>

      {/* Central Content */}
      <div className="flex flex-col items-center justify-center h-full px-4 relative z-0 -mt-16 pt-16 pb-16 sm:pt-0 sm:pb-0">
        <div className="text-center space-y-8 relative z-10">
          <div className={`space-y-3 transition-all duration-1000 ease-out delay-450 ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Avatar */}
            <div className="flex justify-center mb-3">
              <div className="relative">
                {/* Tooltip */}
                <div
                  className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap pointer-events-none transition-all duration-200 z-20 ${
                    isHoveringAvatar || showNudge
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-1'
                  } ${
                    theme === 'dark'
                      ? 'bg-stone-800/90 text-stone-200 shadow-lg'
                      : 'bg-white/90 text-stone-700 shadow-lg'
                  }`}
                >
                  Click to read my bio
                  {/* Arrow */}
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent ${
                      theme === 'dark' ? 'border-t-stone-800/90' : 'border-t-white/90'
                    }`}
                  />
                </div>
                
                <button
                  onClick={() => {
                    setShowBioModal(true);
                    handleInteraction();
                  }}
                  onMouseEnter={() => {
                    setIsHoveringAvatar(true);
                    handleInteraction();
                  }}
                  onMouseLeave={() => setIsHoveringAvatar(false)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    theme === 'dark'
                      ? 'ring-2 ring-stone-700/50 shadow-xl focus:ring-stone-500 focus:ring-offset-stone-900'
                      : 'ring-2 ring-stone-200/50 shadow-lg focus:ring-stone-400 focus:ring-offset-stone-50'
                  }`}
                  aria-label="View bio"
                >
                  <img 
                    src="/me.png" 
                    alt="Daniel Zverev" 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Tooltip */}
              <div
                className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap pointer-events-none transition-all duration-200 z-20 ${
                  isHoveringName
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-1'
                } ${
                  theme === 'dark'
                    ? 'bg-stone-800/90 text-stone-200 shadow-lg'
                    : 'bg-white/90 text-stone-700 shadow-lg'
                }`}
              >
                Click to read my bio
                {/* Arrow */}
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent ${
                      theme === 'dark' ? 'border-t-stone-800/90' : 'border-t-white/90'
                  }`}
                />
              </div>
              
              <button
                onClick={() => {
                  setShowBioModal(true);
                  handleInteraction();
                }}
                onMouseEnter={() => setIsHoveringName(true)}
                onMouseLeave={() => setIsHoveringName(false)}
                className={`text-5xl sm:text-6xl md:text-7xl font-sf-display-medium tracking-tight transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg px-2 py-1 ${
                  theme === 'dark' 
                    ? 'text-stone-100 hover:text-stone-200 focus:ring-stone-500 focus:ring-offset-stone-900' 
                    : 'text-stone-900 hover:text-stone-700 focus:ring-stone-400 focus:ring-offset-stone-50'
                }`}
                aria-label="View bio"
              >
                Daniel Zverev
              </button>
            </div>
            
            <InteractiveSubtitle animationStage={animationStage} />
          </div>
          
          {/* Tech Stack Carousel - Below Subtitle{/* Tech Stack */}
          <div className={`-mt-6 transition-all duration-700 ease-out delay-600 ${
            animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <TechStackCarousel />
          </div>
          
          {/* Call to Action */}
        <div className={`flex flex-row items-center justify-center gap-3 -mt-4 transition-all duration-700 ease-out delay-700 ${
          animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
            <a 
              href="mailto:admin@blackcubesolutions.com" 
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-stone-100/90 text-stone-900 embossed-subtle-light hover:bg-white'
                  : 'bg-stone-900/90 text-white embossed-subtle-dark hover:bg-stone-800'
              }`}
            >
              Get In Touch
            </a>
            
            <a 
              href="https://cal.com/danielzverev" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'text-stone-400 hover:text-stone-300 bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
                  : 'text-stone-500 hover:text-stone-600 bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60'
              }`}
            >
              Schedule a Call
            </a>
          </div>

        </div>
      </div>
      
      {/* Bio Modal */}
      <BioModal 
        isOpen={showBioModal} 
        onClose={() => setShowBioModal(false)} 
      />
      
      {/* Project Modal */}
      <ProjectModal 
        isOpen={showProjectModal} 
        onClose={() => setShowProjectModal(false)}
        project={selectedProject}
      />
      </div>
    </div>
  );
};

export default HomePage;