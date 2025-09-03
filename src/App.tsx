import { useState } from 'react';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingScreen } from './components/ui/loading-screen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen">
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        <HomePage isVisible={!isLoading} />
      </div>
    </ThemeProvider>
  );
}

export default App;
