// import { addPlayBtn, removePlayBtn } from './buttons.js';
// import { firewall } from './firewall.js';
// To use Mapbox GL with Create React App, an exclamation point has to be added 
// to exclude mapbox-gl from transpilation 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from 'react';
import classes from './Map.module.css';
import { PlayBtn } from './Buttons';
import { useDispatch } from 'react-redux';
import { playBtnActions } from '../store/play-btn-slice';


mapboxgl.accessToken =
	'pk.eyJ1Ijoic3ppbHZpMSIsImEiOiJjbGR2eW5odG0wMmFvM29zMXJ4ZnJtOWoxIn0.CSvzhr8LhmOHcUxYZ0CiTg';

export const initialZoom = () => {
	if (window.innerWidth < 600) {
		return 1;
	} else {
		return 1.5;
	}
};

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

/** Creating the map object with Mapbox GL JS - Map custom designed in Mapbox's Studio tool.
 * Creating a map object fires as a 'load' using the Mapbox-provided allowance of
 * 50.000 loads / month. This is created once and used throughout the whole lifecycle of the app.
 */

export default function MapContainer() {
	const dispatch = useDispatch();

	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(50);
	const [lat, setLat] = useState(40);
	const [zoom, setZoom] = useState(initialZoom);
	const [spin, setSpin] = useState(true);

	// Code for spinGlobe() function is adapted (and heavily modified)
	// from an example by mapbox.com:
	// https://docs.mapbox.com/mapbox-gl-js/example/globe-spin/

	// keep rotating as long as stopSpin() gets fired which happens
	// when a region button gets clicked.
	const spinGlobe = () => {
		if (spin) {
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
			// When animation is complete (1s), start spinning again.
			map.current.once('moveend', spinGlobe);
		} else {
			map.current.stop();
		}
	};

	/**  adds tileset source for country boundaries, region and country name data */
	const addTilesetSource = () => {
		map.current.addSource('country-boundaries', {
			type: 'vector',
			url: 'mapbox://mapbox.country-boundaries-v1',
			filter: ['all', ...worldviewFilters],
			generateId: true,
		});
	};

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/szilvi1/cldvz9vlb000y01qrbvjld10b', // ?optimize=true
			projection: 'globe', // Display the map as a globe
			zoom: zoom,
			minZoom: 1,
			maxZoom: 7,
			center: [lng, lat],
			interactive: false,
			attributionControl: false,
			dragPan: false,
			scrollZoom: false,
			boxZoom: false,
			dragRotate: false,
			keyboard: false,
			doubleClickZoom: false,
			touchZoomRotate: false,
		}).addControl(
			new mapboxgl.AttributionControl({
				customAttribution:
					'<span class="developer">&copy; App development by Szilvia Csernusne Berczes</span>',
			})
		);

		map.current.on('load', () => {
			addTilesetSource();
			spinGlobe();
			/* removed this tag as otherwise it would update itself with new http request in every second */
            document.getElementsByClassName('mapbox-improve-map')[0].remove();
			// callback(map);
			// document.getElementById('introContainer').remove();
			dispatch(playBtnActions.add())
		});

		// map.current.on('error', () => {
		// 	window.location.href = '../error.html';
		// });
		
	});


	return (
		<>
		<div ref={mapContainer} className={classes.mapContainer} />
		<PlayBtn map={map}/>
		</>
	);
	
}

