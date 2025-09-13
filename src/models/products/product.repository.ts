import { db } from "@/db/config";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { Product, ProductModel } from "./product.model";
import {
  createVariants,
  deleteVariants,
  updateVariants,
} from "../variants/variant.repository";
const productRef = collection(db, "Product") as CollectionReference<Product>;

const addProduct = async (product: ProductModel) => {
  const newProductRef: DocumentReference<ProductModel> = doc(productRef);

  const productWithId = {
    ...product,
    id: newProductRef.id,
  };

  console.log(productWithId, "productWithId");

  const resp = await addDoc(productRef, productWithId);
  return productWithId;
};

const editProduct = async (product: ProductModel) => {
  if (!product.id) {
    throw new Error("Product ID is required for update.");
  }

  const productDoc = doc(productRef, product.id);
  const productWithoutId = { ...product, id: undefined };
  productWithoutId.updatedAt = new Date().toISOString();
  await updateDoc(productDoc, productWithoutId);
};

export const createProduct = async (product: Product) => {
  const { variants, ...productInput } = product;
  const productData = await addProduct(productInput);
  console.log(productData, "productData");
  const variantPromises = product.variants.map((variant) => ({
    ...variant,
    productId: productData.id,
  }));

  await createVariants(variantPromises);

  return productData;
};

const deleteProduct = async (id: string): Promise<void> => {
  const productDoc = doc(productRef, id);
  await deleteDoc(productDoc);
};

export const updateProduct = async (product: Product) => {
  await editProduct(product);

  await updateVariants(product.variants);
  return product;
};

export const removeProduct = async (product: Product): Promise<void> => {
  await deleteProduct(product.id);
  await deleteVariants(product.variants.map((v) => v.id));
};

export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productRef);
  const products: Product[] = [];

  return snapshot.docs.map((doc) => doc.data());
};
