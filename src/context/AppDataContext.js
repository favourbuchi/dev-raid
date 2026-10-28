import { createContext, useContext } from 'react';

export const AppDataContext = createContext(null);

/**
 * Custom hook to consume DevRaid centralized state.
 * @returns {Object} Centralized state and action handlers
 */
export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}

export default AppDataContext;
