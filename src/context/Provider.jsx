import ToastProvider from "@/context/toast/ToastProvider";
import AuthProvider from "@/context/auth/AuthProvider";
import CartProvider from "@/context/cart/CartProvider";
import CartProviderV2 from "@/context/cartV2/CartProvider";

const Provider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProviderV2>
          <CartProvider>{children}</CartProvider>
        </CartProviderV2>
      </AuthProvider>
    </ToastProvider>
  );
};

export default Provider;
