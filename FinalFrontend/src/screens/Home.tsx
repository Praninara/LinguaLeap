// import React, { useState } from 'react';
// import Navbar1 from '../components/NavBar1';
// import Hero from '../components/Hero';
// import AuthCard from '../components/AuthCard';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useUserStore } from '../stores/userStore';
// // import { UserData } from '../types';
// export interface UserData {
//     name: string;
//     email: string;
//     password: string;
//   }

// function HomePage() {
//   const [activePanel, setActivePanel] = useState<'none' | 'login' | 'signup'>('none');
//   const navigate = useNavigate();
//   const setUser = useUserStore((state) => state.setUser);
//   const [formData, setFormData] = useState<UserData>({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/users', formData);
//       setActivePanel('login');
//       setFormData({ name: '', email: '', password: '' });
//     } catch (error) {
//       console.error('Error registering user:', error.response?.data?.message || error.message);
//     }
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/auth', {
//         email: formData.email,
//         password: formData.password,
//       });
//       setUser(response.data); // Save user data in the store
//       navigate('/dashboard'); // Navigate to dashboard
//     } catch (error) {
//       console.error('Error logging in:', error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-indigo-950">
//       <Navbar1
//         onLoginClick={() => setActivePanel(activePanel === 'login' ? 'none' : 'login')}
//         onSignupClick={() => setActivePanel(activePanel === 'signup' ? 'none' : 'signup')}
//       />
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <Hero />
//           <AuthCard
//             activePanel={activePanel}
//             formData={formData}
//             onFormChange={(data) => setFormData({ ...formData, ...data })}
//             onLogin={handleLogin}
//             onSignup={handleSignup}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import React, { useState } from 'react';
import Navbar1 from '../components/NavBar1';
import Hero from '../components/Hero';
import AuthCard from '../components/AuthCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

export interface UserData {
  name: string;
  email: string;
  password: string;
}

function HomePage() {
  const [activePanel, setActivePanel] = useState<'none' | 'login' | 'signup'>('none');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      setActivePanel('login');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error registering user:', error.response?.data?.message || error.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/auth', {
        email: formData.email,
        password: formData.password,
      });
      setUser(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar1
        onLoginClick={() => setActivePanel(activePanel === 'login' ? 'none' : 'login')}
        onSignupClick={() => setActivePanel(activePanel === 'signup' ? 'none' : 'signup')}
      />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Hero />
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
  );
}

export default HomePage;