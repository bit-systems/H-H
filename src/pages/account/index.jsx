import { useState, useEffect } from "react";

import { useAuthContextV2 } from "@/hooks/useAuthContextV2";
import { useOrder } from "@/hooks/useOrder";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import withAuth from "@/components/with-auth/with-auth";
import AccountOrders from "@/components/account/account-orders";
import AccountProfile from "@/components/account/account-profile";
import AccountAddresses from "@/components/account/account-addresses";
import { getOrdersByUserId } from "@/models/order/order.repository";
import { Button, Loader } from "@/components/common";

import styles from "./index.module.scss";
import { useRouter } from "next/router";

const AccountPage = () => {
  const { user } = useAuthContextV2();

  const [orders, setOrders] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user?.id) return;
    const fetchOrders = async () => {
      let fetchedOrders = await getOrdersByUserId(user.id);
      fetchedOrders = fetchedOrders.map((order) => ({
        ...order,
        shippingAddress: order.address,
      }));
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  const handleLogout = async () => {
    localStorage.removeItem("jwt_token");
    router.push("/");
  };

  return (
    <>
      {!orders && (
        <>
          <div className={styles.loader_section} />
          <Loader />
        </>
      )}
      {orders && (
        <>
          <section>
            <div className={`${styles.container} main-container`}>
              <div className={styles.welcome_wrapper}>
                <p className={styles.greeting}>Welcome back, {name}!</p>
                <Button className={styles.logout_button} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className={styles.content_container}>
                <AccountOrders orders={orders} />
                <aside className={styles.sidebar}>
                  <AccountProfile
                    name={user.firstName}
                    lastName={user.firstName}
                    email={user.email}
                    phoneNumber={user.mobileNumber}
                  />
                  <AccountAddresses />
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default withAuth(AccountPage, false);
