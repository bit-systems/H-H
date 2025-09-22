import { db } from "@/db/config";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { OrderItem } from "./order.model";

const orderItemRef = collection(
  db,
  "OrderItem"
) as CollectionReference<OrderItem>;

const createOrderItem = async (orderItem: OrderItem) => {
  const newProductRef: DocumentReference<OrderItem> = doc(orderItemRef);

  const orderItemWithId = { ...orderItem, id: newProductRef.id };
  console.log(orderItemWithId, "orderItemWithId");
  await setDoc(newProductRef, orderItemWithId);
  return orderItemWithId;
};

const updateOrderItem = async (orderItem: OrderItem) => {
  console.log(orderItem, "orderItem in repo");
  if (!orderItem.id) {
    await createOrderItem(orderItem);
    return;
  }

  const orderItemDoc = doc(orderItemRef, orderItem.id);
  const { id, ...orderItemWithoutId } = orderItem;
  await updateDoc(orderItemDoc, orderItemWithoutId);
};

const deleteOrderItem = async (id: string): Promise<void> => {
  const orderDoc = doc(orderItemRef, id);
  await deleteDoc(orderDoc);
};

export const createOrderItems = async (orderItems: OrderItem[]) => {
  console.log(orderItems, "orderItems in repo");
  const creationPromises = orderItems.map((orderItem) =>
    createOrderItem(orderItem)
  );
  return Promise.all(creationPromises);
};

export const updateOrderItems = async (orderItems: OrderItem[]) => {
  const updatePromises = orderItems.map((orderItem) =>
    updateOrderItem(orderItem)
  );
  return Promise.all(updatePromises);
};

export const deleteOrderItems = async (ids: string[]): Promise<void[]> => {
  const deletePromises = ids.map((id) => deleteOrderItem(id));
  return Promise.all(deletePromises);
};

export const getOrderItems = async (id: string): Promise<OrderItem | null> => {
  console.log(id, "id in repo");
  const snapshot = await getDoc(doc(orderItemRef, id));

  return snapshot.exists() ? snapshot.data() : null;
};

export const getOrderItemsByOrderId = async (orderId: string) => {
  const q = query(orderItemRef, where("orderId", "==", orderId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};
