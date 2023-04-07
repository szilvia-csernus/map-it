export const game = (
	map,
	mobile,
	localStorageState,
	localStorageActions,
	gameActions,
	gameState,
	playBtnActions,
	playBtnState,
	howToPlayActions,
	howToPlayState,
	dispatch
) => {
	console.log(map, mobile);

	const continueFunction = () => {
		if (localStorageState.playedBefore) {
            // add star icon
			dispatch(gameActions.addStarIcon(gameState));
		}
        // set 'visitedBefore' in localStorage
		dispatch(localStorageActions.setVisitedBefore(localStorageState));
        // add exit icon
		dispatch(gameActions.addExitIcon(gameState));
        // remove 'map it!' title
		dispatch(gameActions.removeMapItTitle(gameState));
        // add 'choose a region!' title
		dispatch(gameActions.addChooseRegionTitle(gameState));
        // remove PLAY button
		dispatch(playBtnActions.remove(playBtnState));
        // add region buttons
		dispatch(gameActions.addRegionBtns(gameState));
	};

	if (!localStorageState.visitedBefore && gameState.firstTime) {
        // set 'firstTime' to false
		dispatch(gameActions.setFirstTime(gameState));
        // show 'how to play' animation
		dispatch(howToPlayActions.add(howToPlayState));
	} else {
        // add question mark icon
		dispatch(gameActions.addQuestionMarkIcon(gameState));

		continueFunction();
	}
};
