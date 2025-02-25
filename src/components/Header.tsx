"use client";

import { useMemo } from "react";

import MeneHeader from "./MenuHeader";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppContext } from "@/src/contexts/AppContext";
import ModalInforWallet from "../modals/ModalInforWallet";
import { connectWallet, getBalance, getFLPBalance } from "../redux/walletThunk";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

const Header = () => {
  const { address } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  const { setIsOpenModalWallet, isOpenModalWallet, setIsConnectWallet } =
    useAppContext();

  const formatterdAccount = useMemo(() => {
    return address
      ? `${address.slice(0, 6)}...${address.slice(-6)}`
      : "Connect Wallet";
  }, [address]);

  const fetchBalance = () => {
    if (address && address.length > 0) {
      dispatch(getFLPBalance(address));
      dispatch(getBalance(address));
    }
  };

  const handleOnClickConnect = () => {
    if (!address) {
      dispatch(connectWallet());
      setIsConnectWallet(true);
    } else {
      setIsOpenModalWallet(true);
      fetchBalance();
    }
  };

  return (
    <header className="py-5 fixed z-50 bg-slate-50 dark:bg-slate-900 w-full">
      <div className="content-center flex justify-between items-center w-[75%] mx-auto">
        <h1 className="text-3xl font-bold text-second">ICO Vaul token</h1>
        <nav className="flex gap-10 items-center">
          <MeneHeader />
          <ThemeSwitcher />
          <button className="btn-gradient" onClick={handleOnClickConnect}>
            {formatterdAccount}
          </button>
        </nav>
      </div>
      <ModalInforWallet
        {...{
          isOpen: isOpenModalWallet,
          setIsOpen: setIsOpenModalWallet,
        }}
      />
    </header>
  );
};
export default Header;
