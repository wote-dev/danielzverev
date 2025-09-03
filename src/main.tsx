import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Enhanced fix for mobile Safari viewport height
function setViewportHeight() {
  // Use the smaller of window.innerHeight and screen.height for iOS Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  
  let height = window.innerHeight;
  
  // For iOS Safari, use a more aggressive approach
  if (isIOS && isSafari) {
    // Use visualViewport if available (modern iOS)
    if (window.visualViewport) {
      height = window.visualViewport.height;
    } else {
      // Fallback for older iOS versions
      height = Math.min(window.innerHeight, screen.height);
    }
  }
  
  const vh = height * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Also set a CSS custom property for the full height
  document.documentElement.style.setProperty('--full-height', `${height}px`);
}

// Set initial viewport height
setViewportHeight();

// Enhanced event listeners for mobile Safari
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  // Multiple timeouts to catch Safari's delayed viewport changes
  setTimeout(setViewportHeight, 100);
  setTimeout(setViewportHeight, 300);
  setTimeout(setViewportHeight, 500);
});

// Listen for visual viewport changes (iOS Safari)
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', setViewportHeight);
}

// Additional listeners for iOS Safari address bar changes
window.addEventListener('scroll', setViewportHeight);
window.addEventListener('touchstart', () => {
  setTimeout(setViewportHeight, 300);
});

// Force recalculation on page visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    setTimeout(setViewportHeight, 100);
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
