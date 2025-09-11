import { useState, useEffect } from 'react';

import { useAdmin } from '@/hooks/useAdmin';

import { AdminProduct, Loader } from '@/components/common';
import { useRouter } from 'next/router';

const AdminEditProduct = () => {
  const { getProduct, isLoading } = useAdmin();
  const { query:{id} , isReady} = useRouter();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    if(!isReady) return;

    console.log(id, 'id');
    const fetchProduct = async () => {
      const product = await getProduct(id);
      console.log(product, 'product');

      setProduct(product);
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
