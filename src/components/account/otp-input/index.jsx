"use client";
import React, { useState, useRef, useEffect } from "react";
import { getApi, postApi } from "@/fetch-api/fetch-api";

import styles from "./index.module.scss";
import { useAuthContextV2 } from "@/hooks/useAuthContextV2";
import { useRouter } from "next/navigation";

const OTPInput = ({ phoneNumber, resend }) => {
  const resetTime = 30;

  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [status, setStatus] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const router = useRouter();
  const { setUser } = useAuthContextV2();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1);
    setOtp(newOtp);
    setStatus("");

    if (element.value !== "" && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const [timer, setTimer] = useState(resetTime);

  useEffect(() => {
    let interval = null;

    if (timer > 0 && !interval) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsResendDisabled(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    const code = otp.join("");
    if (code.length === 4) {
      const resp = await postApi(
        "/api/otp",
        JSON.stringify({ otp: code, phoneNumber })
      );

      if (resp && resp.isSuccess) {
        setStatus("OTP Verified Successfully!");
        setTimer(0);
        localStorage.setItem("jwt_token", resp.data.token);
        setUser(resp.data.user);
        router.push("/account");
        return;
      } else {
        setStatus("Invalid OTP. Please try again.");
        return;
      }
    } else {
      setStatus("Please enter the complete 4-digit code.");
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  const handleResend = async () => {
    setOtp(new Array(4).fill(""));
    await resend();
    setStatus("New OTP sent successfully.");
    setIsResendDisabled(true);
    setTimer(resetTime);

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  return (
    <div className="otpComponentWrapper">
      <style>
        {`
          /* Custom styles for the OTP component, matching the black/white theme */
          .otpComponentWrapper {
            // min-height: 100vh;
            // background-color: #f9fafb;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            // font-family: 'Inter', sans-serif;
            color: #000;
          }
          .otpContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 1.5rem;
            padding: 2rem;
            // background-color: #ffffff;
            // border: 1px solid #e5e7eb;
            border-radius: 1rem;
            // box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            max-width: 550px;
            width: 100%;
          }
          .otpInputGroup {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
            justify-content: center;
          }
          .otpInput {
            width: 5rem;
            height: 5rem;
            text-align: center;
            font-size: 2rem;
            font-weight: 700;
            border: 2px solid #ccc;
            border-radius: 0.5rem;
            transition: border-color 0.2s, box-shadow 0.2s;
            color: #000;
            background-color: #fff;
          }
          .otpInput:focus {
            border-color: #000;
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
          }
          .otpButton {
            background-color: #000;
            color: #fff;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: background-color 0.2s, opacity 0.2s;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            width: 22rem;

          }
          .otpButton:hover:not(:disabled) {
            background-color: #333;
          }
          .otpButton:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        `}
      </style>
      <div className="otpContainer">
        <h2 className={styles.title} style={{ marginBottom: "2rem" }}>
          Verify your Phone Number
        </h2>
        <p
          style={{ marginBottom: "1.5rem", fontSize: "1.2rem", color: "#444" }}
        >
          Enter the 4-digit code sent to your phone.
        </p>
        <div className="otpInputGroup">
          {otp.map((data, index) => (
            <input
              key={index}
              className="otpInput"
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              // Auto-focus on the first input on mount
              autoFocus={index === 0}
            />
          ))}
        </div>
        <button
          className="otpButton"
          onClick={verifyOTP}
          disabled={!isComplete}
        >
          Verify Code
        </button>
        {status && (
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1rem",
              color: status.includes("Verified")
                ? "#10b981"
                : status.includes("sent")
                ? "#10b981"
                : "#ef4444",
              fontWeight: "bold",
            }}
          >
            {status}
          </p>
        )}
        <button
          style={{
            marginTop: "1.5rem",
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: isResendDisabled ? "#999" : "#000",
            textDecoration: isResendDisabled ? "none" : "underline",
            cursor: isResendDisabled ? "not-allowed" : "pointer",
          }}
          disabled={isResendDisabled}
          onClick={handleResend}
        >
          {isResendDisabled ? `Resend Code in ${timer}s` : "Resend Code"}
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
