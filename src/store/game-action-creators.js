import { gameActions } from "./game-slice";
import { howToPlayActions } from "./how-to-play-slice";
import { roundActions } from "./round-slice";
import { rotateGlobe } from "./map-action-creators";
import { updateElements } from "../Components/Exit";
import { resetMap } from "./map-action-creators";
import store from ".";
import { highScoresActions } from "./high-scores-slice";

/** Updates elements on the screen (inc. region buttons) and starts game logic. */
export const game = (dispatch) => {
	const visitedBefore =
		window.localStorage.getItem('visitedBefore') === 'true' ? true : false;
	const firstTime = store.getState().gameSlice.firstTime;
	const playedBefore =
		window.localStorage.getItem('playedBefore') === 'true' ? true : false;

	const continueFunction = () => {
		if (playedBefore) {
			// add star icon
			dispatch(highScoresActions.addStarIcon());
		}
		// set 'visitedBefore' in localStorage
		window.localStorage.setItem('visitedBefore', 'true');
		// add exit icon
		dispatch(gameActions.addExitIcon());
		// remove 'map it!' title
		dispatch(gameActions.removeMapItTitle());
		// add 'choose a region!' title
		dispatch(roundActions.addChooseRegionTitle());
		// remove PLAY button
		dispatch(gameActions.removePlayBtn());
		// add region buttons
		dispatch(roundActions.addRegionBtns());
	};

	if (!visitedBefore && firstTime) {
		// set 'firstTime' to false
		dispatch(gameActions.setFirstTime());
		// show 'how to play' animation
		dispatch(howToPlayActions.add());
	} else {
		// add question mark icon
		dispatch(gameActions.addQuestionMarkIcon());

		continueFunction();
	}
};

/** Updates elements, resets map and, after allowing the globe to fly back to 
 * its original place and zoom level, starts the game.*/
export const restartGame = (ref, dispatch) => {
	const map = ref.current;
    updateElements(dispatch);
    resetMap(map);
    // delay with 500ms to allow the globe to zoom back to its original zoom level
    setTimeout( () => startGame(ref, dispatch), 500);
};

/** Starts game. Adds PLAY button and starts rotating the globe. */
export const startGame = (ref, dispatch) => {
	dispatch(gameActions.addPlayBtn());
	rotateGlobe(ref)
}
