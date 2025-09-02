import { useState, useEffect } from 'react';

import { useAdmin } from '@/hooks/useAdmin';

import { AdminProduct, Loader } from '@/components/common';
import { useRouter } from 'next/router';

const AdminEditProduct = () => {
  const { getProduct, isLoading } = useAdmin();
  const { query:{paramsId} } = useRouter();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(paramsId);

      setProduct(product);
    };

    fetchProduct();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {product && (
        <AdminProduct
          isEditPage={paramsId}
          currentInventoryLevels={product.currentInventoryLevels}
          productId={product.id}
          productImages={product.images}
          productModel={product.model}
          productType={product.type}
          productCollection={product.collection}
          productDescription={product.description}
          productBaseSku={product.baseSku}
          productTags={product.tags}
          productSizesInput={product.sizesInput}
          productVariants={product.variants}
          productSizes={product.sizes}
        />
      )}
    </>
  );
};

export default AdminEditProduct;
