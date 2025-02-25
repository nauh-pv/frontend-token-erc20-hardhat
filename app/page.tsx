"use client";

import Card from "@/src/components/Card";
import { Breadcrumb } from "antd";

//import data
import data from "@/src/data/ico.json";
import DefaultLayout from "@/src/layouts/DefaultLayout";
import { useAppContext } from "@/src/contexts/AppContext";
import { useState } from "react";
import { LoadingButtonState } from "@/src/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState<LoadingButtonState[]>([]);
  const { vault } = data;
  const context = useAppContext();
  const { isConnectWallet } = context;

  const checkIsLoadingButton = (vaultIndex: number, optionIndex: number) => {
    return isLoading.some(
      (item) =>
        item.groupIndex === vaultIndex && item.optionIndex === optionIndex
    );
  };

  return (
    <DefaultLayout>
      <h2 className="font-medium text-xl">Packages</h2>
      {vault &&
        vault.length > 0 &&
        vault.map((item, index) => {
          return (
            <section
              className="mt-10"
              key={index}
              aria-labelledby={`vault-${index}`}
            >
              <nav aria-label="Breadcrumb">
                <Breadcrumb
                  items={[
                    {
                      title: "Package",
                    },
                    {
                      title: <a href="">ICO</a>,
                    },
                    {
                      title: item.name ? item.name : "ICO Vault",
                    },
                  ]}
                  className="mt-2"
                />
              </nav>
              <div className="grid grid-cols-4 gap-6 mt-3">
                {item &&
                  item.options &&
                  item.options.length > 0 &&
                  item.options.map((option, indexChild) => {
                    return (
                      <Card
                        key={indexChild}
                        {...{
                          srcBackground: option.srcBackground,
                          srcLogo: option.srcLogo,
                          currency: item.name,
                          price: option.price,
                          amount: option.amount,
                          isConnectWallet,
                          setIsLoading,
                          groupIndex: index,
                          optionIndex: indexChild,
                          isLoadingButton: checkIsLoadingButton(
                            index,
                            indexChild
                          ),
                        }}
                      />
                    );
                  })}
              </div>
            </section>
          );
        })}
    </DefaultLayout>
  );
}
