"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useCollection } from "@/hooks/useCollection";
import { useAdmin } from "@/hooks/useAdmin";
import { getAllProducts } from "@/models/products/product.repository";

import {
  Loader,
  CenterModal,
  ConfirmModal,
  ProductCardV2,
} from "@/components/common";

import styles from "./index.module.scss";
import withAuth from "@/components/with-auth/with-auth";

const AdminCollections = () => {
  const { getCollection } = useCollection();
  const { deleteVariant, isLoading } = useAdmin();

  const [products, setProducts] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [productToBeDeleted, setProductToBeDeleted] = useState(null);

  useEffect(() => {
    if (!products) {
      const fetchVariants = async () => {
        const fetchedProducts = await getAllProducts(true);
        console.log(fetchedProducts, "fetchedVariants");

        const mappedProducts = fetchedProducts.map((p) => ({
          ...p,
          slides: p.images,
          variants: p.variants.map((v) => ({
            ...v,
            slides: v.images,
          })),
        }));

        setProducts(() => [...mappedProducts]);
      };

      fetchVariants();
    }
  }, [products]);

  const handleDeleteStart = ({ productId, variantId }) => {
    setProductToBeDeleted({ productId, variantId });
    setIsConfirmOpen(true);
  };

  const handleDeleteOnConfirm = async () => {
    setIsConfirmOpen(false);
    await deleteVariant(productToBeDeleted);

    setVariants(null);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setProductToBeDeleted(null);
  };

  return (
    <>
      <CenterModal
        toggleModal={closeConfirm}
        modalClassName={styles.confirm_modal}
      >
        {isConfirmOpen && (
          <ConfirmModal
            isConfirmOpen={isConfirmOpen}
            handleConfirm={handleDeleteOnConfirm}
            handleCancel={closeConfirm}
            text="Are you sure you want to delete this variant? If product only has this variant, the whole product will be deleted."
          />
        )}
      </CenterModal>
      {(!products || isLoading) && <Loader />}
      {products && (
        <section>
          <div className={`${styles.container} main-container`}>
            <h1>Admin Products</h1>
            <div className={styles.products_wrapper}>
              {products.map((product) => (
                <ProductCardV2
                  key={product.id}
                  // variantId={product}
                  productId={product.id}
                  model={product.title}
                  color={product.color}
                  colorDisplay={product.colorDisplay}
                  currentPrice={product.currentPrice}
                  actualPrice={product.actualPrice}
                  type={product.type}
                  slug={product.slug}
                  imageTop={product.images[0]} //TODO fix this
                  imageBottom={product.images[1]} //TODO fix this
                  numberOfVariants={product.variants.length}
                  handleDeleteStart={handleDeleteStart}
                  product={product}
                  allVariants={product.variants}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

// export default dynamic(
//   () => Promise.resolve(withAuth(AdminCollections, true)),
//   {
//     ssr: false, // disables server-side rendering for this component
//   }
// );

export default withAuth(AdminCollections, true);
