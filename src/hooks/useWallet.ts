"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { getTokenBalance } from "../utils/getTokenBalance";
import data from "@/token-list.json";

const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [tokens, setTokens] = useState<{ symbol: string; balance: string }[]>(
    []
  );

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
      console.log("Connected account:", accounts);

      setAccount(accounts[0]);
      getBalance(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const getBalance = async (walletAddress: string) => {
    if (!provider) return;
    try {
      const balance = await provider.getBalance(walletAddress);
      console.log("Balance:", balance);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const getUSDTBalance = async (walletAddress: string) => {
    if (!provider) return;
    const balance = await getTokenBalance(provider, walletAddress, data.FLP);
    console.log("💰 USDT Balance:", balance);
  };

  return { account, connectWallet, provider, balance, tokens };
};
export default useWallet;
