import { createContext } from "react";

export const WalletContext = createContext({
  walletAddress: "",
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
});
