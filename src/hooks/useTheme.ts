import { useEffect } from 'react';

export const useThemeSync = () => {
  useEffect(() => {
    // Get the main app theme container
    const mainTheme = document.querySelector('#root .atom-theme');
    const dialogRoot = document.getElementById('dialog-root');

    if (!mainTheme || !dialogRoot) return;

    // Initial sync
    const currentTheme = mainTheme.getAttribute('data-theme') || 'light';
    dialogRoot.setAttribute('data-theme', currentTheme);

    // Watch for theme changes using MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = mainTheme.getAttribute('data-theme') || 'light';
          dialogRoot.setAttribute('data-theme', newTheme);
        }
      });
    });

    observer.observe(mainTheme, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);
};
