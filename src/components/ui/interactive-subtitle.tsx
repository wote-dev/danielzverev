import { useTheme } from '@/contexts/ThemeContext';

interface InteractiveSubtitleProps {
  animationStage: number;
}

function InteractiveSubtitle({ animationStage }: InteractiveSubtitleProps) {
  const { theme } = useTheme();

  const bigImages = [
    '/cece.png',
    '/obsdn.png'
  ];

  const smallImages = [
    '/simplr2.jpg',
    '/simplr3.jpg'
  ];

  const renderWordWithImages = (word: string, images: string[]) => {
    return (
      <span 
        className="relative inline-block group"
      >
        <span className={`font-bold transition-all duration-300 cursor-pointer ${
          theme === 'dark' 
            ? 'text-stone-200 group-hover:text-stone-100' 
            : 'text-stone-700 group-hover:text-stone-900'
        }`}>
          {word}
        </span>
        
        {/* Image containers */}
        <div className="absolute right-2 -top-1 z-40 h-12 w-10 pointer-events-none">
          <div className={`relative duration-500 delay-100 shadow-none group-hover:shadow-xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-10 h-10 overflow-hidden transition-all rounded-md`}>
            <img 
              alt={`${word} screen example`} 
              src={images[1]} 
              className="h-full w-full object-cover" 
            />
          </div>
        </div>
        
        <div className={`absolute right-2 -top-1 z-40 h-12 w-10 pointer-events-none translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:rotate-12`}>
          <div className={`relative duration-200 delay-100 shadow-none group-hover:shadow-xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-10 h-10 overflow-hidden transition-all rounded-md`}>
            <img 
              alt={`${word} screen example`} 
              src={images[0]} 
              className="h-full w-full object-cover" 
            />
          </div>
        </div>
      </span>
    );
  };

  return (
    <div className={`text-base sm:text-lg font-medium max-w-sm sm:max-w-md mx-auto leading-snug transition-all duration-300 delay-100 ${
      theme === 'dark' 
        ? 'text-stone-400' 
        : 'text-stone-500'
    } ${
      animationStage >= 3 ? 'opacity-100' : 'opacity-0'
    }`}>
      Making ideas happen on screens, {renderWordWithImages('big', bigImages)} and {renderWordWithImages('small', smallImages)}.
    </div>
  );
}

export { InteractiveSubtitle };