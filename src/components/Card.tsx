import Image from "next/image";

interface CardProps {
  srcBackground: string;
  srcLogo: string;
  currency: string;
  price: string;
  amount: string;
  handleBuy: (bnbAmount: string) => void;
}

const Card = ({
  srcBackground,
  srcLogo,
  currency,
  price,
  amount,
  handleBuy,
}: CardProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-fit rounded-3xl bg-slate-100 dark:bg-slate-800 shadow-md hover:border-primary dark:hover:border-primary hover:border-[1px] transition-all duration-300 border-[1px] border-slate-100 dark:border-slate-800">
      <Image
        src={srcBackground}
        width={500}
        height={500}
        alt="ICO Vault"
        className="h-fit w-full rounded-3xl"
        priority
      />
      <div className="rounded-full p-2 bg-slate-100 dark:bg-slate-800 mx-auto top-36 absolute">
        <Image
          src={srcLogo}
          width={200}
          height={200}
          alt="Logo BNB"
          className="h-[70px] w-[70px]"
        />
      </div>
      <section className="px-6 py-10 flex flex-col items-center justify-center gap-4">
        <h3 className="text-lg font-bold text-center text-slate-950 dark:text-slate-50">
          ICO Vault
        </h3>
        <p className="border-[1px] border-slate-400 duration-200 ease-in-out delay-100 transition py-[2px] px-4 rounded-2xl dark:border-slate-50 dark:border-[1px] hover:border-primary hover:text-primary dark:hover:border-primary w-fit dark:hover:text-primary text-slate-400 dark:text-slate-50 ">
          {amount} IPT
        </p>
        <p className="text-sm">
          Amount of coin to pay:&nbsp;
          <span className="font-bold" aria-label="Currency">
            {price} {currency}
          </span>
        </p>
        <button
          className="btn-gradient w-full"
          onClick={() => handleBuy(price)}
        >
          Buy Now
        </button>
      </section>
    </div>
  );
};
export default Card;
