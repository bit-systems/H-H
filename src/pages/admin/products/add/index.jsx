import { AdminProduct } from "@/components/common";
import withAuth from "@/components/with-auth/with-auth";

const AdminAddProduct = () => {
  return (
    <>
      <AdminProduct />
    </>
  );
};

export default withAuth(AdminAddProduct, true);
