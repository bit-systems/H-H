"use client";
import { useEffect, useState } from "react";

import Toast from "./Toast";
import Cart from "./Cart";
import Header from "./Header";
// import Footer from './Footer';
import dynamic from "next/dynamic";

import { useRouter, usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const location = useRouter();
  const pathname = usePathname();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const Footer = dynamic(() => import("./Footer"), { ssr: false });

  useEffect(() => {
    const pathname1 = pathname.split("/");
    const isCheckout = pathname1.includes("checkout");
    setIsCheckout(isCheckout);
  }, []);

  return (
    <>
      <Toast />
      <div id="layout">
        <Cart
          isCartModalOpen={isCartModalOpen}
          closeCartModal={() => setIsCartModalOpen(false)}
        />
        {!isCheckout && (
          <Header openCartModal={() => setIsCartModalOpen(true)} />
        )}
        <main>{children}</main>
        {!isCheckout && <Footer />}
      </div>
    </>
  );
};

export default Layout;
