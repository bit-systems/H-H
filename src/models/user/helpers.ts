export const getOtp = (length = 5): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

export const setOtpExpiry = (minutes = 10): number => {
  return Date.now() + minutes * 60 * 1000;
};
