import { minZoom, maxZoom, worldviewFilters } from './map-action-creators'

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
