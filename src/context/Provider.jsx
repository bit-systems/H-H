import ToastProvider from "@/context/toast/ToastProvider";
import AuthProvider from "@/context/authV2/AuthProvider";
import CartProviderV2 from "@/context/cartV2/CartProvider";

const Provider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProviderV2>{children}</CartProviderV2>
      </AuthProvider>
    </ToastProvider>
  );
};

export default Provider;
