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
