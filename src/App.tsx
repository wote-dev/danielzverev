import { useState } from 'react';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingScreen } from './components/ui/loading-screen';
import { GridBackground } from './components/GridBackground';

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

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="w-full h-full min-h-screen min-h-dvh full-viewport relative bg-background transition-colors duration-500">
        <GridBackground />
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        <HomePage isVisible={!isLoading} />
      </div>
    </ThemeProvider>
  );
}

export default App;