import React, { createContext, useContext, useState, useEffect } from 'react';
import { CmsSettings } from '../types';
import { fetchCmsSettings } from '../services/dataService';

interface SettingsContextType {
  settings: CmsSettings | null;
  loading: boolean;
  error: Error | null;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CmsSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadSettings = async (force = false) => {
    try {
      setLoading(true);
      const data = await fetchCmsSettings(force);
      if (data) {
        setSettings(data);
        // Set dynamic tab title
        if (data.title) {
          document.title = data.title;
        }
      }
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, error, refreshSettings: () => loadSettings(true) }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
