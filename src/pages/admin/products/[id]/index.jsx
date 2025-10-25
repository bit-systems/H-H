"use client";

import { useState, useEffect } from "react";

import { AdminProduct, Loader } from "@/components/common";
import { getProduct } from "@/models/products/product.repository";
import { useRouter } from "next/router";
import withAuth from "@/components/with-auth/with-auth";

const AdminEditProduct = () => {
  const {
    query: { id },
    isReady,
  } = useRouter();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (!isReady) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      const product = await getProduct(id);

      setProduct(product);
      setIsLoading(false);
    };

    fetchProduct();
  }, [isReady]);

  return (
    <>
      {isLoading && <Loader />}
      {product && (
        <AdminProduct
          isEditPage={id}
          currentInventoryLevels={product.currentInventoryLevels}
          productId={product.id}
          product={product}
        />
      )}
    </>
  );
};

export default withAuth(AdminEditProduct, true);
