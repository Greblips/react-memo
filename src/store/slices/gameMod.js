import { createSlice } from "@reduxjs/toolkit";

const gameMODSlice = createSlice({
  name: "game",
  initialState: {
    isActiveGameMode: false,
    lives: [0, 0, 0],
  },
  reducers: {
    setIsActiveGameMode(state) {
      state.isActiveGameMode = !state.isActiveGameMode;
    },
    delLive(state) {
      state.lives.pop();
    },
  },
});

export const { setIsActiveGameMode, delLive } = gameMODSlice.actions;
export const gameMODReducer = gameMODSlice.reducer;
