import React, { useState } from 'react';
import Navbar1 from '../components/NavBar1';
import Hero from '../components/Hero';
import AuthCard from '../components/AuthCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import {BACKEND_URL} from "../config.ts";

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
      await axios.post(BACKEND_URL + '/users', formData);
      setActivePanel('login');
      setFormData({ name: '', email: '', password: '' });
    } catch (error: any) {
      console.error('Error registering user:', error?.response?.data?.message || error?.message || 'Unknown error');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(BACKEND_URL + '/users/auth', {
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