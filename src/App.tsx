import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="w-full h-full">
        <HomePage />
      </div>
    </ThemeProvider>
  );
}

export default App;
