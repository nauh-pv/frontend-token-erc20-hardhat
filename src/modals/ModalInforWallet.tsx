"use client";
import { Modal } from "antd";
import Image from "next/image";

interface ModalInforWalletProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  wallet: any;
}

const ModalInforWallet = ({
  isOpen,
  setIsOpen,
  wallet,
}: ModalInforWalletProps) => {
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const formatterdBalance = () => {
    return wallet.balance ? (+wallet.balance).toFixed(2) : "0.00";
  };

  return (
    <Modal
      title="Wallet Information"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <section>
        <p className="btn-gradient">{wallet.taccount}</p>
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
          <p>{formatterdBalance()} BNB</p>
        </div>
        <p>0.5 BNB</p>
        <button className="border-[1px] border-slate-400 duration-200 ease-in-out delay-100 transition py-[2px] px-4 rounded-2xl dark:border-slate-50 dark:border-[1px] hover:border-destructive hover:text-destructive dark:hover:border-destructive w-fit dark:hover:text-destructive text-slate-400 dark:text-slate-50">
          Disconnected
        </button>
      </section>
    </Modal>
  );
};

export default ModalInforWallet;
