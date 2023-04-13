import store from "."
import { answersActions } from "./answers-slice"
import { showScore } from "./high-scores-action-creators"
import { endRound } from "./round-action-creators"
import { roundActions } from "./round-slice"


export const registerAnswer = (map, currentCountryCode, clickedCountryCode, dispatch) => {
    if (currentCountryCode === clickedCountryCode) {
        dispatch(answersActions.addCorrect())
    } else {
        dispatch(answersActions.addIncorrect())
    }
    dispatch(answersActions.clearClickedCountryCode())
    askNextCountry(map, dispatch)
}

export const askNextCountry = (map, dispatch) => {
    // if country list is empty, call high score and end game
    const list = store.getState().roundSlice.questions;
    if (list.length === 0) {
			// call high score and end game
			endRound(map, dispatch);
			showScore(map, dispatch);
			
		} else {
            // dispatch(answersActions.clearClickedCountryCode());
			// ask next coounty
            dispatch(roundActions.nextCountry());
		}
   
}