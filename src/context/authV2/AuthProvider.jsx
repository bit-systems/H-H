"use client";
import { useReducer, useEffect, useRef, useState, useCallback } from "react";
import { getApi } from "@/fetch-api/fetch-api";

import AuthContext from "./auth-context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authIsReady, setAuthIsReady] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("jwt_token") ?? null;
      if (token) {
        const resp = await getApi("/api/auth", "", {
          Authorization: `Bearer ${token}`,
        });
        if (resp.isSuccess) {
          setUser(resp.data.user);
        }
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
    setLoading(false);
    setAuthIsReady(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    getUser().then();
  }, []);

  return (
    <AuthContext.Provider value={{ setUser, user, loading, authIsReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
