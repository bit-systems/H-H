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
import { Product, ProductModel } from "./product.model";
import {
  createVariants,
  deleteVariants,
  getVariantsByProductId,
  updateVariants,
} from "../variants/variant.repository";
import { mapProductToOutput } from "../mappers/product-outout.mapper";
const productRef = collection(db, "Product") as CollectionReference<Product>;

const addProduct = async (product: ProductModel) => {
  const newProductRef: DocumentReference<ProductModel> = doc(productRef);

  const productWithId = {
    ...product,
    id: newProductRef.id,
  };

  console.log(productWithId, "productWithId");

  const resp = await setDoc(newProductRef, productWithId);
  return productWithId;
};

const editProduct = async (productId: string, product: ProductModel) => {
  if (!productId) {
    throw new Error("Product ID is required for update.");
  }

  const productDoc = doc(productRef, productId);
  const { id, ...productWithoutId } = product;

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

export const updateProduct = async (productId: string, product: Product) => {
  const { variants, ...productInput } = product;

  await editProduct(productId, productInput);

  const variantWithProductId = product.variants.map((variant) => ({
    ...variant,
    productId: productId,
  }));
  console.log(variantWithProductId, "variantWithProductId");

  await updateVariants(variantWithProductId);
  return product;
};

export const removeProduct = async (product: Product): Promise<void> => {
  await deleteProduct(product.id);
  await deleteVariants(product.variants.map((v) => v.id));
};

export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productRef);

  const products = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const product = doc.data();
      const v = await getVariantsByProductId(product.id);
      return mapProductToOutput({
        ...product,
        variants: v,
      });
    })
  );

  return products;
};

export const getProduct = async (id: string): Promise<Product | null> => {
  console.log(id, "id in repo");
  const snapshot = await getDoc(doc(productRef, id));

  if (!snapshot.exists()) return null;

  const productData = snapshot.data();

  const variants = await getVariantsByProductId(productData.id);

  return mapProductToOutput({ ...productData, variants });
};
