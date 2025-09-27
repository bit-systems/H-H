import { useRef, useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

import { Loader } from "@/components/common";
import OTPInput from "@/components/account/otp-input";

import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { APP_CONFIG } from "@/utils/constants";

const LoginPage = () => {
  const { state: routerState } = useRouter();

  const { login, isLoading, error, defaultValue } = useAuth();
  const { sendToast } = useToast();

  const [isOtpSent, setIsOtpSent] = useState(false);

  const phoneNumberInput = useRef();
  const otpInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOtpSent(true);
    await login({
      phoneNumber: phoneNumberInput.current.value,
    });
  };

  useEffect(() => {
    if (error) {
      sendToast({ error: true, content: { message: error.message } });
    }
  }, [error]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <section className={styles.nav_section}></section>
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={`${styles.wrapper} main-container`}>
                {!isOtpSent && (
                  <>
                    <form onSubmit={handleSubmit} className={styles.form}>
                      <h2 className={styles.title}>Log into your account</h2>
                      <label className={styles.label}>
                        <span>Phone Number:</span>
                        <input
                          defaultValue={defaultValue?.phoneNumber || ""}
                          className={styles.input}
                          type="number"
                          placeholder="Phone Number"
                          required
                          ref={phoneNumberInput}
                        />
                      </label>

                      <button className={styles.button} type="submit">
                        Send OTP
                      </button>
                    </form>
                  </>
                )}
                {isOtpSent && <OTPInput ref={otpInput} />}
                <p className={styles.no_account}>
                  You must be a customer to login. Please place an order at{" "}
                  <Link href="/" className={styles.link}>
                    {APP_CONFIG.APP_FULL_NAME}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default LoginPage;
