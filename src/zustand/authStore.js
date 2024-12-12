import { create } from 'zustand';
import { registerUserAPI } from '@/api/auth';

export const useAuthStore = create((set) => ({
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  // Actions
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user, isLogin: true }),
  logout: () => set({ isLogin: false, user: null }),

  // Async actions
  registerUser: async ({ email, password, name }) => {
    // console.log('zustand registerUser 호출 데이터:', { email, password, name }); // 확인용 로그

    set({ registerStatus: 'loading', registerError: null });
    try {
      const user = await registerUserAPI(email, password, name);
      set({ registerStatus: 'succeeded', user, isLogin: true });
    } catch (error) {
      set({
        registerStatus: 'failed',
        registerError: error.message || 'Registration failed',
      });
    }
  },
}));
