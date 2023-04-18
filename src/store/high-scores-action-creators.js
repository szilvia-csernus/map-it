import store from ".";
import { highScoresActions } from "./high-scores-slice";

/** Enables high score rendering, updates localStorage and enables 
 * 'View your best scores here' button */
export const showScore = (dispatch) => {
    const score = store.getState().answersSlice.score;
    const region = store.getState().roundSlice.region;

	// safely retrieves region data from localStorage
	const previousScoreExists = !!window.localStorage.getItem(region);
	const highScore = Number(window.localStorage.getItem(region));

	// If score is higher then any previous one, sets the text to 'HIGH' Score
	if (highScore < score && previousScoreExists) {
		dispatch(highScoresActions.setHighScoresText())
	}

	// updates high score in localStorage
	if (highScore < score) {
		window.localStorage.setItem(region, score);
	}

	// Enables rendering the high scores text
    dispatch(highScoresActions.addHighScoresTitle());
    

	// logic to display high scores button
	const playedBefore =
		window.localStorage.getItem('playedBefore') === 'true' ? true : false;
	if (playedBefore) {
		dispatch(highScoresActions.addHighScoresBtn());
	} else {
		window.localStorage.setItem('playedBefore', 'true');
	}

	
};
