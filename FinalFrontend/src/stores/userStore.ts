import create from 'zustand';
import axios from 'axios';

interface User {
  _id?: string;
  name: string;
  email: string;
  totalXP: number;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateXP: (xp: number) => void;
  deleteAccount: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateXP: (xp) => set((state) => ({
    user: state.user ? {
      ...state.user,
      totalXP: (state.user.totalXP || 0) + xp
    } : null
  })),
  deleteAccount: async () => {
    const user = get().user;
    if (!user?._id) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${user._id}`);
      set({ user: null });
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },
  updateProfile: async (userData) => {
    try {
      const response = await axios.put('http://localhost:5000/api/users/profile', userData);
      set({ user: response.data });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
}));