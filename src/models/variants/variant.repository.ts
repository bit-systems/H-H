import { db } from "@/db/config";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";
import { Variant } from "./variant.model";

const variantRef = collection(db, "Variant") as CollectionReference<Variant>;

const createVariant = async (variant: Variant) => {
  const newProductRef: DocumentReference<Variant> = doc(variantRef);

  const variantWithId = { ...variant, id: newProductRef.id };
  console.log(variantWithId, "variantWithId");
  await addDoc(variantRef, variantWithId);
  return variantWithId;
};

const updateVariant = async (variant: Variant) => {
  if (!variant.id) {
    throw new Error("Variant ID is required for update.");
  }

  const variantDoc = doc(variantRef, variant.id);
  const variantWithoutId = { ...variant, id: undefined };
  await updateDoc(variantDoc, variantWithoutId);
};

const deleteVariant = async (id: string): Promise<void> => {
  const productDoc = doc(variantRef, id);
  await deleteDoc(productDoc);
};

export const createVariants = async (variants: Variant[]) => {
  const creationPromises = variants.map((variant) => createVariant(variant));
  return Promise.all(creationPromises);
};

export const updateVariants = async (variants: Variant[]) => {
  const updatePromises = variants.map((variant) => updateVariant(variant));
  return Promise.all(updatePromises);
};

export const deleteVariants = async (ids: string[]): Promise<void[]> => {
  const deletePromises = ids.map((id) => deleteVariant(id));
  return Promise.all(deletePromises);
};
