import { localStorageActions } from "./local-storage-slice";
import { gameActions } from "./game-slice";
import { howToPlayActions } from "./how-to-play-slice";
import { roundActions } from "./round-slice";
import { rotateGlobe } from "../js/map";
import { updateElements } from "../Components/Exit";
import { resetMap } from "../js/map";

export const game = (
	map,
	mobile,
	localStorageState,
	firstTime,
	dispatch
) => {
	console.log(map, mobile);

	const continueFunction = () => {
		// if (localStorageState.playedBefore) {
		// 	// add star icon
		// 	dispatch(highScoresActions.addStarIcon());
		// }
		// set 'visitedBefore' in localStorage
		dispatch(localStorageActions.setVisitedBefore());
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

	if (!localStorageState.visitedBefore && firstTime) {
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

/** updates elements, resetting map and after allowing the globe to fly back to 
 * its original place and zoom level, restarts game.
 */
export const restartGame = (ref, dispatch) => {
	const map = ref.current;
    updateElements(dispatch);
    resetMap(map);
    // delay with 500ms to allow the globe to zoom back to its original zoom level
    setTimeout( () => startGame(ref, dispatch), 500);
};

export const startGame = (ref, dispatch) => {
	dispatch(gameActions.addPlayBtn());
	rotateGlobe(ref)
}
