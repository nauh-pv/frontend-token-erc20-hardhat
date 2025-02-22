"use client";

import useWallet from "@/src/hooks/useWallet";
import MeneHeader from "./MenuHeader";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppContext } from "@/src/contexts/AppContext";
import ModalInforWallet from "../modals/ModalInforWallet";
import { useCallback, useMemo } from "react";
import { numberFormat } from "../utils";

const Header = () => {
  const { account, connectWallet, balance, tokens } = useWallet();
  const { setIsOpenModalWallet, isOpenModalWallet } = useAppContext();

  const formatterdAccount = useMemo(() => {
    return account
      ? `${account.slice(0, 6)}...${account.slice(-4)}`
      : "Connect Wallet";
  }, [account]);

  const handleOnClickConnect = useCallback(() => {
    if (!account) connectWallet();
    else setIsOpenModalWallet(true);
  }, [account, connectWallet, setIsOpenModalWallet]);

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
          wallet: { account, balance, tokens },
        }}
      />
    </header>
  );
};
export default Header;
