import { useState, useEffect } from "react";

import { useAdmin } from "@/hooks/useAdmin";

import { AdminProduct, Loader } from "@/components/common";
import { getProduct } from "@/models/products/product.repository";
import { useRouter } from "next/router";

const AdminEditProduct = () => {
  // const { getProduct, isLoading } = useAdmin();
  const {
    query: { id },
    isReady,
  } = useRouter();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (!isReady) return;

    console.log(id, "id");
    const fetchProduct = async () => {
      setIsLoading(true);
      const product = await getProduct(id);
      console.log(product, "product");

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

export default AdminEditProduct;
