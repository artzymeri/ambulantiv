import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthenticatorChecker = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authenticated = localStorage.getItem('authenticated');

      if (!authenticated) {
        router.push('/auth/login');
      }
    } else {
        return <>{children}</>;
    }
  }, [router]);

  
};

export default AuthenticatorChecker;
