import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
