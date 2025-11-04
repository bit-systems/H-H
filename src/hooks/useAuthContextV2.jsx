"use client";
import { useContext } from "react";

import AuthContext from "@/context/authV2/auth-context";

export const useAuthContextV2 = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext hook must be used inside AuthProvider");
  }

  return context;
};
