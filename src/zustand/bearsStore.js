import { create } from 'zustand';
const userBearsStore = create((set) => {
  return {
    bears: 0,
    increase: () => {
      set((state) => {
        bears: state.bears + 1;
      });
    },
    init: () => {
      set({
        bears: 0,
      });
    },
  };
});
