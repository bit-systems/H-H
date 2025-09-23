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
import { Variant } from "./variant.model";
import { variantToOutput } from "../mappers/product-output.mapper";

const variantRef = collection(db, "Variant") as CollectionReference<Variant>;

const createVariant = async (variant: Variant) => {
  const newProductRef: DocumentReference<Variant> = doc(variantRef);

  const variantWithId = { ...variant, id: newProductRef.id };
  console.log(variantWithId, "variantWithId");
  await setDoc(newProductRef, variantWithId);
  return variantWithId;
};

const updateVariant = async (variant: Variant) => {
  console.log(variant, "variant in repo");
  if (!variant.id) {
    await createVariant(variant);
    return;
  }

  const variantDoc = doc(variantRef, variant.id);
  const { id, ...variantWithoutId } = variant;
  await updateDoc(variantDoc, variantWithoutId);
};

const deleteVariant = async (id: string): Promise<void> => {
  const productDoc = doc(variantRef, id);
  await deleteDoc(productDoc);
};

export const createVariants = async (variants: Variant[]) => {
  console.log(variants, "variants in repo");
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

export const getVariants = async (id: string): Promise<Variant | null> => {
  console.log(id, "id in repo");
  const snapshot = await getDoc(doc(variantRef, id));

  return snapshot.exists() ? snapshot.data() : null;
};

export const getVariantsByProductId = async (productId: string) => {
  const q = query(variantRef, where("productId", "==", productId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};

export const getVariantsByIds = async (ids: string[]) => {
  const q = query(variantRef, where("id", "in", ids));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) =>
    variantToOutput({
      ...doc.data(),
    })
  );
};
