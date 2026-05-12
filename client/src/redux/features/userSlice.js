import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserNotifications: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, updateUserNotifications } = userSlice.actions;
export default userSlice.reducer;
