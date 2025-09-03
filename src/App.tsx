import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingScreen } from './components/ui/loading-screen';
import { SimplrPrompt } from './components/ui/simplr-prompt';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSimplrPrompt, setShowSimplrPrompt] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Show Simplr prompt after loading completes and a brief delay
    if (!isLoading) {
      const timer = setTimeout(() => {
        // Check if user has already seen the prompt in this session
        const hasSeenPrompt = sessionStorage.getItem('simplr-prompt-seen');
        if (!hasSeenPrompt) {
          setShowSimplrPrompt(true);
        }
      }, 2000); // Show after 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleCloseSimplrPrompt = () => {
    setShowSimplrPrompt(false);
    // Mark as seen for this session
    sessionStorage.setItem('simplr-prompt-seen', 'true');
  };

  return (
    <ThemeProvider>
      <div className="w-full h-full">
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        <HomePage isVisible={!isLoading} />
        {showSimplrPrompt && <SimplrPrompt onClose={handleCloseSimplrPrompt} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
