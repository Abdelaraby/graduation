import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  loginStatus: boolean;
  token: string | null; // ضيفنا token هنا
};

const initialState: AuthState = {
  loginStatus: JSON.parse(localStorage.getItem("user") || "{}").id ? true : false,
  token: localStorage.getItem("token") || null, // ضيفنا الـ token للـ initialState
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => { // Reducer جديد للـ token
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setLoginStatus, setToken } = authSlice.actions;

export default authSlice.reducer;