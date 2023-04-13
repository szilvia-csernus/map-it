import store from ".";
import { worldviewFilters } from '../js/map.js';

const minZoom = (map) => map.getMinZoom() - 0.1;
const maxZoom = (map) => map.getMaxZoom() + 0.5;

// export let clickedCountryCode = null;

// export const resetClickedCountryCode = () => (clickedCountryCode = null);


let hoveredStateId = null;

/** adds hover-change layer to the map. Used on non-mobile devices.  */
export const addHoverLayer = (map) => {
	// hovering effect is adopted from one of the Examples given on mapbox.com
	// https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
	map.addLayer({
		id: 'country-hover',
		filter: ['all', ...worldviewFilters],
		minzoom: minZoom(map),
		maxzoom: maxZoom(map),
		paint: {
			'fill-color': [
				'case',
				[
					'all',
					...worldviewFilters,
					['boolean', ['feature-state', 'hover'], false],
				],
				'#fff', // paint the country white on hover
				'hsla(0, 0%, 100%, 0)',
			],
		},
		source: 'country-boundaries',
		'source-layer': 'country_boundaries',
		type: 'fill',
	});
};

/** remove hover layer and its filters if they exist */
export const removeHoverLayer = (map) => {
	if (map.getLayer('country-hover')) {
		map.setFeatureState(
			{
				source: 'country-boundaries',
				sourceLayer: 'country_boundaries',
				id: hoveredStateId,
			},
			{
				hover: false,
			}
		);
		map.setFilter('country-hover', null);
		map.removeLayer('country-hover');
	}
};


/** if a mouse is hovered over a country, set its 'hover' feature true  */
export function mouseMoveHoverEventListenerHandler(e) {
	this.getCanvas().style.cursor = 'pointer';

	// when the user moves the mouse over the state-fill layer,
	// we'll update the feature state for the feature under the mouse.
	// non-touch devices only.
	if (e.features.length > 0) {
		if (hoveredStateId) {
			this.setFeatureState(
				{
					source: 'country-boundaries',
					sourceLayer: 'country_boundaries',
					id: hoveredStateId,
				},
				{
					hover: false,
				}
			);
		}
		// filter for Crimea, Western Sahara and Falkland Islands that would otherwise incorrectly show up as part of Russia/Morocco/Argentina.
		hoveredStateId =
			e.features[0].id === 12128447 ||
			e.features[0].id === 9965705 ||
			e.features[0].id === 659466
				? e.features[1].id
				: e.features[0].id;
		this.setFeatureState(
			{
				source: 'country-boundaries',
				sourceLayer: 'country_boundaries',
				id: hoveredStateId,
			},
			{
				hover: true,
			}
		);
	}
}

/** if the mouse leaves the country, update the 'hover' state feature (set to false) */
export function mouseLeaveHoverEventListenerHandler() {
	if (hoveredStateId) {
		// When the mouse leaves the state-fill layer, update the feature state of the
		// previously hovered feature.
		this.setFeatureState(
			{
				source: 'country-boundaries',
				sourceLayer: 'country_boundaries',
				id: hoveredStateId,
			},
			{
				hover: false,
			}
		);
		hoveredStateId = null;
	}

	this.getCanvas().style.cursor = '';
}

/** adds hover effect onto the map */
export const addDesktopHoverEventListeners = (map) => {
	const mobile = store.getState().gameSlice.mobile;

	if (map.getLayer('country-hover') && !mobile) {
		map.on('mousemove', `country-hover`, mouseMoveHoverEventListenerHandler);
		map.on('mouseleave', 'country-hover', mouseLeaveHoverEventListenerHandler);
	}
};