"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { getTokenBalance } from "../utils/getTokenBalance";
import data from "@/token-list.json";
import { WalletProps } from "../types";

const useWallet = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [wallet, setWallet] = useState<WalletProps>({
    address: null,
    balance: null,
    tokens: [],
  });

  useEffect(() => {
    if ((window as any).ethereum) {
      setProvider(new ethers.BrowserProvider((window as any).ethereum));
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet((prev) => ({ ...prev, address: accounts[0] }));
      getBalance(accounts[0]);
      getFLPBalance(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const getBalance = async (walletAddress: string) => {
    if (!provider) return;
    try {
      const balance = await provider.getBalance(walletAddress);
      setWallet((prev) => ({ ...prev, balance: ethers.formatEther(balance) }));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const getFLPBalance = async (walletAddress: string) => {
    if (!provider) return;
    try {
      const balance = await getTokenBalance(provider, walletAddress, data.FLP);
      setWallet((prev) => ({
        ...prev,
        tokens: [...prev.tokens, { symbol: "FLP", balance }],
      }));

      console.log("💰 USDT Balance:", balance);
    } catch (error) {
      console.error("Error fetching FLP balance:", error);
    }
  };

  return { connectWallet, provider, wallet, setWallet };
};
export default useWallet;
