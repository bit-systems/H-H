import Link from "next/link";
import { Loader2, Loader, Shirt } from "lucide-react";
import { PiShirtFolded } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";

import styles from "./index.module.scss";

const Button = ({
  children,
  form,
  className,
  to,
  type,
  onClick,
  disabled,
  isLoading,
}) => {
  if (to) {
    return (
      <Link
        // to={to}
        className={`${styles.button} ${className}`}
        onClick={onClick}
        href={to}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      form={form}
      type={type}
      className={`${styles.button} ${className} ${
        styles.inline_loader_button
      } ${isLoading ? styles.loading : ""}`}
      onClick={onClick}
      disabled={disabled || isLoading} // optional: disable while loading
    >
      <span className={styles.loader_content}>{children}</span>

      {/* The inline loader element (visible when loading) */}
      <div className={styles.loader_spinner}>
        <IoShirtOutline />
      </div>
    </button>
  );
};

export default Button;
