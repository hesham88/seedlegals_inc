import React, { createContext, useContext } from 'react';

interface PrivacyContextType {
  privacyMode: boolean;
  togglePrivacyMode: () => void;
  setPrivacyMode: (mode: boolean) => void;
}

const PrivacyContext = createContext<PrivacyContextType>({
  privacyMode: true,
  togglePrivacyMode: () => {},
  setPrivacyMode: () => {},
});

export const PrivacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PrivacyContext.Provider
      value={{
        privacyMode: true,
        togglePrivacyMode: () => {},
        setPrivacyMode: () => {},
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => useContext(PrivacyContext);
