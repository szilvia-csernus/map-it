import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game-slice";
import howToPlaySlice from "./how-to-play-slice";
import localStorageSlice from "./local-storage-slice";
import answersSlice from "./answers-slice";
import roundSlice from "./round-slice";
import highScoresSlice from "./high-scores-slice";

const store = configureStore({
    reducer: {
        gameSlice: gameSlice.reducer,
        howToPlaySlice: howToPlaySlice.reducer,
        localStorageSlice: localStorageSlice.reducer,
        answersSlice: answersSlice.reducer,
        roundSlice: roundSlice.reducer,
        highScoresSlice: highScoresSlice.reducer
    }
})

export default store