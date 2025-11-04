"use client";

import { useState } from "react";
import Link from "next/link";

import { useSeed } from "@/hooks/useSeed";
import withAuth from "@/components/with-auth/with-auth";

import { ConfirmModal, Loader } from "@/components/common";
import styles from "./index.module.scss";
import dynamic from "next/dynamic";

const AdminPage = () => {
  const { uploadProducts, isLoading, error } = useSeed();

  const [needConfirm, setNeedConfirm] = useState(false);

  const handleConfirm = async () => {
    setNeedConfirm(false);
    await uploadProducts();
  };

  return (
    <>
      {isLoading && <Loader />}
      <ConfirmModal
        show={needConfirm}
        close={() => setNeedConfirm(false)}
        handleConfirm={handleConfirm}
        title="Seed Data"
        text={`Data in "src/data/products.json" will be seeded to Firestore. Firestore only allows a maximum of 500 documents with each batch of writes. Organize data accordingly before hitting confirm.`}
      />
      <section>
        <div className={`${styles.container} main-container`}>
          <h1>Panel</h1>
          <div className={styles.options_wrapper}>
            <Link href="/admin/products" className={styles.option}>
              <div>Products</div>
            </Link>
            <Link href="/admin/products/add" className={styles.option}>
              <div>Add Product</div>
            </Link>
            <Link href="/admin/orders" className={styles.option}>
              <div>orders</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

// export default dynamic(() => Promise.resolve(withAuth(AdminPage, true)), {
//   ssr: false, // disables server-side rendering for this component
// });
export default withAuth(AdminPage, true);
