// store.js
import create from 'zustand';

const useStore = create((set) => ({
  selectedAvatar: 0, // 초기 상태
  setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
  gender: 0, // 초기 성별 설정, 0 : 남자, 1 : 여자
  setGender: (gender) => set({ gender: gender }),
}));

export default useStore;
