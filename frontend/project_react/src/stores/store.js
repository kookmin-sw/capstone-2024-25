// store.js
import create from 'zustand';

const useStore = create((set) => ({
  selectedAvatar: 0, // 초기 상태
  setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
}));

export default useStore;
