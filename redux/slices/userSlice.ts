import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import {
  getDataFromDatabase,
  signInUser,
  signOutUser,
  signUpUser,
} from "@/utils/firebase";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: any;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signUpUser(email, password);
    return {
      uid: userCredential.uid,
      email: userCredential.email,
      experienceLevel: "",
      users: "",
    };
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInUser(email, password);

    return {
      uid: userCredential.uid,
      email: userCredential.email,
      experienceLevel: "",
      users: "",
    };
  }
);

export const signOut = createAsyncThunk("auth/logOut", async () => {
  await signOutUser();
  return null;
});

export const fetchUsers = createAsyncThunk(
  "auth/users",
  async (userId: string) => {
    if (!userId) {
      console.log("Invalid userId");
      return;
    }
    const users = await getDataFromDatabase(`users/${userId}`);

    return JSON.stringify(users);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    setExperienceLevel: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.experienceLevel = action.payload;
      }
    },
    setUsers: (state, action) => {
      if (state.user) {
        state.user.users = action.payload;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.user = null;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error =
          { code: action.error.code, message: action.error.message } ||
          "Could not sign up";
        state.isLoggedIn = false;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error =
          { code: action.error.code, message: action.error.message } ||
          "Could not sign in";
        state.isLoggedIn = false;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          { code: action.error.code, message: action.error.message } ||
          "Could not sign out";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (state.user) {
          state.user.users = action.payload;
        }
      });
  },
});

export const { setUser, setExperienceLevel, clearUser, setUsers } =
  authSlice.actions;
export default authSlice.reducer;
