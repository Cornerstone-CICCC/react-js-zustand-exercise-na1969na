import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  firstname: string;
  lastname: string;
  age: number;
  hobbies: string[];
}

interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (index: number) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      deleteUser: (index) =>
        set((state) => ({
          users: state.users.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "user-storage",
    }
  )
);
