import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { Trophy, Star, Gamepad2, Brain, Target, Sparkles, LogOut, Settings, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useUserStore } from '../stores/userStore';
import axios from 'axios';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { level: memoryLevel, highScore: memoryHighScore } = useGameStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const deleteAccount = useUserStore((state) => state.deleteAccount);
  const updateProfile = useUserStore((state) => state.updateProfile);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    setFormData({
      name: user.name,
      email: user.email,
      password: '',
    });
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout');
      clearUser();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#2b2b2b] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-pixel text-[#ffd700]">Player Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] transition-colors"
            >
              <Settings className="w-6 h-6 text-[#ffd700]" />
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-2 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] transition-colors"
            >
              <LogOut className="w-6 h-6 text-[#ffd700]" />
            </button>
          </div>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#3a3a3a] p-6 rounded-lg pixel-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-8 h-8 text-[#ffd700]" />
              <h2 className="text-xl font-pixel text-white">{user?.name}</h2>
            </div>
            <div className="space-y-2">
              <p className="text-[#ffd700] font-pixel">Total XP: {user?.totalXP || 0}</p>
              <p className="text-white font-pixel">Memory Level: {memoryLevel}</p>
            </div>
          </motion.div>
        </div>

        {/* Games Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#3a3a3a] p-6 rounded-lg pixel-border cursor-pointer"
            onClick={() => navigate('/memoryGame')}
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-[#ffd700]" />
              <h2 className="text-xl font-pixel text-white">Memory Match</h2>
            </div>
            <p className="text-[#ffd700] font-pixel mb-4">Master French vocabulary!</p>
            <div className="flex justify-between items-center">
              <span className="text-white font-pixel">High Score: {memoryHighScore}</span>
              <button className="px-4 py-2 bg-[#ffd700] text-[#2b2b2b] rounded font-pixel">
                Play
              </button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#3a3a3a] p-6 rounded-lg pixel-border cursor-pointer"
            onClick={() => navigate('/dinoGame')}
          >
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-8 h-8 text-[#ffd700]" />
              <h2 className="text-xl font-pixel text-white">DinoLingo</h2>
            </div>
            <p className="text-[#ffd700] font-pixel mb-4">Learn Spanish with our Dino!</p>
            <div className="flex justify-between items-center">
              <span className="text-white font-pixel">Unlock new words</span>
              <button className="px-4 py-2 bg-[#ffd700] text-[#2b2b2b] rounded font-pixel">
                Play
              </button>
            </div>
          </motion.div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showLogoutModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#3a3a3a] p-8 rounded-lg max-w-md w-full"
              >
                <h2 className="text-2xl font-pixel text-[#ffd700] mb-6">Confirm Logout</h2>
                <p className="text-white font-pixel mb-8">Are you sure you want to logout?</p>
                <div className="flex gap-4">
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded font-pixel"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-2 bg-[#4a4a4a] text-white rounded font-pixel"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showSettingsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#3a3a3a] p-8 rounded-lg max-w-md w-full"
              >
                <h2 className="text-2xl font-pixel text-[#ffd700] mb-6">Settings</h2>
                
                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="block text-white font-pixel mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded bg-[#2b2b2b] text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-pixel mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded bg-[#2b2b2b] text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-pixel mb-2">New Password</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2 rounded bg-[#2b2b2b] text-white"
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-[#ffd700] text-[#2b2b2b] rounded font-pixel"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 px-4 py-2 bg-[#4a4a4a] text-white rounded font-pixel"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full px-4 py-2 bg-[#ffd700] text-[#2b2b2b] rounded font-pixel"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full px-4 py-2 bg-red-500 text-white rounded font-pixel"
                    >
                      Delete Account
                    </button>
                    <button
                      onClick={() => setShowSettingsModal(false)}
                      className="w-full px-4 py-2 bg-[#4a4a4a] text-white rounded font-pixel"
                    >
                      Close
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#3a3a3a] p-8 rounded-lg max-w-md w-full"
              >
                <h2 className="text-2xl font-pixel text-red-500 mb-6">Delete Account</h2>
                <p className="text-white font-pixel mb-8">
                  Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded font-pixel"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 bg-[#4a4a4a] text-white rounded font-pixel"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardScreen;