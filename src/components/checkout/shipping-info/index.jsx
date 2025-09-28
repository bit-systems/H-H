import { useState, useEffect } from "react";

import { BiChevronLeft } from "react-icons/bi";
import { GiPartyPopper } from "react-icons/gi";
import { LiaShippingFastSolid } from "react-icons/lia";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { createOrUpdateUser } from "@/models/user/user.repository.ts";
import { useCartContextV2 } from "@/hooks/useCartContextV2";
import { useToast } from "@/hooks/useToast";

import AddressForm from "../address-form";

import { Button, Loader, ConfirmModal } from "@/components/common";
import { RazorpayGateway } from "@/components/common";
import { postApi } from "@/fetch-api/fetch-api";

import styles from "./index.module.scss";
import { useRouter } from "next/router";

const ShippingInfo = () => {
  const { addresses } = useAuthContext();
  const { email, shippingAddress } = useCheckoutContext();
  const { cartItems: items } = useCartContextV2();
  const { sendToast } = useToast();
  const router = useRouter();
  const [rzpOrderId, setRzpOrderId] = useState(null);

  const options = [...addresses, { label: "Add new address", value: "new" }];

  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [defaultOption, setDefaultOption] = useState(null);
  const [newAddress, setNewAddress] = useState({});

  const [userInput, setUserInput] = useState({
    email: "", //TODO prefill email if logged in
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    mobileNumber: "",
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

  const openRazorpay = (orderId) => {
    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard"
        // currency: "INR",
        amount: "50000",
        order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          console.log(response);
          setPaymentStatus("success");
          setIsLoading(false);
        },
        prefill: {
          name: userInput.firstName + " " + userInput.lastName, //your customer's name
          email: userInput.email,
          contact: "+91" + userInput.mobileNumber, //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Hawk and Hounds Corporate Office",
        },
        theme: {
          color: "#ffffffff",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        setPaymentStatus("error");
        setIsLoading(false);
      });
      rzp1.open();
      setIsLoading(false);
    } catch (error) {
      setPaymentStatus("error");

      console.log(error, "error in razorpay");
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const user = await createOrUpdateUser(userInput);

      const resp = await postApi(
        "/api/order",
        JSON.stringify({
          cart: items,
          userId: user.id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setRzpOrderId(() => resp.orderId);
      console.log(resp.orderId, "order resp");
      openRazorpay(resp.orderId);
    } catch (err) {
      console.log(err);
      sendToast({ error: true, content: { message: err.message } });
    }
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
      <RazorpayGateway />
      {!defaultOption && (
        <Loader containerClassName={styles.loader_container} noPortal={true} />
      )}
      {defaultOption && (
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
              <Button
                isLoading={isLoading}
                className={styles.button}
                type="submit"
              >
                Proceed to payment
              </Button>
            </div>
          </form>
          {paymentStatus && (
            <ConfirmModal
              confirmBtnText="Take Home"
              cancelBtnText="Exit"
              handleConfirm={() => {
                // close and take him home
                setPaymentStatus(null);
                router.push("/");
              }}
              close={() => {
                setPaymentStatus(null);
                router.push("/");
              }}
              title={
                <span>
                  <GiPartyPopper style={{ position: "relative", top: "2px" }} />{" "}
                  Hooray! Order Confirmed
                </span>
              }
              show
              text={
                <span>
                  Thank you for your purchase! Your order has been received and
                  is being processed{" "}
                  <LiaShippingFastSolid
                    style={{ position: "relative", top: "2px" }}
                  />
                </span>
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
