import { answersActions } from './answers-slice';
import store from '.';
import { registerAnswer } from './answer-action-creators';
import { removeFeedbackLayer } from './map-feedback-layer';

/** Enables user to interact with the map. */
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

// we define these functions on the global scope so later can be referenced in exit.js when we
// want to remove them from the event listeners.
export let touchStartFunction = () => {};
export let touchEndFunction = () => {};

/** touch event listener for selecting a country */
const setTouchSelectEventListeners = (map, dispatch) => {

    let startX, startY, startTime, endX, endY, endTime, force;

    touchEndFunction = (endEvent) => {
        map.off('touchend', 'country-touch', touchEndFunction);
        endX = endEvent.point.x;
        endY = endEvent.point.y;
        endTime = endEvent.originalEvent.timeStamp;

        // the distance btw the start and end of the touch action
        const distance = ((endX - startX) ** 2 + (startY - endY) ** 2) ** (1 / 2);
        
        if (
            // if touch ended  with one finger only
            (endEvent.originalEvent.touches.length <= 1) &&  
            // if tap was not rather a swipe..
            distance < 10 && 
            // if tap was longer than 50ms or was a strong tap 
            ((endTime - startTime) > 50 || force > 0.5)
            )

        {
            clickEventHandler(endEvent, map, dispatch);

            // if the tap was on a valid country
            if (clickedCountryCode) {
                // don't listen to furter touches until next question
                map.off('touchstart', 'country-touch', touchStartFunction);
            } 
        }
    };

    touchStartFunction = (startEvent) => {
        const moreFingersTouch = (startEvent.originalEvent.touches.length > 1);

        startX = startEvent.point.x;
        startY = startEvent.point.y;
        startTime = startEvent.originalEvent.timeStamp;
        force = startEvent.originalEvent.targetTouches[0].force ? startEvent.originalEvent.targetTouches[0].force : 0;

        if (!moreFingersTouch) {
            map.once('touchend', 'country-touch', touchEndFunction);
        } 
    };

    map.on('touchstart', 'country-touch', touchStartFunction);
};

/** Registers the clicked country to the store and initiates 'registerAnswer' logic. */
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

		clickEventHandler(event, map, dispatch);
		// This code snippet would seem better but does not work because the store is
		// not getting updated continuously but getting cached hence it's not ready in time.
		// const clickedCountryCode = store.getState().answersSlice.clickedCountryCode;

		// if clicked item has no id then we just ignore it.
		if (clickedCountryCode) {
			return map.off('dblclick', 'country-hover', setDblClickSelectHandler);
		}
	};
	map.on('dblclick', 'country-hover', setDblClickSelectHandler);
};

/** adds event listeners to select country */
export const setSelectEventListeners = (map, dispatch) => {
	const mobile = store.getState().gameSlice.mobile;
	
	// remove previously clicked country's layers first
	removeFeedbackLayer(map);

	if (!mobile) {
		setClickSelectEventListeners(map, dispatch);
	} else {
		setTouchSelectEventListeners(map, dispatch);
	}
};
