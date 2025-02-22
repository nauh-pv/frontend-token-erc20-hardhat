import Header from "@/src/components/Header";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full flex flex-col relative">
      <Header />
      <div></div>
      <main className="content flex-1 w-[75%] mx-auto" role="main">
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
