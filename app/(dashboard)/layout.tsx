import Header from "@/components/Header";
import React from "react";

const MainAppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="min-h-screen bg-black text-white pb-1">
        <Header />
        {children}
      </div>
    </>
  );
};

export default MainAppLayout;
