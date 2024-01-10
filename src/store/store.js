import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./slices/game";

import { gameMODReducer } from "./slices/gameMod";

export default configureStore({
  reducer: {
    game: gameReducer,
    gameMod: gameMODReducer,
  },
});
