"use client";

import { useCallback, useMemo } from "react";

import useWallet from "@/src/hooks/useWallet";
import MeneHeader from "./MenuHeader";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppContext } from "@/src/contexts/AppContext";
import ModalInforWallet from "../modals/ModalInforWallet";

const Header = () => {
  const { wallet, connectWallet, setWallet } = useWallet();
  const { setIsOpenModalWallet, isOpenModalWallet } = useAppContext();

  const formatterdAccount = useMemo(() => {
    return wallet.address
      ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-6)}`
      : "Connect Wallet";
  }, [wallet.address]);

  const handleOnClickConnect = useCallback(() => {
    if (!wallet.address) connectWallet();
    else setIsOpenModalWallet(true);
  }, [wallet.address, connectWallet, setIsOpenModalWallet]);

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
          wallet,
          setWallet,
        }}
      />
    </header>
  );
};
export default Header;
