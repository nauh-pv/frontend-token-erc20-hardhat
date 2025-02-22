"use client";
import { Modal } from "antd";
import Image from "next/image";
import { IoCopyOutline } from "react-icons/io5";
import { handleCopy } from "../utils";
import { WalletProps } from "../types";

interface ModalInforWalletProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  wallet: WalletProps;
  setWallet: (wallet: WalletProps) => void;
}

const ModalInforWallet = ({
  isOpen,
  setIsOpen,
  wallet,
  setWallet,
}: ModalInforWalletProps) => {
  const handleCancel = () => {
    setIsOpen(false);
  };

  const formattedBalance = (balance: Number) => {
    return balance ? balance.toFixed(2) : 0.0;
  };

  const handleDisconnectWallet = () => {
    setWallet({
      address: null,
      balance: null,
      tokens: [],
    });
    setIsOpen(false);
    localStorage.removeItem("walletAddress");
    if ((window as any).ethereum?.disconnect) {
      (window as any).ethereum.disconnect();
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      title="Your Wallet"
    >
      <section className="flex flex-col gap-4 items-center py-6">
        <div className="flex flex-col gap-5 items-center">
          {wallet.address ? (
            <p className="btn-gradient w-fit flex items-center gap-2">
              {wallet.address}
              <IoCopyOutline
                className="cursor-pointer"
                onClick={() => handleCopy(wallet.address ? wallet.address : "")}
              />
            </p>
          ) : (
            <p> </p>
          )}
        </div>
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center gap-2">
            <div className="p-[1px] bg-slate-50 dark:bg-slate-900 rounded-full shadow-md w-fit">
              <Image
                src="/images/logo-bnb.png"
                alt="Logo BNB tokne"
                width={100}
                height={100}
                className="w-4 h-4"
              />
            </div>
            <p className="font-bold">
              {formattedBalance(wallet.balance ? +wallet.balance : 0)} BNB
            </p>
          </div>
          <div className="flex gap-4 items-center justify-start">
            {wallet.tokens &&
              wallet.tokens.length > 0 &&
              wallet.tokens.map((token: any, index: number) => {
                return (
                  <div className="flex items-center gap-2" key={index}>
                    <div className="p-[1px] bg-slate-50 dark:bg-slate-900 rounded-full shadow-md w-fit">
                      <Image
                        src="/images/tether-usdt-logo.png"
                        alt="Logo BNB tokne"
                        width={100}
                        height={100}
                        className="w-4 h-4"
                      />
                    </div>
                    <p className="font-bold" key={index}>
                      {formattedBalance(+token.balance)} {token.symbol}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <button
          onClick={() => handleDisconnectWallet()}
          className="py-2 border-[1px] rounded-full border-slate-400 duration-200 ease-in-out delay-100 transition px-6 dark:border-slate-50 dark:border-[1px] hover:border-destructive hover:text-destructive dark:hover:border-destructive w-fit dark:hover:text-destructive text-slate-400 dark:text-slate-50"
        >
          Disconnected
        </button>
      </section>
    </Modal>
  );
};

export default ModalInforWallet;
