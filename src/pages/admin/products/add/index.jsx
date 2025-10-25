"use client";
import dynamic from "next/dynamic";
import { AdminProduct } from "@/components/common";
import withAuth from "@/components/with-auth/with-auth";

const AdminAddProduct = () => {
  return (
    <>
      <AdminProduct />
    </>
  );
};

// export default dynamic(() => Promise.resolve(withAuth(AdminAddProduct, true)), {
//   ssr: false, // disables server-side rendering for this component
// });

export default AdminAddProduct;
