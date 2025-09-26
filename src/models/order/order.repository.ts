import { db } from "@/db/config";
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  updateDoc,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { Order, OrderInput, OrderOutput } from "./order.model";
import {
  createOrderItems,
  getOrderItemsByOrderId,
  updateOrderItems,
} from "./order-item.repository";
const orderRef = collection(db, "Order") as CollectionReference<Order>;

const addOrder = async (order: Order) => {
  const newOrderRef: DocumentReference<Order> = doc(orderRef);

  const orderWithId = {
    ...order,
    id: newOrderRef.id,
  };

  console.log(orderWithId, "orderWithId");

  await setDoc(newOrderRef, orderWithId);
  return orderWithId;
};

const editOrder = async (orderId: string, order: Order) => {
  if (!orderId) {
    throw new Error("Order ID is required for update.");
  }

  const orderDoc = doc(orderRef, orderId);
  const { id, ...orderWithoutId } = order;

  orderWithoutId.updatedAt = new Date().toISOString();
  await updateDoc(orderDoc, orderWithoutId);
};

export const createOrder = async (order: OrderInput) => {
  const { orderItems, ...orderInput } = order;
  const orderData = await addOrder(orderInput as Order);
  console.log(orderData, "orderData");
  const variantPromises = order.orderItems.map((variant) => ({
    ...variant,
    orderId: orderData.id,
  }));

  await createOrderItems(variantPromises);

  return orderData;
};

export const updateOrder = async (orderId: string, order: OrderInput) => {
  const { orderItems, ...orderInput } = order;

  await editOrder(orderId, orderInput as Order);

  const variantWithOrderId = order.orderItems.map((variant) => ({
    ...variant,
    orderId: orderId,
  }));
  console.log(variantWithOrderId, "variantWithOrderId");

  await updateOrderItems(variantWithOrderId);
  return order;
};

export const updateOrderOnly = async (orderId: string, order: OrderInput) => {
  await editOrder(orderId, order as Order);

  return order;
};

// export const getAllOrders = async (): Promise<OrderOutput[]> => {
//   const snapshot = await getDocs(orderRef);

//   const orders = await Promise.all(
//     snapshot.docs.map(async (doc) => {
//       const order = doc.data();
//       const v = await getOrderItemsByOrderId(order.id as string);
//       return { ...order, orderItems: v };
//     })
//   );

//   return orders;
// };

export const getOrderOnly = async (id: string): Promise<Order | null> => {
  console.log(id, "id in repo");
  const snapshot = await getDoc(doc(orderRef, id));

  if (!snapshot.exists()) return null;

  const orderData = snapshot.data();

  return { ...orderData };
};
