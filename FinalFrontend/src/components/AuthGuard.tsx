import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return user ? <>{children}</> : null;
};

export default AuthGuard;