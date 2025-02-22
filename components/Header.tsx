"use client";

import useWallet from "@/shared/hooks/useWallet";
import MeneHeader from "./MenuHeader";

const Header = () => {
  const { account, connectWallet } = useWallet();

  return (
    <header className="py-5 fixed z-50 bg-slate-50 w-full">
      <div className="content-center flex justify-between items-center w-[75%] mx-auto">
        <h1 className="text-3xl font-bold text-second">ICO Vaul token</h1>
        <nav className="flex gap-10 items-center">
          <MeneHeader />
          <button className="btn-gradient" onClick={connectWallet}>
            {account
              ? `${account.slice(0, 6)}...${account.slice(-4)}`
              : "Connect Wallet"}
          </button>
        </nav>
      </div>
    </header>
  );
};
export default Header;
