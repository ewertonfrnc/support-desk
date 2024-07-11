import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./auth.service.ts";
import {
  LoginPayload,
  RegisterPayload,
  User,
} from "../../interfaces/auth.interface.ts";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

type InitialState = {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const INITIAL_STATE: InitialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk<void, void>("auth/logout", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload as unknown as User;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
