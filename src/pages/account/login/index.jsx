import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { getApi, postApi } from "@/fetch-api/fetch-api";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

import { Loader, Button } from "@/components/common";
import OTPInput from "@/components/account/otp-input";

import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { APP_CONFIG } from "@/utils/constants";

const LoginPage = () => {
  const { isLoading, error, defaultValue } = useAuth();
  const { sendToast } = useToast();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  const handleSubmit = async () => {
    const res = await getApi("/api/otp", {
      phone_number: phoneNumber,
    });

    if (res && res.isSuccess) {
      sendToast({
        error: false,
        content: { message: "OTP sent successfully" },
      });
      setIsOtpSent(true);
    } else {
      sendToast({
        error: true,
        content: { message: "Failed to send OTP. Please try again." },
      });
    }
  };

  useEffect(() => {
    if (error) {
      sendToast({ error: true, content: { message: error.message } });
    }
  }, [error]);

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {
        <>
          <section className={styles.nav_section}></section>
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={`${styles.wrapper} main-container`}>
                {!isOtpSent && (
                  <>
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className={styles.form}
                    >
                      <h2 className={styles.title}>Log into your account</h2>
                      <label className={styles.label}>
                        {/* <span>Phone Number:</span> */}
                        <input
                          defaultValue={defaultValue?.phoneNumber || ""}
                          className={styles.input}
                          type="number"
                          placeholder="Phone Number"
                          required
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                        />
                      </label>

                      <Button
                        isLoading={isLoading}
                        className={styles.button}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Send OTP
                      </Button>
                    </form>
                  </>
                )}
                {isOtpSent && (
                  <OTPInput phoneNumber={phoneNumber} resend={handleSubmit} />
                )}
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
      }
    </>
  );
};

export default LoginPage;
