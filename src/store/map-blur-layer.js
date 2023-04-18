import { worldviewFilters } from "./map-action-creators";
import { minZoom, maxZoom } from "./map-action-creators";

/** adds a blur layer to map to allow filtering out regions */
export const addBlurLayer = (map) => {
	map.addLayer({
		id: `country-blur`,
		filter: ['all', ...worldviewFilters],
		minzoom: minZoom(map),
		maxzoom: maxZoom(map),
		paint: {
			'fill-color': 'hsla(208, 66%, 35%, 0.6)',
		},
		source: 'country-boundaries',
		'source-layer': 'country_boundaries',
		type: 'fill',
	});
};

/** removes blur layer and its filters if they exist */
export const removeBlurLayer = (map) => {
	if (map.getLayer('country-blur')) {
		map.setFilter('country-blur', null);
		map.removeLayer('country-blur');
	}
};
