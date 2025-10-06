import { useState } from 'react';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingScreen } from './components/ui/loading-screen';
import { GridBackground } from './components/GridBackground';
import SafariBarsOverlay from './components/SafariBarsOverlay';

function App() {
  // Skip the loader when we trigger a fast iOS theme reload
  const [isLoading, setIsLoading] = useState(() => {
    try {
      const skip = sessionStorage.getItem('skip-preloader');
      if (skip) {
        sessionStorage.removeItem('skip-preloader');
        return false;
      }
    } catch {}
    return true;
  });

  // If this is an iOS theme reload, also suppress entrance animations after boot
  const [suppressEntrance] = useState(() => {
    try {
      const v = sessionStorage.getItem('skip-animations');
      if (v) {
        sessionStorage.removeItem('skip-animations');
        return true;
      }
    } catch {}
    return false;
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="w-full h-full min-h-screen min-h-dvh full-viewport relative bg-background transition-colors duration-500">
        <GridBackground />
        <SafariBarsOverlay />
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        <HomePage isVisible={!isLoading} suppressEntrance={suppressEntrance} />
      </div>
    </ThemeProvider>
  );
}

export default App;