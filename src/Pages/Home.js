// To use Mapbox GL with Create React App, an exclamation point has to be added
// to exclude mapbox-gl from transpilation
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import classes from './Home.module.css';
import HowToPlay from '../Components/HowToPlay';
import { ExitIcon } from '../Components/Exit';
import { QuestionMarkIcon } from '../Components/HowToPlay';
import { StarIcon } from '../Components/HighScores';
import { useSelector, useDispatch } from 'react-redux';
import {
	ChooseARegionTitle,
	FindTheCountryTitle,
	MapItTitle,
} from '../Components/Titles';

import RegionBtns from '../Components/RegionBtns';
import { useRef, useEffect, memo } from 'react';
import { worldviewFilters } from '../store/map-action-creators';
import { HighScoresBoard } from '../Components/HighScores';
import { initialZoom } from '../store/map-action-creators';
import NewGameBtn from '../Components/NewGameBtn';
import Checkmarks from '../Components/Checkmarks';
import Country from '../Components/Country';
import { HighScoresTitle, HighScoresBtn } from '../Components/HighScores';
import { useNavigate } from 'react-router-dom';
import { startGame } from '../store/game-action-creators';
import PlayBtn from '../Components/PlayBtn';
import Sound from '../Components/Sound';

mapboxgl.accessToken =
	'pk.eyJ1Ijoic3ppbHZpMSIsImEiOiJjbGR4Z2M5YzEwaDVkNDBwaGcwOWIzcHg4In0.PTFFlTTPfA3PnnA01vzcZw';

/** Creates the mapbox object and forwards its reference to the elements that need it.
 * Renders most of the components conditionally. */
const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const howToPlayVisible = useSelector((state) => state.howToPlaySlice.visible);
	const exitIconVisible = useSelector((state) => state.gameSlice.exitIcon);
	const questionMarkIconVisible = useSelector(
		(state) => state.gameSlice.questionMarkIcon
	);
	const starIconVisible = useSelector(
		(state) => state.highScoresSlice.starIcon
	);
	const chooseRegionTitleVisible = useSelector(
		(state) => state.roundSlice.chooseRegionTitle
	);
	const mapItTitleVisible = useSelector((state) => state.gameSlice.mapItTitle);
	const playBtnVisible = useSelector((state) => state.gameSlice.playBtn);
	const regionBtnsVisible = useSelector((state) => state.roundSlice.regionBtns);
	const findTheCountryTitleVisible = useSelector(
		(state) => state.roundSlice.findCountry
	);
	const checkmarkCanvasPresent = useSelector(
		(state) => state.answersSlice.checkmarkCanvasPresent
	);
	const highScoresTitleVisible = useSelector(
		(state) => state.highScoresSlice.highScoresTitle
	);
	const highScoresBtnVisible = useSelector(
		(state) => state.highScoresSlice.highScoresBtn
	);
	const highScoresBoardVisible = useSelector(
		(state) => state.highScoresSlice.highScoresBoard
	);
	const newGameBtnVisible = useSelector((state) => state.gameSlice.newGameBtn);
	const soundIconVisible = useSelector((state) => state.gameSlice.soundIcon);

	const playedBefore =
		window.localStorage.getItem('playedBefore') === 'true' ? true : false;

	const mapContainer = useRef(null);
	const map = useRef(null);

	useEffect(() => {
		// if Mapbox GL JS is not supported, we navigate to the NoSupport.js page.
		if (!mapboxgl.supported()) {
			navigate('/no-support');
		} else {
			if (map.current) return; // initialize map only once

			// Creating the map object with Mapbox GL JS - Map custom designed in Mapbox's Studio tool.
			// Creating a map object fires as a 'load' using the Mapbox-provided allowance of
			// 50.000 loads / month. This is created once and used throughout the whole lifecycle of the app.
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/szilvi1/cldvz9vlb000y01qrbvjld10b', // ?optimize=true
				projection: 'globe', // Display the map as a globe
				zoom: initialZoom(),
				minZoom: 1,
				maxZoom: 7,
				center: [50, 40],
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
		}

		/**  adds tileset source for country boundaries, region and country name data */
		const addTilesetSource = () => {
			map.current.addSource('country-boundaries', {
				type: 'vector',
				url: 'mapbox://mapbox.country-boundaries-v1',
				filter: ['all', ...worldviewFilters],
				generateId: true,
			});
		};

		map.current.on('load', () => {
			// after loading of the map has finished, we add tile source.
			addTilesetSource();

			// removed this tag as otherwise it would update itself with new http request in every 
			// second as the globe rotates.
			// if (document.getElementsByClassName('mapbox-improve-map').length > 0) {
			// 	document.getElementsByClassName('mapbox-improve-map')[0].remove();
			// }

			// start game only after the map has fully loaded.
			startGame(map, dispatch);
		});

		// if there is a connection error, we navigate to the MapErrror.js page.
		map.current.on('error', () => {
			navigate('/error');
		});

		// I gave useEffect() an empty dependency array so that it renders just once
		// when the component is first registered.
	}, []); // eslint-disable-line

	return (
		<>
			{mapItTitleVisible && <MapItTitle />}

			<div ref={mapContainer} className={classes.mapContainer} />

			{playBtnVisible && <PlayBtn />}
			{howToPlayVisible && <HowToPlay />}
			{exitIconVisible && <ExitIcon ref={map} />}
			{questionMarkIconVisible && <QuestionMarkIcon />}
			{playedBefore && starIconVisible && <StarIcon />}
			{chooseRegionTitleVisible && <ChooseARegionTitle />}
			{regionBtnsVisible && <RegionBtns ref={map} />}
			{findTheCountryTitleVisible && <FindTheCountryTitle />}
			{checkmarkCanvasPresent && <Checkmarks />}
			{findTheCountryTitleVisible && <Country ref={map} />}
			{highScoresTitleVisible && <HighScoresTitle />}
			{highScoresBtnVisible && <HighScoresBtn />}
			{highScoresBoardVisible && <HighScoresBoard />}
			{newGameBtnVisible && <NewGameBtn ref={map} />}
			{soundIconVisible && <Sound />}
		</>
	);
};

// memoizing this component prevents it re-rendering when the star- or question
// mark icons are clicked.
export default memo(Home);
