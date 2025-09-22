import { useState, useEffect } from "react";

import { BiChevronLeft } from "react-icons/bi";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { createOrUpdateUser } from "@/models/user/user.repository.ts";
import { createOrder } from "@/models/order/order.repository.ts";
import { useCheckout } from "@/hooks/useCheckout";
import { useCartContextV2 } from "@/hooks/useCartContextV2";
import { orderInputMapper } from "@/models/mappers/order/order-input.mapper.ts";

import AddressForm from "../address-form";

import { Button, Loader } from "@/components/common";

import styles from "./index.module.scss";

const ShippingInfo = () => {
  const { addresses } = useAuthContext();
  const { email, shippingAddress } = useCheckoutContext();
  const { isLoading } = useCheckout();
  const { cartItems: items } = useCartContextV2();

  const options = [...addresses, { label: "Add new address", value: "new" }];

  const [isDisabled, setIsDisabled] = useState(false);
  const [defaultOption, setDefaultOption] = useState(null);
  const [newAddress, setNewAddress] = useState({});

  const [userInput, setUserInput] = useState({
    email: "", //TODO prefill email if logged in
    id: "",
    name: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    label: "",
    value: "",
  });

  useEffect(() => {
    let initialOption;

    if (shippingAddress.id) {
      initialOption = options.find(
        (option) => option.value === shippingAddress.id
      );
    }

    if (!initialOption) {
      initialOption = options.find((option) => option.isMain);
    }

    if (!initialOption) {
      setDefaultOption({ label: "Add new address", value: "new" });
      setUserInput({
        ...userInput,
        label: "Add new Address",
        value: "new",
      });
    } else {
      setDefaultOption(initialOption);
      setUserInput({ ...userInput, ...initialOption });
    }
  }, []);

  useEffect(() => {
    if (userInput.value === "new") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userInput.value]);

  const handleSelectAddress = (option) => {
    setUserInput((prevState) => ({
      ...prevState,
      id: option.id || "",
      firstName: option.name || "",
      lastName: option.lastName || "",
      address: option.address || "",
      city: option.city || "",
      state: option.state || "",
      zipCode: option.zipCode || "",
      phoneNumber: option.phoneNumber || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await createOrUpdateUser(userInput);

    await createOrder(orderInputMapper(items, user));
  };

  const handleInput = (key, value) => {
    setUserInput((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    setNewAddress((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const emailStyles = {
    label:
      userInput.email.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.email.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  return (
    <div className={styles.info_container}>
      {(isLoading || !defaultOption) && (
        <Loader containerClassName={styles.loader_container} noPortal={true} />
      )}
      {!isLoading && defaultOption && (
        <div className={styles.info_wrapper}>
          <form className={styles.info_form} onSubmit={handleSubmit}>
            <div className={styles.contact_info_wrapper}>
              <p className={styles.title}>Contact Information</p>
              <div
                className={styles.float_container}
                style={{ marginBottom: "12px" }}
              >
                <label htmlFor="email" className={emailStyles.label}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  value={userInput.email}
                  className={emailStyles.input}
                  required
                  placeholder="Email"
                />
              </div>

              <div className={styles.float_container}>
                <label htmlFor="mobileNumber" className={emailStyles.label}>
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="number"
                  autoComplete="off"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  value={userInput.mobileNumber}
                  className={emailStyles.input}
                  onWheel={(e) => e.target.blur()}
                  required
                  placeholder="Mobile Number"
                />
              </div>
            </div>
            <div className={styles.shipping_address_wrapper}>
              <p className={styles.title}>Shipping address</p>
              <AddressForm
                userInput={userInput}
                options={options}
                defaultOption={defaultOption}
                isDisabled={isDisabled}
                handleInput={handleInput}
              />
            </div>
            <div className={styles.form_controls}>
              <Button className={styles.back_link} to="/cart">
                <span>
                  <BiChevronLeft />
                </span>
                Back to cart
              </Button>
              <Button className={styles.button} type="submit">
                Proceed to payment
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
