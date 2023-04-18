import store from "."
import { addFeedbackLayer, removeFeedbackLayer } from "./map-feedback-layer"
import { answersActions } from "./answers-slice"
import { showScore } from "./high-scores-action-creators"
import { endRound } from "./round-action-creators"
import { roundActions } from "./round-slice"

/** Registers the answer to the store, gives feedback and initiates next question */
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

/** Asks next question if there is any. If there is no more question, it initiates
 * the end-of-round logic. */
export const askNextCountry = (map, dispatch) => {
    // if country list is empty, call high score and end game
    const list = store.getState().roundSlice.questions;
    if (list.length === 0) {
			// call high score and end game
			endRound(map, dispatch);
			showScore(dispatch);
			
		} else {
			// ask next coounty
            dispatch(roundActions.nextCountry());
		}
   
}