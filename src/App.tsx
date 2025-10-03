import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <HomePage isVisible={true} />
    </ThemeProvider>
  );
}

export default App;