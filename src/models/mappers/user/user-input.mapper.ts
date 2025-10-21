import { User, UserInput, UserOutput } from "@/models/user/user.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userInputMapper = (data: any): User => {
  return {
    email: data.email as string,
    mobileNumber: data.mobileNumber,
    firstName: data.firstName,
    lastName: data.lastName,
    id: data.id,
    address: {
      address: data?.address || "",
      city: data?.city || "",
      state: data?.state || "",
      zipCode: data?.zipCode || "",
    },
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active",
    otp: "",
    isEmailVerified: false,
    isMobileVerified: false,
    otpExpiry: 0,
  };
};

export const userOutputMapper = (data: User): UserOutput => {
  return {
    address: data.address,
    createdAt: data.createdAt,
    email: data.email,
    firstName: data.firstName,
    id: data.id,
    lastName: data.lastName,
    mobileNumber: data.mobileNumber,
    otp: data.otp,
    otpExpiry: data.otpExpiry,
    role: data.role,
    status: data.status,
    updatedAt: data.updatedAt,
  };
};
