"use client";

import { useAuthContextV2 } from "@/hooks/useAuthContextV2";
import { Loader } from "@/components/common";

const withAuth = (WrappedComponent, isAdmin) => {
  return (props) => {
    const { user, authIsReady } = useAuthContextV2();

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
      window.location.href = "/account/login";
      return null;
    }

    if (isAdmin && user.role !== "admin") {
      window.location.href = "/";
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
