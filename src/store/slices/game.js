import { createSlice } from "@reduxjs/toolkit";
const getGameSlice = createSlice({
  name: "game",

  initialState: {
    isActiveEasyMode: false,
    lives: [0, 0, 0],
  },
  reducers: {
    gameModeReducer(state) {
      state.isActiveEasyMode = !state.isActiveEasyMode;
    },
    delLive(state) {
      state.lives.pop();
    },
  },
});

export const { gameModeReducer, delLive } = getGameSlice.actions;
export default getGameSlice.reducer;
