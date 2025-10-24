"use client";

import { useRouter } from "next/router";
import { useAuthContextV2 } from "@/hooks/useAuthContextV2";
import { Loader } from "@/components/common";

const withAuth = (WrappedComponent, isAdmin) => {
  return (props) => {
    const { user, authIsReady } = useAuthContextV2();
    const router = useRouter();

    if (!authIsReady) {
      return (
        <Loader
          noPortal={false}
          backdropClassName={""}
          containerClassName={""}
          loaderClassName={""}
        />
      );
    }
    if (!user || !user.id) {
      router.push("/account/login");
      return null;
    }

    if (isAdmin && user.role !== "admin") {
      router.push("/");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
