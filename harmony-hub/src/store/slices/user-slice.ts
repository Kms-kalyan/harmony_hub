import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import User from "../../models/user-model";

export interface UserState {
    users: User[];
  }
  
  const initialState: UserState = {
    users: [],
  };

export const UserSlice = createSlice({
    name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUserDetails: (
      state,
      action: PayloadAction<{ userId: string; updatedUser: Partial<User> }>
    ) => {
      const { userId, updatedUser } = action.payload;
      const existingUser = state.users.find((user) => user.userID === userId);
      if (existingUser) {
        Object.assign(existingUser, updatedUser);
      }
    },
    fetchUserDetails: (state, action: PayloadAction<string>) => {
      // implement fetching logic here using an API
      // For instance, you might dispatch an action to fetch user details from an API
      // and update the state with the received data
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const userIdToDelete = action.payload;
      state.users = state.users.filter((user) => user.userID !== userIdToDelete);
    },
    updatePassword: (
      state,
      action: PayloadAction<{ userId: string; newPassword: string }>
    ) => {
      const { userId, newPassword } = action.payload;
      const userToUpdate = state.users.find((user) => user.userID === userId);
      if (userToUpdate) {
        userToUpdate.password = newPassword;
      }
    },
  },
})

export const {
    addUser,
    updateUserDetails,
    fetchUserDetails,
    deleteUser,
    updatePassword,
  } = UserSlice.actions;
  
  export default UserSlice.reducer;