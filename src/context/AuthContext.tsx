import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { initialUser } from '../data/mockUser';

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email?: string, password?: string) => boolean;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  toggleHideAccount: () => void;
  completeOnboarding: () => void;
  savedPin: string;
  setSavedPin: (pin: string) => void;
  registeredPhone: string;
  setRegisteredPhone: (phone: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [savedPin, setSavedPin] = useState<string>('8943');
  const [registeredPhone, setRegisteredPhone] = useState<string>('+1 234 567 8900');

  const login = (_email?: string, _password?: string): boolean => {
    setIsAuthenticated(true);
    return true;
  };

  const signup = (userData: Partial<User>) => {
    setUser((prev) => ({
      ...prev,
      ...userData,
      name: userData.name || `${userData.firstName || 'Alexander'} ${userData.lastName || 'Michael'}`,
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
      name:
        updatedData.firstName || updatedData.lastName
          ? `${updatedData.firstName || prev.firstName} ${updatedData.lastName || prev.lastName}`
          : prev.name,
    }));
  };

  const toggleHideAccount = () => {
    setUser((prev) => ({
      ...prev,
      hideAccount: !prev.hideAccount,
    }));
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isOnboarded,
        login,
        signup,
        logout,
        updateProfile,
        toggleHideAccount,
        completeOnboarding,
        savedPin,
        setSavedPin,
        registeredPhone,
        setRegisteredPhone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
