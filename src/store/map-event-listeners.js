import { answersActions } from './answers-slice';
import store from '.';
import { registerAnswer } from './answer-action-creators';
import { removeFeedbackLayer } from '../js/map-layers';

export const enableMapInteraction = (map) => {
	// Set scroll and drag functions
	map.dragPan.enable();
	map.scrollZoom.enable();
	map.touchZoomRotate.enable();
};

// we need this variable on this file's scope, because reading clickedCountryCode
// from the store would not update in time for line 48. We still register 
// clickedCountryCode in the store on line 30.
let clickedCountryCode;

export const clickEventHandler = (event, map, dispatch) => {
	const currentCountryCode = store.getState().roundSlice.currentCountry[0];
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
		registerAnswer(map, currentCountryCode, clickedCountryCode, dispatch);
	}
};

// we define this function on the global scope so that we can reference it in exit.js
// when it needs to be removed.
export let setDblClickSelectHandler = () => {};

/** double click event listener for selecting a country  */
const setClickSelectEventListeners = (map, dispatch) => {
	setDblClickSelectHandler = (event) => {
		console.log(event)

		clickEventHandler(event, map, dispatch);
		// if clicked item has no id then we just ignore it.
		// const clickedCountryCode = store.getState().answersSlice.clickedCountryCode;
		
		if (clickedCountryCode) {
			// removeFeedbackLayer(map);
			return map.off('dblclick', 'country-hover', setDblClickSelectHandler);
		}
	};
	map.on('dblclick', 'country-hover', setDblClickSelectHandler);
};

/** remove previously clicked country's layers and add updated event listeners */
export const setSelectEventListeners = (map, dispatch) => {
	console.log(map)
	const mobile = store.getState().gameSlice.mobile;
	
	removeFeedbackLayer(map);

	if (!mobile) {
		setClickSelectEventListeners(map, dispatch);
	} else {
		// setTouchSelectEventListeners(map, countryCode, dispatch);
	}
};
