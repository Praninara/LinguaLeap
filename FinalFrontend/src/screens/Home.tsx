// // // // import React, { useState } from 'react';
// // // // import Navbar1 from '../components/NavBar1';
// // // // import Hero from '../components/Hero';
// // // // import AuthCard from '../components/AuthCard';
// // // // import axios from 'axios';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useUserStore } from '../stores/userStore';
// // // // import {BACKEND_URL} from "../config.ts";
// // // //
// // // // export interface UserData {
// // // //   name: string;
// // // //   email: string;
// // // //   password: string;
// // // // }
// // // //
// // // // function HomePage() {
// // // //   const [activePanel, setActivePanel] = useState<'none' | 'login' | 'signup'>('none');
// // // //   const navigate = useNavigate();
// // // //   const setUser = useUserStore((state) => state.setUser);
// // // //   const [formData, setFormData] = useState<UserData>({
// // // //     name: '',
// // // //     email: '',
// // // //     password: '',
// // // //   });
// // // //
// // // //   const handleSignup = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       await axios.post(BACKEND_URL + '/users', formData);
// // // //       setActivePanel('login');
// // // //       setFormData({ name: '', email: '', password: '' });
// // // //     } catch (error: any) {
// // // //       console.error('Error registering user:', error?.response?.data?.message || error?.message || 'Unknown error');
// // // //     }
// // // //   };
// // // //
// // // //   const handleLogin = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const response = await axios.post(BACKEND_URL + '/users/auth', {
// // // //         email: formData.email,
// // // //         password: formData.password,
// // // //       });
// // // //       setUser(response.data);
// // // //       navigate('/dashboard');
// // // //     } catch (error: any) {
// // // //       console.error('Error logging user:', error?.response?.data?.message || error?.message || 'Unknown error');
// // // //     }
// // // //   };
// // // //
// // // //   return (
// // // //     <div className="min-h-screen bg-black">
// // // //       <Navbar1
// // // //         onLoginClick={() => setActivePanel(activePanel === 'login' ? 'none' : 'login')}
// // // //         onSignupClick={() => setActivePanel(activePanel === 'signup' ? 'none' : 'signup')}
// // // //       />
// // // //       <div className="container mx-auto px-4">
// // // //         <div className="grid md:grid-cols-2 gap-12 items-center">
// // // //           <Hero />
// // // //           <AuthCard
// // // //             activePanel={activePanel}
// // // //             formData={formData}
// // // //             onFormChange={(data) => setFormData({ ...formData, ...data })}
// // // //             onLogin={handleLogin}
// // // //             onSignup={handleSignup}
// // // //           />
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // //
// // // // export default HomePage;
// // //
// // // import React, { useState } from 'react';
// // // import Navbar1 from '../components/NavBar1';
// // // import Hero from '../components/Hero';
// // // import AuthCard from '../components/AuthCard';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useUserStore } from '../stores/userStore';
// // // import {BACKEND_URL} from "../config.ts";
// // //
// // // export interface UserData {
// // //   name: string;
// // //   email: string;
// // //   password: string;
// // // }
// // //
// // // function HomePage() {
// // //   const [activePanel, setActivePanel] = useState<'none' | 'login' | 'signup'>('none');
// // //   const navigate = useNavigate();
// // //   const setUser = useUserStore((state) => state.setUser);
// // //   const [formData, setFormData] = useState<UserData>({
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //   });
// // //
// // //   // const handleSignup = async (e: React.FormEvent) => {
// // //   //   e.preventDefault();
// // //   //   try {
// // //   //     await axios.post(BACKEND_URL + '/api/users', formData);
// // //   //     setActivePanel('login');
// // //   //     setFormData({ name: '', email: '', password: '' });
// // //   //   } catch (error: any) {
// // //   //     console.error('Error registering user:', error?.response?.data?.message || error?.message || 'Unknown error');
// // //   //   }
// // //   // };
// // //   const handleSignup = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     try {
// // //       await axios.post(BACKEND_URL + '/api/users', formData);
// // //       setActivePanel('login');
// // //       setFormData({ name: '', email: '', password: '' });
// // //     } catch (error: any) {
// // //       console.error('Error registering user:', error?.response?.data?.message || error?.message || 'Unknown error');
// // //     }
// // //   };
// // //
// // //
// // //   // const handleLogin = async (e: React.FormEvent) => {
// // //   //   e.preventDefault();
// // //   //   try {
// // //   //     const response = await axios.post(BACKEND_URL + '/api/users/auth', {
// // //   //       email: formData.email,
// // //   //       password: formData.password,
// // //   //     });
// // //   //     setUser(response.data);
// // //   //     navigate('/dashboard');
// // //   //   } catch (error: any) {
// // //   //     console.error('Error logging user:', error?.response?.data?.message || error?.message || 'Unknown error');
// // //   //   }
// // //   // };
// // //   const handleLogin = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     try {
// // //       const response = await axios.post(BACKEND_URL + '/api/users/auth', {
// // //         email: formData.email,
// // //         password: formData.password,
// // //       });
// // //       setUser(response.data);
// // //       navigate('/dashboard');
// // //     } catch (error: any) {
// // //       console.error('Error logging user:', error?.response?.data?.message || error?.message || 'Unknown error');
// // //     }
// // //   };
// // //
// // //   return (
// // //       <div className="min-h-screen bg-black">
// // //         <Navbar1
// // //             onLoginClick={() => setActivePanel(activePanel === 'login' ? 'none' : 'login')}
// // //             onSignupClick={() => setActivePanel(activePanel === 'signup' ? 'none' : 'signup')}
// // //         />
// // //         <div className="container mx-auto px-4">
// // //           <div className="grid md:grid-cols-2 gap-12 items-center">
// // //             <Hero />
// // //             <AuthCard
// // //                 activePanel={activePanel}
// // //                 formData={formData}
// // //                 onFormChange={(data) => setFormData({ ...formData, ...data })}
// // //                 onLogin={handleLogin}
// // //                 onSignup={handleSignup}
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
// // //   );
// // // }
// // //
// // // export default HomePage;
// //
// //
// // import React, { useState } from 'react';
// // import Navbar1 from '../components/NavBar1';
// // import Hero from '../components/Hero';
// // import AuthCard from '../components/AuthCard';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { useUserStore } from '../stores/userStore';
// // import {BACKEND_URL} from "../config.ts";
// //
// // export interface UserData {
// //   name: string;
// //   email: string;
// //   password: string;
// // }
// //
// // function HomePage() {
// //   const [activePanel, setActivePanel] = useState<'none' | 'login' | 'signup'>('none');
// //   const navigate = useNavigate();
// //   const setUser = useUserStore((state) => state.setUser);
// //   const [formData, setFormData] = useState<UserData>({
// //     name: '',
// //     email: '',
// //     password: '',
// //   });
// //
// //   const handleSignup = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(BACKEND_URL + '/api/users', formData);
// //       setActivePanel('login');
// //       setFormData({ name: '', email: '', password: '' });
// //     } catch (error: any) {
// //       console.error('Error registering user:', error?.response?.data?.message || error?.message || 'Unknown error');
// //     }
// //   };
// //
// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(BACKEND_URL + '/api/users/auth', {
// //         email: formData.email,
// //         password: formData.password,
// //       });
// //       setUser(response.data);
// //       navigate('/dashboard');
// //     } catch (error: any) {
// //       console.error('Error logging user:', error?.response?.data?.message || error?.message || 'Unknown error');
// //     }
// //   };
// //
// //   return (
// //       <div className="min-h-screen bg-black">
// //         <Navbar1
// //             onLoginClick={() => setActivePanel(activePanel === 'login' ? 'none' : 'login')}
// //             onSignupClick={() => setActivePanel(activePanel === 'signup' ? 'none' : 'signup')}
// //         />
// //         <div className="container mx-auto px-4">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
// //             <Hero />
// //             <div className="w-full max-w-md mx-auto">
// //               <AuthCard
// //                   activePanel={activePanel}
// //                   formData={formData}
// //                   onFormChange={(data) => setFormData({ ...formData, ...data })}
// //                   onLogin={handleLogin}
// //                   onSignup={handleSignup}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //   );
// // }
// //
// // export default HomePage;
//
// import React, { useState, useEffect } from 'react';
// import Navbar1 from '../components/NavBar1';
// import Hero from '../components/Hero';
// import AuthCard from '../components/AuthCard';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useUserStore } from '../stores/userStore';
// import { BACKEND_URL } from "../config";
//
// export interface UserData {
//   name: string;
//   email: string;
//   password: string;
// }
//
// function HomePage() {
//   const [activePanel, setActivePanel] = useState<'none' | 'login' | 'signup'>('none');
//   const navigate = useNavigate();
//   const setUser = useUserStore((state) => state.setUser);
//   const [formData, setFormData] = useState<UserData>({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
//
//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post(BACKEND_URL + '/api/users', formData);
//       setActivePanel('login');
//       setFormData({ name: '', email: '', password: '' });
//     } catch (error: any) {
//       console.error('Error registering user:', error?.response?.data?.message || error?.message || 'Unknown error');
//     }
//   };
//
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(BACKEND_URL + '/api/users/auth', {
//         email: formData.email,
//         password: formData.password,
//       });
//       setUser(response.data);
//       navigate('/dashboard');
//     } catch (error: any) {
//       console.error('Error logging user:', error?.response?.data?.message || error?.message || 'Unknown error');
//     }
//   };
//
//   return (
//       <div className="min-h-screen bg-black">
//         <Navbar1
//             onLoginClick={() => setActivePanel(activePanel === 'login' ? 'none' : 'login')}
//             onSignupClick={() => setActivePanel(activePanel === 'signup' ? 'none' : 'signup')}
//         />
//         <div className="container mx-auto px-4">
//           <div className={`${isMobile ? 'flex flex-col space-y-6' : 'grid grid-cols-2 gap-12'} items-center`}>
//             <div className={`${isMobile ? 'w-full' : 'max-w-xl'}`}>
//               <Hero />
//             </div>
//             <div className={`${isMobile ? 'w-full' : 'max-w-md mx-auto'}`}>
//               <AuthCard
//                   activePanel={activePanel}
//                   formData={formData}
//                   onFormChange={(data) => setFormData({ ...formData, ...data })}
//                   onLogin={handleLogin}
//                   onSignup={handleSignup}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// }
//
// export default HomePage;

import React, { useState, useEffect } from 'react';
import Navbar1 from '../components/NavBar1';
import Hero from '../components/Hero';
import AuthCard from '../components/AuthCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { BACKEND_URL } from "../config";

export interface UserData {
  name: string;
  email: string;
  password: string;
}

function HomePage() {
  const [activePanel, setActivePanel] = useState<'none' | 'login' | 'signup'>('none');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(BACKEND_URL + '/api/users', formData);
      setActivePanel('login');
      setFormData({ name: '', email: '', password: '' });
    } catch (error: any) {
      console.error('Error registering user:', error?.response?.data?.message || error?.message || 'Unknown error');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(BACKEND_URL + '/api/users/auth', {
        email: formData.email,
        password: formData.password,
      });
      setUser(response.data);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error logging user:', error?.response?.data?.message || error?.message || 'Unknown error');
    }
  };

  return (
      <div className="min-h-screen bg-black">
        <Navbar1
            onLoginClick={() => setActivePanel(activePanel === 'login' ? 'none' : 'login')}
            onSignupClick={() => setActivePanel(activePanel === 'signup' ? 'none' : 'signup')}
        />
        <div className="container mx-auto px-4">
          <div className={`${isMobile ? 'flex flex-col space-y-6' : 'grid grid-cols-2 gap-12'} items-center`}>
            <div className={`${isMobile ? 'w-full' : 'max-w-xl'}`}>
              <Hero />
            </div>
            <div className={`${isMobile ? 'w-full' : 'max-w-md mx-auto'}`}>
              <AuthCard
                  activePanel={activePanel}
                  formData={formData}
                  onFormChange={(data) => setFormData({ ...formData, ...data })}
                  onLogin={handleLogin}
                  onSignup={handleSignup}
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default HomePage;