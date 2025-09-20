import { useState, useEffect } from "react";
import Link from "next/link";

import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { useCartContext } from "@/hooks/useCartContext";
import { useCart } from "@/hooks/useCart";
import { useInventory } from "@/hooks/useInventory";
import { useToast } from "@/hooks/useToast";

import CheckoutProgression from "./checkout-progression";
import ShippingInfo from "./shipping-info";
import ShippingOption from "./shipping-option";
import Payment from "./payment";
import OrderSummary from "./order-summary";

import { Loader } from "@/components/common";

import styles from "./index.module.scss";
import { useRouter } from "next/router";

const progressionSteps = [
  { id: "cart", label: "Cart", url: "/cart" },
  { id: "info", label: "Info" },
  // { id: "shipping", label: "Shipping" },
  // { id: "payment", label: "Payment" },
];

const CheckoutPage = () => {
  const navigate = useRouter();

  const { items, cartNeedsCheck } = useCartContext();
  const { activateCartCheck } = useCart();
  const { checkInventory, isLoading, error: inventoryError } = useInventory();
  const { sendToast } = useToast();

  const [stopCheckout, setStopCheckout] = useState(false);

  let formContent;

  // if (progressionSteps[currentStep].id === "shipping") {
  //   formContent = <ShippingOption />;
  // }

  // if (progressionSteps[currentStep].id === "payment") {
  //   formContent = <Payment />;
  // }

  useEffect(() => {
    if (cartNeedsCheck) {
      checkInventory(items);
    } else {
      activateCartCheck();
    }

    if (items.length === 1) {
      //TODO make zero
      setStopCheckout(true);
      const timer = setTimeout(() => {
        navigate.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (inventoryError) {
      if (items.length === 0) {
        setStopCheckout(true);
        sendToast({
          error: true,
          content: { message: `${inventoryError.message} Redirecting...` },
        });
      }

      const timer = setTimeout(() => {
        navigate.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [inventoryError]);

  return (
    <>
      <div className={styles.background} />
      <section className={styles.layout}>
        <>
          {isLoading && (
            <Loader
              containerClassName={styles.loader_container}
              noPortal={true}
            />
          )}
          {!isLoading && (
            <>
              {stopCheckout && <div className={styles.stop_checkout} />}
              <div className={`${styles.header} main-container`}>
                <Link href="/">
                  <img
                    className={styles.logo}
                    src={"/assets/images/checkout-logo-nav.png"}
                    alt=""
                  />
                </Link>
              </div>
              <div className={`${styles.content_wrapper} main-container`}>
                <div className={styles.info_container}>
                  <div className={styles.info_header}>
                    <Link href="/">
                      <img
                        className={styles.logo}
                        src={"/assets/images/checkout-logo-nav.png"}
                        alt=""
                      />
                    </Link>
                  </div>
                  <CheckoutProgression steps={progressionSteps} />
                  <ShippingInfo />
                </div>
                <div className={styles.order_summary_container}>
                  <OrderSummary />
                </div>
              </div>
            </>
          )}
        </>
      </section>
    </>
  );
};

export default CheckoutPage;
