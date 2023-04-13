import { removeBlurLayer } from '../store/map-blur-layer';
import {
	removeHoverLayer,
	mouseMoveHoverEventListenerHandler,
	mouseLeaveHoverEventListenerHandler,
} from '../store/map-hover-layer';
import { setDblClickSelectHandler } from '../store/map-event-listeners';

// exclude disputed areas as well as worldviews with conflicting interests:
// Russia regarding Crimea, Serbia regarding Kosovo,
// Morocco regarding Western Sahara and
// Argentina regarding Falkland Islands.
export const worldviewFilters = [
	['has', 'color_group'],
	['match', ['get', 'disputed'], ['true'], false, true],
	['match', ['get', 'worldview'], ['RU'], false, true],
	['match', ['get', 'worldview'], ['CN'], false, true],
	['match', ['get', 'worldview'], ['MA'], false, true],
	['match', ['get', 'worldview'], ['AR'], false, true],
];

export const initialZoom = () => {
	if (window.innerWidth < 600) {
		return 1;
	} else {
		return 1.5;
	}
};

export const minZoom = (map) => map.getMinZoom() - 0.1;
export const maxZoom = (map) => map.getMaxZoom() + 0.5;

// Code for spinGlobe() function is adapted (and heavily modified)
// from an example by mapbox.com:
// https://docs.mapbox.com/mapbox-gl-js/example/globe-spin/

// keep rotating as long as map.current.stop() gets fired which happens
// when a region button gets clicked.

export const rotateGlobe = (ref) => {
	const map = ref.current;
	console.log(map);
	const spinGlobe = () => {
		console.log('1 round');
		let distancePerSecond = 360 / 100; // 100 seconds per one round
		const center = ref.current.getCenter();
		center.lng -= distancePerSecond;
		// Smoothly animate the map over one second.
		// When this animation is complete, it calls the 'moveend' event.
		ref.current.easeTo({
			center,
			duration: 1000,
			easing: (n) => n,
		});
		// When animation is complete (1s), start spinning again.
		map.once('moveend', spinGlobe);
	};

	spinGlobe();

	window.document.onmousedown = () => {
		console.log('click!');
		map.off('moveend', spinGlobe);
		return (window.document.onmousedown = null);
	};

	// from Chrome Dev Tools, it seems like 'onmousedown' gets fired on the touch function too.
	// If on real device it's not the case, uncomment this block!

	// window.document.ontouchstart = () => {
	// 	console.log('click!');
	// 	map.off('moveend', spinGlobe);
	// 	return window.document.ontouchstart = null
	// };
};

/** disables dragging, scrolling and zooming on the map */
export const disableMapInteraction = (map) => {
	map.dragPan.disable();
	map.scrollZoom.disable();
	map.touchZoomRotate.disable();
};

/** removes all the layers, markers, event listeners, disables map interactions and flies back to initial projection & zoom level */
export const resetMap = (map, dispatch) => {
	removeHoverLayer(map);
	// removeTouchLayer(map);
	removeBlurLayer(map);
	// removeFeedbackLayer(map);

	disableMapInteraction(map);

	map.setMinZoom(initialZoom());

	map.off('mousemove', `country-hover`, mouseMoveHoverEventListenerHandler);
	map.off('mouseleave', 'country-hover', mouseLeaveHoverEventListenerHandler);
	map.off('dblclick', 'country-hover', setDblClickSelectHandler);
	// map.off('touchstart','country-touch', touchStartFunction);
	// map.off('touchend','country-touch', touchEndFunction);

	// if (marker) {
	//     marker.remove();
	// }

	map.easeTo({
		zoom: initialZoom(),
		duration: 500,
		bearing: 0,
		essential: true,
	});
};
