// services/useUserStore.js
import create from 'zustand';

const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => {
        set({ user });
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    },
}));

export const useUserStoreHook = () => useUserStore((state) => state);

export default useUserStore;
