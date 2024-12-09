import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: (() => {
    try {
      const storedMsg = localStorage.getItem("msg");
      return storedMsg ? JSON.parse(storedMsg) : null;
    } catch (error) {
      console.error("Failed to parse 'msg' from localStorage:", error);
      return null;
    }
  })(),
};

export const msgSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    msgInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { msgInfo } = msgSlice.actions;

export default msgSlice.reducer;
