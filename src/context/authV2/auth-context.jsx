"use client";
import { createContext } from "react";

const AuthContextV2 = createContext({
  user: null,
  setUser: () => {},
  loading: false,
  authIsReady: false,
});

export default AuthContextV2;
