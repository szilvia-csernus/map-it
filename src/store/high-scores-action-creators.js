import store from ".";
import { highScoresActions } from "./high-scores-slice";

export const showScore = (map, dispatch) => {
    const score = store.getState().answersSlice.score;
    const region = store.getState().roundSlice.region;

	// safely retrieve region data from localStorage
	const previousScoreExists = !!window.localStorage.getItem(region);
	const highScore = Number(window.localStorage.getItem(region));

	if (highScore < score && previousScoreExists) {
		dispatch(highScoresActions.setHighScoresText())
	}

	// update high score in localStorage
	if (highScore < score) {
		window.localStorage.setItem(region, score);
	}

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
