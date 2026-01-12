'use client';
import { 
  FluentProvider, 
  webLightTheme, 
  webDarkTheme, 
  SSRProvider, 
  RendererProvider, 
  createDOMRenderer 
} from '@fluentui/react-components';
import React, { createContext, useContext, useState, useMemo } from 'react';

// Create a context so any component can toggle the theme
const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

const renderer = createDOMRenderer();

export function Providers({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? webDarkTheme : webLightTheme;

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <FluentProvider theme={theme} style={{ minHeight: '100vh' }}>
            {children}
          </FluentProvider>
        </ThemeContext.Provider>
      </SSRProvider>
    </RendererProvider>
  );
}