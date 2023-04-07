// Code for spinGlobe() function is adapted (and heavily modified)
// from an example by mapbox.com:
// https://docs.mapbox.com/mapbox-gl-js/example/globe-spin/

// keep rotating as long as map.current.stop() gets fired which happens
// when a region button gets clicked.

export const rotateGlobe = (map) => {
    
	console.log(map);
	const spinGlobe = () => {

		let distancePerSecond = 360 / 100; // 100 seconds per one round
		const center = map.current.getCenter();
		center.lng -= distancePerSecond;
		// Smoothly animate the map over one second.
		// When this animation is complete, it calls the 'moveend' event.
		map.current.easeTo({
			center,
			duration: 1000,
			easing: (n) => n,
		});
	};
    spinGlobe();
	// When animation is complete (1s), start spinning again.
	map.current.once('moveend', spinGlobe);
    map.current.on('click', function () {
        map.current.off('moveend', spinGlobe)
        return map.current.off('click', this)
    })
}

