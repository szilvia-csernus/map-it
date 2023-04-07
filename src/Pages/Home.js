import classes from './Home.module.css';
import Intro from '../Components/Intro';
import HowToPlay from '../Components/HowToPlay';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';
import { ReactComponent as QuestionMarkIcon } from '../assets/icons/questionMark.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { useSelector, useDispatch } from 'react-redux';
import { ChooseARegionTitle, MapItTitle } from '../Components/Titles';
import { PlayBtn, RegionBtns } from '../Components/Buttons';
import { useRef, useState, useEffect } from 'react';
import { playBtnActions } from '../store/play-btn-slice';
import { rotateGlobe } from '../js/map';

// import { firewall } from './firewall.js';
// To use Mapbox GL with Create React App, an exclamation point has to be added 
// to exclude mapbox-gl from transpilation 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

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

mapboxgl.accessToken =
	'pk.eyJ1Ijoic3ppbHZpMSIsImEiOiJjbGR2eW5odG0wMmFvM29zMXJ4ZnJtOWoxIn0.CSvzhr8LhmOHcUxYZ0CiTg';

export default function Home () {
	const dispatch = useDispatch();
	const howToPlayVisible = useSelector((state) => state.howToPlaySlice.visible);
	const exitIconVisible = useSelector((state) => state.gameSlice.exitIcon);
	const questionMarkIconVisible = useSelector(
		(state) => state.gameSlice.questionMarkIcon
	);
	const starIconVisible = useSelector((state) => state.gameSlice.starIcon);
	const chooseRegionTitleVisible = useSelector(
		(state) => state.gameSlice.chooseRegionTitle
	);
	const mapItTitleVisible = useSelector((state) => state.gameSlice.mapItTitle);
	const playBtnVisible = useSelector((state) => state.playBtnSlice.visible);
	const regionBtnsVisible = useSelector((state) => state.gameSlice.regionBtns);

	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(50);
	const [lat, setLat] = useState(40);
	const [zoom, setZoom] = useState(initialZoom);

	useEffect(() => {
		if (map.current) return; // initialize map only once

		/** Creating the map object with Mapbox GL JS - Map custom designed in Mapbox's Studio tool.
		 * Creating a map object fires as a 'load' using the Mapbox-provided allowance of
		 * 50.000 loads / month. This is created once and used throughout the whole lifecycle of the app.
		 */
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

		/**  adds tileset source for country boundaries, region and country name data */
		const addTilesetSource = () => {
			map.current.addSource('country-boundaries', {
				type: 'vector',
				url: 'mapbox://mapbox.country-boundaries-v1',
				filter: ['all', ...worldviewFilters],
				generateId: true,
			});
		};

		console.log(map);
		map.current.on('load', () => {
			addTilesetSource();
			rotateGlobe(map)
		
			/* removed this tag as otherwise it would update itself with new http request in every second */
			document.getElementsByClassName('mapbox-improve-map')[0].remove();
			// callback(map);
			// document.getElementById('introContainer').remove();
			dispatch(playBtnActions.add());
		});

		// map.current.on('error', () => {
		// 	window.location.href = '../error.html';
		// });
	});

	

	


	// If another event cancels the touch event the default would be to jump back within the code when the player returns.
	// This default behaviour would mess up the event listeners & game flow, that's the reason for preventDefault().
	// I have to figure out how to achieve this in React:
	// document.querySelector('body').on('touchcancel', (e) => e.preventDefault());
	return (
		<>
			{mapItTitleVisible && <MapItTitle />}
			<Intro />

			<div ref={mapContainer} className={classes.mapContainer} />
			{playBtnVisible && <PlayBtn ref={map} />}

			{howToPlayVisible && <HowToPlay />}
			{exitIconVisible && (
				<ExitIcon className={classes.exit} aria-label="exit icon" />
			)}
			{questionMarkIconVisible && (
				<QuestionMarkIcon
					className={classes.questionMark}
					aria-label="exit icon"
				/>
			)}
			{starIconVisible && (
				<StarIcon className={classes.star} aria-label="exit icon" />
			)}
			{chooseRegionTitleVisible && <ChooseARegionTitle />}
			{regionBtnsVisible && <RegionBtns ref={map} />}
		</>
	);
}

