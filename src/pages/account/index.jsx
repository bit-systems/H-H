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

const AccountPage = () => {
  const { user } = useAuthContextV2();
  const { getOrders, error } = useOrder();
  const { logout } = useAuth();
  const { sendToast } = useToast();

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    const fetchOrders = async () => {
      let fetchedOrders = await getOrdersByUserId(user.id);
      console.log(fetchedOrders, "fetched orders");
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

  useEffect(() => {
    if (error) {
      sendToast({ error: true, content: { message: error.message } });
    }
  }, [error]);

  const handleLogout = async () => {
    await logout();
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
