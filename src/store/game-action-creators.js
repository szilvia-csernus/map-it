import { localStorageActions } from "./local-storage-slice";
import { gameActions } from "./game-slice";
import { playBtnActions } from "./play-btn-slice";
import { howToPlayActions } from "./how-to-play-slice";

export const game = (
	map,
	mobile,
	localStorageState,
	firstTime,
	dispatch
) => {
	console.log(map, mobile);

	const continueFunction = () => {
		if (localStorageState.playedBefore) {
			// add star icon
			dispatch(gameActions.addStarIcon());
		}
		// set 'visitedBefore' in localStorage
		dispatch(localStorageActions.setVisitedBefore());
		// add exit icon
		dispatch(gameActions.addExitIcon());
		// remove 'map it!' title
		dispatch(gameActions.removeMapItTitle());
		// add 'choose a region!' title
		dispatch(gameActions.addChooseRegionTitle());
		// remove PLAY button
		dispatch(playBtnActions.remove());
		// add region buttons
		dispatch(gameActions.addRegionBtns());
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
