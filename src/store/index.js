import { configureStore } from "@reduxjs/toolkit";
import playBtnSlice from "./play-btn-slice";
import gameSlice from "./game-slice";
import howToPlaySlice from "./how-to-play-slice";
import localStorageSlice from "./local-storage-slice";
import answersSlice from "./answers-slice";
import roundSlice from "./round-slice";

const store = configureStore({
    reducer: {
        playBtnSlice: playBtnSlice.reducer,
        gameSlice: gameSlice.reducer,
        howToPlaySlice: howToPlaySlice.reducer,
        localStorageSlice: localStorageSlice.reducer,
        answersSlice: answersSlice.reducer,
        roundSlice: roundSlice.reducer
    }
})

export default store