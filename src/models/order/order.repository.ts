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
  query,
  where,
} from "firebase/firestore";
import {
  Order,
  OrderAdminOutput,
  OrderInput,
  OrderOutput,
} from "./order.model";
import {
  createOrderItems,
  getOrderItemsByOrderId,
  updateOrderItems,
} from "./order-item.repository";
import { getUserById } from "../user/user.repository";
import { User } from "../user/user.model";
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

export const getAllAdminOrders = async (
  queryConstraints: []
): Promise<OrderAdminOutput[]> => {
  const fQuery = query(orderRef, ...queryConstraints);

  const snapshot = await getDocs(fQuery);

  const orders = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const order = doc.data();
      const v = await getOrderItemsByOrderId(order.id as string);
      const user = (await getUserById(order.userId)) as User;
      return {
        ...order,
        orderItems: v,
        user: {
          email: user.email,
          phoneNumber: user.mobileNumber,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    })
  );

  return orders;
};

export const getOrdersByUserId = async (
  userId: string
): Promise<OrderOutput[]> => {
  const q = query(orderRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  const orders = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const order = doc.data();
      const v = await getOrderItemsByOrderId(order.id as string);
      return { ...order, orderItems: v };
    })
  );

  return orders;
};

export const getOrderOnly = async (id: string): Promise<Order | null> => {
  const snapshot = await getDoc(doc(orderRef, id));

  if (!snapshot.exists()) return null;

  const orderData = snapshot.data();

  return { ...orderData };
};
