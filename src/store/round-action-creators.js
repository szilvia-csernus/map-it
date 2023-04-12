import { addBlurLayer } from '../js/map-layers';
import { addDesktopHoverEventListeners } from './map-hover-layer';
import { gameActions } from './game-slice';
import { roundActions } from './round-slice';
import { checkmarksActions } from './answers-slice';

import TimeOut from '../js/timeout.js';
import { getQuestions } from './question-action-creators';
import { useQuestions } from '../hooks/use-questions';
// import roundSlice from './round-slice';
import store from '.';



// export const restartRound = (map) => {
// 	removeNewGameBtn();
// 	restartGame(map);
// };


// export these timeOut functions so we can clear them up on exit
export const timeOutForMinZoom = new TimeOut();
export const timeOutForQuestion = new TimeOut();

// let questions;
// export const clearQuestions = () => (questions = null);

/** start a round on the given region */
export const startRound = (
	map,
	props,
	dispatch
) => {
	
	const region = store.getState().roundSlice.region;
	// const nrOfQuestions = store.getState().roundSlice.nrOfQuestions;
	const mobile = store.getState().playBtnSlice.mobile;

	// const roundState = store.getState().roundSlice;
	// const playBtnState = store.getState().playBtnSlice;
	// const region = roundState.region;
	// const mobile = playBtnState.mobile;
	console.log(region)
	console.log(mobile)
	// clear previous filters if any
	if (map.getLayer('country-hover')) {
		map.setFilter('country-hover', null);
	}

	if (map.getLayer('country-touch')) {
		map.setFilter('country-touch', null);
	}

	if (map.getLayer('country-blur')) {
		map.setFilter('country-blur', null);
	}

	// set hoverable filter for region and blur filter outside region
	if (map.getLayer('country-hover')) {
		map.setFilter('country-hover', ['==', ['get', 'region'], region]);
	}

	if (map.getLayer('country-touch')) {
		map.setFilter('country-touch', ['==', ['get', 'region'], region]);
	}

	if (!map.getLayer('country-blur')) {
		addBlurLayer(map);
	}
	map.setFilter('country-blur', ['!=', ['get', 'region'], region]);

	// add hover event listeners to the filtered region of the map
	addDesktopHoverEventListeners(map);
	// resetScore();

	// flies to selected region
	map.easeTo({
		center: props.coordinates,
		zoom: props.zoom,
		duration: 1500,
		bearing: 0,
		essential: true,
	});

	// set minimum zoom level after animation finished.
	timeOutForMinZoom.setTimeOutFunction(
		() => map.setMinZoom(map.getZoom() - 0.5),
		1000
	);

	timeOutForQuestion.setTimeOutFunction(() => {
		dispatch(gameActions.addFindCountry());
		getQuestions(dispatch);
	}, 1000);
	
};
