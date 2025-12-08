import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role?: "user" | "admin";
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
