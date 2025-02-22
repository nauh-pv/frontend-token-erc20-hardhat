import { Modal } from "antd";

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
  console.log(wallet);

  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      title="Basic Modal"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <section>
        <p className="btn-gradient"></p>
        <p>0.5 BNB</p>
        <p>0.5 BNB</p>
        <button className="border-[1px] border-slate-400 duration-200 ease-in-out delay-100 transition py-[2px] px-4 rounded-2xl dark:border-slate-50 dark:border-[1px] hover:border-destructive hover:text-destructive dark:hover:border-destructive w-fit dark:hover:text-destructive text-slate-400 dark:text-slate-50">
          Disconnected
        </button>
      </section>
    </Modal>
  );
};

export default ModalInforWallet;
