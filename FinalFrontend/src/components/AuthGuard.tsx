// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUserStore } from '../stores/userStore';
//
// interface AuthGuardProps {
//   children: React.ReactNode;
// }
//
// const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
//   const navigate = useNavigate();
//   const user = useUserStore((state) => state.user);
//
//   useEffect(() => {
//     if (!user) {
//       navigate('/');
//     }
//   }, [user, navigate]);
//
//   return user ? <>{children}</> : null;
// };
//
// export default AuthGuard;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { motion } from 'framer-motion';

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

  if (!user) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#2b2b2b] flex items-center justify-center"
        >
          <div className="text-[#ffd700] text-xl font-pixel">
            Please log in to continue...
          </div>
        </motion.div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;