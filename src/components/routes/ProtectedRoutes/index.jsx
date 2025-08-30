import { Outlet } from 'react-router-dom';
import Link from 'next/link';

import { useAuthContext } from '@/hooks/useAuthContext';
import { useCartContext } from '@/hooks/useCartContext';
import { useRouter } from 'next/router';

const ProtectedRoutes = ({ needAuth, needAdmin }) => {
  const { isVerified, isAdmin } = useAuthContext();
  const { cartIsReady } = useCartContext();
  const { pathname, state } = useRouter();

  if (needAdmin) {
    if (isAdmin) {
      return <Outlet />;
    }

    if (!isAdmin) {
      return <Link href="/" />;
    }
  }

  if (needAuth) {
    if (isVerified && cartIsReady) {
      return <Outlet />;
    }

    if (!isVerified && cartIsReady) {
      return <Link href="/account/login" state={pathname} />;
    }
  }

  if (!needAuth) {
    if (!isVerified && cartIsReady) {
      return <Outlet />;
    }

    if (isVerified && cartIsReady) {
      if (state === '/checkout') {
        return <Link href={state} />;
      } else if (state === '/account') {
        return <Link href={state} />;
      }
      return <Link href="/" />;
    }
  }

  return <Link href="/" />;
};

export default ProtectedRoutes;
