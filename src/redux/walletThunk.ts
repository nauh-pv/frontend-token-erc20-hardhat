// src/features/wallet/walletThunks.ts
import { ethers } from "ethers";
import {
  setAddress,
  setBalance,
  addToken,
  resetWallet,
  setTokens,
} from "./walletSlice";
import data from "@/token-list.json";
import { AppDispatch, RootState } from "./store";
import { getTokenBalance } from "../utils/getTokenBalance";

let provider: ethers.BrowserProvider | null = null;

export const connectWallet = () => async (dispatch: AppDispatch) => {
  if (!(window as any).ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const walletAddress = accounts[0];

    dispatch(setAddress(walletAddress));
    dispatch(getBalance(walletAddress));
    dispatch(getFLPBalance(walletAddress));
  } catch (error) {
    console.error("Error connecting wallet:", error);
    dispatch(resetWallet());
  }
};

// Lấy số dư ETH trong ví
export const getBalance =
  (walletAddress: string) => async (dispatch: AppDispatch) => {
    if (!provider) return;
    try {
      const balance = await provider.getBalance(walletAddress);
      dispatch(setBalance(ethers.formatEther(balance)));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

// Lấy số dư token FLP
export const getFLPBalance =
  (walletAddress: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    if (!provider) return;
    try {
      const balance = await getTokenBalance(provider, walletAddress, data.FLP);
      const currentTokens = getState().wallet.tokens;

      const indexSLP = currentTokens.findIndex(
        (token) => token.symbol === "FLP"
      );

      if (indexSLP !== -1) {
        if (currentTokens[indexSLP].balance! == balance) {
          return;
        }
        const updatedTokens = currentTokens.map((token) => {
          if (token.symbol === "FLP") {
            return { symbol: "FLP", balance };
          }
          return token;
        });
        dispatch(setTokens(updatedTokens));
      } else {
        dispatch(addToken({ symbol: "FLP", balance }));
      }
    } catch (error) {
      console.error("Error fetching FLP balance:", error);
    }
  };
