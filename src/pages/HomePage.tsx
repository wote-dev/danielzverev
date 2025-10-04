import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/contexts/ThemeContext';

interface HomePageProps {
  isVisible: boolean;
}

const HomePage: React.FC<HomePageProps> = () => {
  const { theme } = useTheme();

  const projects = [
    {
      date: "2025",
      title: "a1tennis.co - AI Tennis Lesson Generator",
      url: "https://coach-plan.vercel.app"
    },
    {
      date: "2025",
      title: "Simplr (iOS) - Minimal iOS Task Manager App",
      url: "https://apps.apple.com/us/app/simplr-minimal-to-do-app/id6748098464"
    },
    {
      date: "2025",
      title: "HaircutFun.com - Interactive Hair Styling Platform",
      url: "https://haircutfun.com"
    },
    {
      date: "2025",
      title: "Spaces - Task Manager for Business",
      url: "https://web.simplr-app.com"
    }
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="py-3 sm:py-4 px-5 sm:px-6 flex-shrink-0">
        <nav className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="/"
              className={`text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-stone-100 hover:text-stone-400'
                  : 'text-stone-900 hover:text-stone-600'
              }`}
            >
              home
            </a>
            <a
              href="https://cal.com/danielzverev"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-stone-100 hover:text-stone-400'
                  : 'text-stone-900 hover:text-stone-600'
              }`}
            >
              contact
            </a>
          </div>
          <ThemeToggle />
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 sm:px-6 py-4 sm:py-6 overflow-hidden flex flex-col">
        <div className="max-w-3xl mx-auto flex flex-col h-full">
          {/* Title */}
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 flex-shrink-0 ${
            theme === 'dark' ? 'text-stone-100' : 'text-stone-900'
          }`}>
            Daniel Zverev
          </h1>

          {/* Bio */}
          <div className={`text-[13px] sm:text-[15px] leading-relaxed mb-5 sm:mb-8 space-y-2.5 sm:space-y-3 flex-shrink-0 ${
            theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
          }`}>
            <p>
              Hey! My name is Daniel and I'm a full-stack developer. I specialise in modern web and mobile development, with a focus on clean design and intuitive interfaces.
            </p>
            <p>
              Currently, I'm building <a href="https://coach-plan.vercel.app" target="_blank" rel="noopener noreferrer" className={`underline decoration-1 underline-offset-2 transition-colors ${
                theme === 'dark' ? 'hover:text-stone-300' : 'hover:text-stone-800'
              }`}>a1tennis.co</a> - AI-powered Tennis Lesson Generator for Coaches. I'm available for freelance projects and contract work, collaborating with both innovative startups and established companies.
            </p>
            <p>
              Outside of coding, you'll usually find me exploring Melbourne's coffee scene, experimenting with new technologies, or working on side projects just for the fun of it.
            </p>
          </div>

          {/* Projects */}
          <div className="space-y-3 sm:space-y-4 flex-1 overflow-hidden flex flex-col justify-start">
            {projects.map((project, index) => (
              <div key={index} className="flex-shrink-0">
                <div className={`text-[12px] sm:text-[13px] mb-1 ${
                  theme === 'dark' ? 'text-stone-500' : 'text-stone-500'
                }`}>
                  {project.date}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[13px] sm:text-[15px] underline decoration-1 underline-offset-4 transition-colors block leading-snug ${
                    theme === 'dark'
                      ? 'text-stone-300 hover:text-stone-100'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {project.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 sm:py-4 px-5 sm:px-6 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center flex-wrap gap-4 mb-2">
            <a
              href="mailto:admin@blackcubesolutions.com"
              className={`text-[12px] sm:text-[13px] flex items-center gap-1.5 transition-colors ${
                theme === 'dark'
                  ? 'text-stone-500 hover:text-stone-300'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              email
            </a>
            <a
              href="https://x.com/wote_dev"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] sm:text-[13px] flex items-center gap-1.5 transition-colors ${
                theme === 'dark'
                  ? 'text-stone-500 hover:text-stone-300'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              twitter
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-zverev/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] sm:text-[13px] flex items-center gap-1.5 transition-colors ${
                theme === 'dark'
                  ? 'text-stone-500 hover:text-stone-300'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              linkedin
            </a>
            <a
              href="https://github.com/wote-dev"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] sm:text-[13px] flex items-center gap-1.5 transition-colors ${
                theme === 'dark'
                  ? 'text-stone-500 hover:text-stone-300'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              github
            </a>
          </div>
          <div className={`text-[12px] sm:text-[13px] ${
            theme === 'dark' ? 'text-stone-600' : 'text-stone-500'
          }`}>
            © 2025 Daniel Zverev
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;