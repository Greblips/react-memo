import { createSlice } from "@reduxjs/toolkit";
const gameSlice = createSlice({
  name: "game",
  initialState: {
    isActiveGameMode: true,
    lives: [0],
  },
  reducers: {
    setIsActiveGameModeNative(state) {
      state.isActiveGameMode = !state.isActiveGameMode;
    },
    delLive(state) {
      state.lives.pop();
    },
  },
});

export const { setIsActiveGameModeNative, delLive } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
