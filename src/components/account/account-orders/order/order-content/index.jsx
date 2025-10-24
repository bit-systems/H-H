import { useKeyDown } from "@/hooks/useKeyDown";

import { Button, MediaContainer } from "@/components/common";

import { formatPrice, formatDate } from "@/helpers/format";

import styles from "./index.module.scss";

const OrderContent = ({
  closeModal,
  id,
  items,
  date,
  email,
  address,
  city,
  state,
  zipCode,
  totalAmount,
  phoneNumber,
  fullName,
}) => {
  useKeyDown(() => {
    closeModal();
  }, ["Escape"]);

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <h3>Order #{id}</h3>
          <p className={styles.date}>{formatDate(date)}</p>
        </div>
      </div>
      <div className={styles.details_container}>
        <ul className={styles.details_list}>
          <li>
            <p className={styles.details_title}>Email Address:</p>
            <p className={styles.details_content}>{email}</p>
          </li>
          {fullName && (
            <li>
              <p className={styles.details_title}>Full Name:</p>
              <p className={styles.details_content}>{fullName}</p>
            </li>
          )}
          {phoneNumber && (
            <li>
              <p className={styles.details_title}>Phone Number:</p>
              <p className={styles.details_content}>{phoneNumber}</p>
            </li>
          )}
          <li>
            <p className={styles.details_title}>Address:</p>
            <p className={styles.details_content}>{address}</p>
            <p
              className={styles.details_content}
            >{`${city}, ${state} ${zipCode}`}</p>
          </li>

          <li>
            <p className={styles.details_title}>Tracking:</p>
            <p className={styles.details_content}>{"shippingOptionContent"}</p>
          </li>
        </ul>
      </div>
      <div className={styles.list_wrapper}>
        <div className={styles.items_wrapper}>
          {items.map((item) => (
            <div key={item.skuId} className={styles.item_container}>
              <div className={styles.image_wrapper}>
                <MediaContainer
                  image={item.variant.images[0].src}
                  alt=""
                  containerClassName={styles.image_container}
                  fillClassName={styles.image_fill}
                  mediaClassName={styles.image}
                />
                <div className={styles.quantity}>
                  <div>{item.quantity}</div>
                </div>
              </div>
              <div className={styles.info_wrapper}>
                <p className={styles.name}>
                  {`${item.variant.title} - ${item.variant.brand} - ${item.variant.color}`}
                </p>
                <p className={styles.size}>{item.size?.toUpperCase()}</p>
              </div>
              <p className={styles.price}>{formatPrice(item.price)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <ul>
          <li>
            <span>Total</span>
            <span> {formatPrice(totalAmount)} </span>
          </li>
        </ul>
      </div>
      <div className={styles.button_wrapper}>
        <Button className={styles.button} onClick={closeModal}>
          Back to account
        </Button>
      </div>
    </div>
  );
};

export default OrderContent;
