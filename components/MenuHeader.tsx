"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MeneHeader = () => {
  const pathname = usePathname();

  const listMenu = [
    { name: "Home", path: "/" },
    { name: "Deposit/Withdraw", path: "/transfer" },
    { name: "Staking", path: "/staking" },
    { name: "Lending", path: "/lending" },
  ];
  return (
    <ul className="flex justify-center gap-7">
      {listMenu.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <li
            className={`hover:text-primary  dark:hover:text-primary font-medium duration-150 ${
              isActive ? "text-primary" : "text-slate-950 dark:text-slate-50"
            }`}
            key={index}
          >
            <Link href={item.path}> {item.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};
export default MeneHeader;
