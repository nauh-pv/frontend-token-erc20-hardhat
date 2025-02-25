"use client";
import { createContext, useContext, useState } from "react";

interface AppContextType {
  isOpenModalWallet: boolean;
  setIsOpenModalWallet: React.Dispatch<React.SetStateAction<boolean>>;
  isConnectWallet: boolean;
  setIsConnectWallet: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isOpenModalWallet, setIsOpenModalWallet] = useState<boolean>(false);
  const [isConnectWallet, setIsConnectWallet] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isOpenModalWallet,
        setIsOpenModalWallet,
        isConnectWallet,
        setIsConnectWallet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a GlobalProvider");
  }
  return context;
};
