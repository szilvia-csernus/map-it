import { countryCoordinates } from '../assets/data/world-countries-centroids.js';
import { answersActions } from '../store/answers-slice.js';
// import TimeOut from './timeout.js';

import { worldviewFilters } from './map.js';

import { minZoom, maxZoom } from './map.js';

/** this layer is used on mobile devices to provide a touch-selectable layer to
 * allow identifying the touched country.  */
export const addTouchLayer = (map) => {
	map.addLayer({
		id: 'country-touch',
		filter: ['all', ...worldviewFilters],
		minzoom: minZoom(map),
		maxzoom: maxZoom(map),
		paint: {
			// fully transparent
			'fill-color': 'hsla(0, 0%, 100%, 0)',
		},
		source: 'country-boundaries',
		'source-layer': 'country_boundaries',
		type: 'fill',
	});
};

/** remove hover layer and its filters if they exist */
export const removeTouchLayer = (map) => {
	if (map.getLayer('country-touch')) {
		map.setFilter('country-touch', null);
		map.removeLayer('country-touch');
	}
};



// // timeout functions to allow time for feedback and flying animations.
// export const timeOutForCorrectFeedback = new TimeOut();
// export const timeOutForIncorrectFeedback = new TimeOut();
// export const timeOutForFlyAnimation = new TimeOut();

// export let marker;

// /** adds the name of the country */
// const addMarker = (map, code) => {
// 	if (countryCoordinates[code]) {
// 		const el = document.createElement('div');
// 		el.className = 'marker';
// 		// I'm using the local dataset to display country names because in case of an incorrect country was clicked
// 		// the correct country's data can't be reached through the event.features property (as it wasn't clicked!).
// 		el.textContent = countryCoordinates[code].countryName;

// 		marker = new mapboxgl.Marker(el)
// 			.setLngLat(countryCoordinates[code].coordinates)
// 			.addTo(map);
// 	}
// };

// /** this layer renders the country green/red according to the answer given
//  * as well as increases the score if the answer is correct.
//  */
// export const addFeedbackLayer = (
// 	map,
// 	correct,
// 	correctCountryCode,
// 	callback
// ) => {
// 	const topMostLayer = map.getLayer('country-touch') ? 'country-touch' : '';
// 	map.addLayer(
// 		{
// 			filter: [
// 				'all',
// 				...worldviewFilters,
// 				['==', ['get', 'iso_3166_1'], clickedCountryCode],
// 			],
// 			id: 'country-feedback-line',
// 			minzoom: minZoom(map),
// 			maxzoom: maxZoom(map),
// 			paint: {
// 				'line-color': '#fff',
// 				'line-width': 3,
// 			},
// 			source: 'country-boundaries',
// 			'source-layer': 'country_boundaries',
// 			type: 'line',
// 		},
// 		topMostLayer
// 	);

// 	if (correct) {
// 		map.addLayer(
// 			{
// 				filter: [
// 					'all',
// 					...worldviewFilters,
// 					['==', ['get', 'iso_3166_1'], clickedCountryCode],
// 				],
// 				id: 'country-feedback-fill-correct',
// 				minzoom: minZoom(map),
// 				maxzoom: maxZoom(map),
// 				paint: {
// 					'fill-color': '#00D700',
// 				},
// 				source: 'country-boundaries',
// 				'source-layer': 'country_boundaries',
// 				type: 'fill',
// 			},
// 			topMostLayer
// 		);

// 		addMarker(map, clickedCountryCode);

// 		// The callback function calls the next question recursively. (See askQuestions function)
// 		timeOutForCorrectFeedback.setTimeOutFunction(callback, 2000);
// 	} else {
// 		map.addLayer(
// 			{
// 				filter: [
// 					'all',
// 					['==', ['get', 'iso_3166_1'], clickedCountryCode],
// 					...worldviewFilters,
// 				],
// 				id: 'country-feedback-fill-incorrect',
// 				minzoom: minZoom(map),
// 				maxzoom: maxZoom(map),
// 				paint: {
// 					'fill-color': '#D60000',
// 				},
// 				source: 'country-boundaries',
// 				'source-layer': 'country_boundaries',
// 				type: 'fill',
// 			},
// 			topMostLayer
// 		);

// 		addMarker(map, clickedCountryCode);

// 		timeOutForFlyAnimation.setTimeOutFunction(
// 			() => flyToCorrectCountry(map, correctCountryCode),
// 			1500
// 		);
// 		timeOutForIncorrectFeedback.setTimeOutFunction(callback, 3500);
// 	}
// };

// /** if a wrong answer was clicked, we fly the map to the correct country */
// const flyToCorrectCountry = (map, code) => {
// 	removeFeedbackLayer(map);

// 	map.addLayer({
// 		filter: ['all', ...worldviewFilters, ['==', ['get', 'iso_3166_1'], code]],
// 		id: 'corrected-country',
// 		minzoom: minZoom(map),
// 		maxzoom: maxZoom(map),
// 		paint: {
// 			'line-color': '#2cf32c',
// 			'line-width': 3,
// 		},
// 		source: 'country-boundaries',
// 		'source-layer': 'country_boundaries',
// 		type: 'line',
// 	});

// 	const longlat = countryCoordinates[code].coordinates;
// 	map.flyTo({
// 		center: longlat,
// 		duration: 1000,
// 		bearing: 0,
// 		essential: true,
// 	});

// 	addMarker(map, code);
// };

// /** remove other country selection if there is any */
// export const removeFeedbackLayer = (map) => {
// 	if (map.getLayer('country-feedback-fill-correct')) {
// 		map.setFilter('country-feedback-fill-correct', null);
// 		map.removeLayer('country-feedback-fill-correct');
// 	}
// 	if (map.getLayer('country-feedback-fill-incorrect')) {
// 		map.setFilter('country-feedback-fill-incorrect', null);
// 		map.removeLayer('country-feedback-fill-incorrect');
// 	}
// 	if (map.getLayer('country-feedback-line')) {
// 		map.setFilter('country-feedback-line', null);
// 		map.removeLayer('country-feedback-line');
// 	}
// 	if (map.getLayer('corrected-country')) {
// 		map.setFilter('corrected-country', null);
// 		map.removeLayer('corrected-country');
// 	}

// 	// if there is already a marker on the map then remove it
// 	if (marker) {
// 		marker.remove();
// 	}
// };



