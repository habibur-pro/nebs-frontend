import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
  
}

type User = {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  photo?: string;
  email: string;
  hospitalId: string;
  customId:string;
};

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  refreshToken: null,
  accessToken: null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User;
      }>
    ) => {
      state.accessToken = action?.payload.accessToken;
      state.user = action.payload.user;

      Cookies.set("accessToken", action.payload.accessToken);
    },
    setRefreshToken: (
      state,
      action: PayloadAction<{ refreshToken: string }>
    ) => {
      state.refreshToken = action.payload.refreshToken;
      Cookies.set("refreshToken", action.payload.refreshToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;

      state.user = null;
      Cookies.remove("accessToken");
    },
  },
});

export const { setUser, setRefreshToken, logout } = authSlice.actions;

export default authSlice.reducer;
