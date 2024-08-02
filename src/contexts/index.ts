import { createContext, useContext } from 'react';
import { GameData, UserContextProps } from '../types/type';

export const UserContext = createContext<UserContextProps | undefined>(undefined);
export const GameContext = createContext<GameData>(null as any);
export const GameDispatchContext = createContext(null as any);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
