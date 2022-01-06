import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { username: '', name: '', email: '' };

export const userSlice = createSlice({
  name: 'user', // Name of the Slice
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
