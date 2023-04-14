import store from "."
import { addFeedbackLayer, removeFeedbackLayer } from "../js/map-layers"
import { answersActions } from "./answers-slice"
import { showScore } from "./high-scores-action-creators"
import { endRound } from "./round-action-creators"
import { roundActions } from "./round-slice"


export const registerAnswer = (map, currentCountryCode, clickedCountryCode, dispatch) => {
    const continueFunction = () => {
        dispatch(answersActions.clearClickedCountryCode());
        removeFeedbackLayer(map);
		askNextCountry(map, dispatch);
    }
    
    if (currentCountryCode === clickedCountryCode) {
        dispatch(answersActions.addCorrect());
        addFeedbackLayer(map, true, currentCountryCode, clickedCountryCode, continueFunction);
    } else {
        dispatch(answersActions.addIncorrect());
        addFeedbackLayer(map, false, currentCountryCode, clickedCountryCode, continueFunction);
    }
}

export const askNextCountry = (map, dispatch) => {
    // if country list is empty, call high score and end game
    const list = store.getState().roundSlice.questions;
    if (list.length === 0) {
			// call high score and end game
			endRound(map, dispatch);
			showScore(map, dispatch);
			
		} else {
			// ask next coounty
            dispatch(roundActions.nextCountry());
		}
   
}