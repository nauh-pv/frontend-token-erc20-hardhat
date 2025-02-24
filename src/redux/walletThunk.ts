// src/features/wallet/walletThunks.ts
import { ethers } from "ethers";
import { setAddress, setBalance, addToken, resetWallet } from "./walletSlice";
import data from "@/token-list.json";
import { AppDispatch } from "./store";
import { getTokenBalance } from "../utils/getTokenBalance";

let provider: ethers.BrowserProvider | null = null;

// Kết nối ví MetaMask
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
  (walletAddress: string) => async (dispatch: AppDispatch) => {
    if (!provider) return;
    try {
      const balance = await getTokenBalance(provider, walletAddress, data.FLP);
      dispatch(addToken({ symbol: "FLP", balance }));
      console.log("💰 FLP Balance:", balance);
    } catch (error) {
      console.error("Error fetching FLP balance:", error);
    }
  };
