import { useEffect, useState } from 'react';


import Toast from './Toast';
import Cart from './Cart';
import Header from './Header';
// import Footer from './Footer';
import dynamic from 'next/dynamic'

import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const location = useRouter();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

const Footer = dynamic(() => import('./Footer'), { ssr: false })


  useEffect(() => {
    if(location.isReady) {
      const pathname = location.pathname.split('/');
      const isCheckout = pathname.includes('checkout');
      setIsCheckout(isCheckout);
    }
    ;
  }, [location.isReady]);

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
        <main>
         {children}
        </main>
        {!isCheckout && <Footer />}
      </div>
    </>
  );
};

export default Layout;
