import Order from "./order";

import styles from "./index.module.scss";
import { useAuthContextV2 } from "@/hooks/useAuthContextV2";

const AccountOrders = ({ orders }) => {
  const { user } = useAuthContextV2();

  return (
    <div className={styles.orders_wrapper}>
      {orders.length === 0 && (
        <h2 className={styles.no_orders}>No placed orders yet</h2>
      )}
      {orders.length > 0 && (
        <>
          <h2 className={styles.title}>Your orders</h2>
          <div className={styles.orders_list}>
            {orders.map((order) => (
              <Order
                key={order.id}
                id={order.id}
                items={order.orderItems}
                date={order.createdAt}
                email={user.email}
                address={order.shippingAddress.address}
                city={order.shippingAddress.city}
                state={order.shippingAddress.state}
                zipCode={order.shippingAddress.zipCode}
                totalAmount={order.totalAmount}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOrders;
