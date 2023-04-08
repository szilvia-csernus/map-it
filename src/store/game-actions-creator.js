// import { addExit } from './exit.js';
// import { startRound } from './round.js';
// import {
// 	addHoverLayer,
// 	addBlurLayer,
// 	addDesktopEventListeners,
// 	addTouchLayer,
// } from './layers.js';
// import { addRegionBtns, addStarIcon } from './buttons.js';
// import { addHowToPlay, addHowToPlayIcon } from './how-to-play.js';
// import { stopSpin } from './spin.js';

import { playedBefore, visitedBefore, setVisitedBefore,  } from "./local-storage-slice";
import { gameActions } from './game-slice';
import { howToPlayActions } from "./how-to-play-slice";
import { useSelector } from "react-redux";





// add region button click listeners

// const showChooseRegionTitle = () => {
// 	$('h1')
// 		.removeClass('title')
// 		.addClass('choose')
// 		.fadeIn('slow')
// 		.text('Choose a region!');
// };

// Starts the game.
export const game = (map, mobile, firstTime) => {
    
    console.log(map, mobile);

	const continueFunction = () => {
		if (playedBefore()) {
            console.log('continue')
			// addStarIcon(map);
		}
		console.log('continue, not played before');
		// addExit(map);
		// showChooseRegionTitle();
		// addRegionBtns();
		// addClickListenersToRegionBtns(map);
	};

	if (!visitedBefore() && firstTime) {
		gameActions.notFirstTimeAnymore();
		setVisitedBefore();
		howToPlayActions.add();
	} else {
		// addHowToPlayIcon(mobile);
		continueFunction();
	}
};
