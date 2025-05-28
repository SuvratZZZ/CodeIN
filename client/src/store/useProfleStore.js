// src/store/useUserStore.ts
import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { axiosInstance } from '../lib/axios';


export const useProfileStore = create ((set) => ({
  user: useAuthStore.getState().authUser,
  solvedProblems: [],
  isLoading: false,
  getSolvedProblems: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/problems/get-solved-problems-by-user`);
    //   console.log(response.data.problems);
      set({ solvedProblems: response.data.problems });
    } catch (error) {
      console.error('Error fetching solved problems:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));