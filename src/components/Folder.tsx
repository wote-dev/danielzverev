import React, { useState, useEffect } from 'react';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside (mobile only)
  useEffect(() => {
    if (!isMobile || !open) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-folder-dropdown]')) {
        setOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, open]);

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = 'var(--color-muted)';
  const paper2 = 'var(--color-background)';
  const paper3 = 'var(--color-background)';

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number) => {
    // Desktop positions only (mobile uses dropdown)
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  };

  // Mobile dropdown menu
  if (isMobile) {
    return (
      <div className={className}>
        <div className="relative" data-folder-dropdown>
          {/* Mobile folder button */}
          <button
            onClick={handleClick}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-105 ${
              open 
                ? 'bg-stone-900/60 embossed-subtle-dark scale-110' 
                : 'bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
            } ${open ? 'dark:bg-stone-50/60 dark:embossed-subtle-light' : 'dark:bg-stone-50/40 dark:embossed-subtle-light dark:hover:bg-stone-50/60'}`}
          >
            <svg 
              className={`w-5 h-5 transition-colors duration-300 ${
                open 
                  ? 'text-stone-300 dark:text-stone-600' 
                  : 'text-stone-400 dark:text-stone-500'
              }`}
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
          </button>
          
          {/* Mobile dropdown menu */}
          {open && (
            <div className="absolute bottom-full right-0 mb-3 bg-stone-50/40 dark:bg-stone-900/40 embossed-subtle-light dark:embossed-subtle-dark rounded-2xl backdrop-blur-sm overflow-hidden min-w-[220px] z-50 border border-stone-200/20 dark:border-stone-700/20">
              {papers.map((item, i) => {
                if (!item) return null;
                return (
                  <div
                    key={i}
                    className="p-4 hover:bg-stone-100/60 dark:hover:bg-stone-800/60 transition-all duration-300 hover:scale-[1.02] border-b border-stone-200/30 dark:border-stone-700/30 last:border-b-0 cursor-pointer"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop folder animation (existing code)
  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          ...folderStyle,
          transform: open ? 'translateY(-8px)' : undefined
        }}
        onClick={handleClick}
      >
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {papers.map((item, i) => {
            let sizeClasses = '';
            // Default desktop sizes
            if (i === 0) sizeClasses = open ? 'w-[70%] h-[80%]' : 'w-[70%] h-[80%]';
            if (i === 1) sizeClasses = open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';
            if (i === 2) sizeClasses = open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={() => handlePaperMouseLeave(i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                  !open ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0' : 'hover:scale-110'
                } ${sizeClasses}`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                  borderRadius: '10px'
                }}
              >
                {item}
              </div>
            );
          })}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
