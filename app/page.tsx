import Card from "@/components/Card";
import { Breadcrumb } from "antd";

//import data
import data from "@/shared/data/ico.json";
import DefaultLayout from "@/shared/layouts/DefaultLayout";

export default function Home() {
  const { vault } = data;
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
                  item.options.map((option, index) => {
                    return (
                      <Card
                        key={index}
                        {...{
                          srcBackground: option.srcBackground,
                          srcLogo: option.srcLogo,
                          currency: item.name,
                          price: option.price,
                          amount: option.amount,
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
