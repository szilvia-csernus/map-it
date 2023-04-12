import { answersActions } from './answers-slice';
import store from '.';
import { registerAnswer } from './answer-action-creators';
import { roundActions } from './round-slice';

export const enableMapInteraction = (map) => {
	// Set scroll and drag functions
	map.dragPan.enable();
	map.scrollZoom.enable();
	map.touchZoomRotate.enable();
};

let clickedCountryCode;

export const clickEventHandler = (event, dispatch) => {
	const currentCountryCode = store.getState().roundSlice.currentCountryCode;
	// if clicked item has no id the click won't register a clicked country.
	if (event.features) {
		// filter for Crimea, Western Sahara and Falkland Islands that would otherwise incorrectly show up as part of Russia/Morocco/Argentina.
		clickedCountryCode =
			event.features[0].id === 12128447 ||
			event.features[0].id === 9965705 ||
			event.features[0].id === 659466
				? event.features[1].properties.iso_3166_1
				: event.features[0].properties.iso_3166_1;

		dispatch(answersActions.setClickedCountryCode(clickedCountryCode));
		registerAnswer(currentCountryCode, clickedCountryCode, dispatch);
		dispatch(roundActions.nextCountry());
	}
};


// we define this function on the global scope so that we can reference it in exit.js
// when it needs to be removed
export let setDblClickFeedbackHandler = () => {};

/** double click event listener for selecting a country  */
const setClickSelectEventListeners = (map, dispatch) => {
	setDblClickFeedbackHandler = (event) => {
		console.log(event)
		clickEventHandler(event, dispatch);
		// if clicked item has no id then we just ignore it.
		const clickedCountryCode = store.getState().answersSlice.clickedCountryCode;
		
		if (clickedCountryCode) {
			map.off('dblclick', 'country-hover', setDblClickFeedbackHandler);
			// removeFeedbackLayer(map);
			// addFeedback(map, countryCode, increaseScore, callback);
		}
	};
	map.on('dblclick', 'country-hover', setDblClickFeedbackHandler);
};

/** remove previously clicked country's layers and add updated event listeners */
export const setSelectEventListeners = (map, dispatch) => {
	console.log(map)
	const mobile = store.getState().playBtnSlice.mobile;
	
	// removeFeedbackLayer(map);
	if (!mobile) {
		setClickSelectEventListeners(map, dispatch);
	} else {
		// setTouchSelectEventListeners(map, countryCode, dispatch);
	}
};
