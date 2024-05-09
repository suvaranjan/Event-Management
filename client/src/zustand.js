// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
    loginUser: null,
    setLoginUser: (userInfo) => set({ loginUser: userInfo }),

    storeToken: null,
    setStoreToken: (token) => set({ storeToken: token }),

    events: [],
    setEvents: (newFriends) => set({ friends: newFriends }),

    prevEventData: [],
    setPrevEventData: (data) => set({ prevEventData: data }),

}));

export default useStore;