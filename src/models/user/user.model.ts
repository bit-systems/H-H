interface Address {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  status: "active" | "inactive";
  email: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  id: string;
  otp: string;
  otpExpiry: number;
  role: "user" | "admin";
  address: Address;
  createdAt: string;
  updatedAt: string;
  isMobileVerified: boolean;
  isEmailVerified: boolean;
}

export interface UserInput {
  email: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  id: string;
  role: "user" | "admin";
  address: Address;
}

export interface UserOutput {
  status: "active" | "inactive";
  email: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  address: Address;
  otp: string;
  otpExpiry: number;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
  id: string;
}
