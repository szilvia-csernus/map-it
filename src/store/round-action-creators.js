import {
	addBlurLayer,
	addDesktopEventListeners,
} from '../js/map-layers';
import { gameActions } from './game-slice';
import { roundActions } from './round-slice';
import { checkmarksActions } from './answers-slice';

import TimeOut from '../js/timeout.js';
import { getQuestions } from './question-action-creators';
import { useQuestions } from '../hooks/use-questions';

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
		map.setFilter('country-hover', ['==', ['get', 'region'], props.region]);
	}

	if (map.getLayer('country-touch')) {
		map.setFilter('country-touch', ['==', ['get', 'region'], props.region]);
	}

	if (!map.getLayer('country-blur')) {
		addBlurLayer(map);
	}
	map.setFilter('country-blur', ['!=', ['get', 'region'], props.region]);

	// add event listeners to the filtered region of the map
	addDesktopEventListeners(map, props.mobile);
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
		getQuestions(props.region, props.nrOfQuestions, dispatch);
	}, 1000);

	// set questions in action creator;
	console.log(props.region);
	
};
