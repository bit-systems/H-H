import  Link  from 'next/link';

import styles from './index.module.scss';

const Button = ({ children, form, className, to, type, onClick, disabled }) => {
  if (to) {
    return (
      <Link
        // to={to}
        className={`${styles.button} ${className}`}
        // onClick={onClick}
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
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
