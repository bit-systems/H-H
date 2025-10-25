"use client";

import { putApi } from "@/fetch-api/fetch-api";

import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";

import Order from "@/components/account/account-orders/order";

import { orderBy } from "firebase/firestore";
import { Loader } from "@/components/common";

import { format } from "date-fns";

import { getAllAdminOrders } from "@/models/order/order.repository";
import { OrderStatus } from "@/models/order/order.model";

import { MoreVerticalIcon } from "lucide-react";
import withAuth from "@/components/with-auth/with-auth";

const Orders = () => {
  const constraints = [orderBy("createdAt", "desc")];
  const { sendToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    const orders = await getAllAdminOrders(constraints);
    setOrders(orders);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchOrders().then((orders) => {
      setIsLoading(false);
    });
  }, []);

  const paymentStatusColors = {
    pending: "bg-yellow-500",
    confirmed: "bg-blue-500",
    shipped: "bg-purple-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
    returned: "bg-gray-500",
    paid: "bg-green-500",
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const resp = await putApi(
        "/api/order",
        JSON.stringify({ orderId, status }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.isSuccess) {
        sendToast({
          error: false,
          content: { message: `Order statues updated to "${status}"` },
        });
        await fetchOrders();
      } else {
        sendToast({
          error: true,
          content: { message: "Error occurred while handling the request" },
        });
      }
    } catch (err) {
      console.log(err);
      sendToast({ error: true, content: { message: err.message } });
    }
  };

  return (
    <section>
      {isLoading ? (
        <Loader
          noPortal={false}
          backdropClassName={""}
          containerClassName={""}
          loaderClassName={""}
        />
      ) : (
        <div className={`${styles.container} main-container`}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Price</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td data-label="Image">
                      <Order
                        id={order.id}
                        items={order.orderItems}
                        email={order.user.email}
                        address={order.address?.address ?? ""}
                        city={order.address?.city ?? " "}
                        state={order.address?.state ?? ""}
                        zipCode={order.address?.zipCode ?? ""}
                        totalAmount={order.totalAmount}
                        phoneNumber={order.user.phoneNumber}
                        fullName={
                          order.user.firstName + " " + order.user.lastName
                        }
                      />
                    </td>
                    <td data-label="Price">
                      ₹ {order.totalAmount.toLocaleString()}
                    </td>
                    <td data-label="PaymentStatus">
                      {" "}
                      <Badge
                        className={
                          paymentStatusColors[order.paymentStatus] +
                          " " +
                          "uppercase"
                        }
                        variant="outline"
                      >
                        {order.paymentStatus}
                      </Badge>
                    </td>
                    <td data-label="OrderStatus">
                      {" "}
                      <Badge
                        className={
                          paymentStatusColors[order.status] + " " + "uppercase"
                        }
                        variant="outline"
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td data-label="CreatedAt">
                      {format(order.createdAt, "yyyy-mm-dd HH:MM")}
                    </td>
                    <td data-label="Actions">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent style={{ background: "white" }}>
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, OrderStatus.SHIPPED)
                            }
                          >
                            Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setIsOpen(true)}>
                            View User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Orders, true)), {
  ssr: false, // disables server-side rendering for this component
});
