// export let isMobile = false;
import classes from './Buttons.module.css';
import { gameActions } from '../store/game-slice';
import { playBtnActions } from '../store/play-btn-slice';
import { useDispatch, useSelector } from 'react-redux';
import {
    localStorageActions
} from '../store/local-storage-slice';
import { howToPlayActions } from '../store/how-to-play-slice';


export const PlayBtn = (map) => {
    const dispatch = useDispatch();
    const visible = useSelector(state => state.playBtnSlice.visible);
    const mobile = useSelector(state => state.playBtnSlice.mobile);
    const gameState = useSelector(state => state.gameSlice);
    const howToPlayState = useSelector(state => state.howToPlaySlice);
    const localStorageState = useSelector(state => state.localStorageSlice)
	
    const game = (map, mobile) => {
			console.log(map, mobile);

			const continueFunction = () => {
				if (localStorageState.playedBefore) {
					console.log('continue');
					// addStarIcon(map);
				}
				console.log('continue, not played before, add exit icon');
                 dispatch(localStorageActions.setVisitedBefore(localStorageState));
                 dispatch(gameActions.addExitIcon(gameState))
				// addExit(map);
				// showChooseRegionTitle();
				// addRegionBtns();
				// addClickListenersToRegionBtns(map);
			};

			if (!localStorageState.visitedBefore && gameState.firstTime) {
				dispatch(gameActions.setFirstTime(gameState));
				dispatch(howToPlayActions.add(howToPlayState));
	
			} else {
                console.log('add info icon')
                dispatch(gameActions.addQuestionMarkIcon(gameState))
				// addHowToPlayIcon(mobile);
				continueFunction();
			}
		};

    const clickEventHandler = () => {
        console.log('game!')
        game(map, mobile, gameState.firstTime);
       
	};
    const touchStartEventHandler = () => {
        dispatch(playBtnActions.setMobile(true))
    }
	return (
		<>
        { visible &&
			<button
				className={classes.playBtn}
				onClick={clickEventHandler}
				onTouchStart={touchStartEventHandler}
			>
				PLAY
			</button>
        }
		</>
	);
};

// // region button click listeners.
// const addClickListenersToRegionBtns = (map) => {
// 	const addFlyOnClick = (button, region, center, zoom) => {
// 		button.click(() => {
// 			stopSpin();
// 			map.easeTo({
// 				center,
// 				zoom,
// 				duration: 1500,
// 				bearing: 0,
// 				essential: true,
// 			});

// 			// clear previous filters if any
// 			if (map.getLayer('country-hover')) {
// 				map.setFilter('country-hover', null);
// 			}
// 			if (map.getLayer('country-touch')) {
// 				map.setFilter('country-touch', null);
// 			}
// 			if (map.getLayer('country-blur')) {
// 				map.setFilter('country-blur', null);
// 			}

// 			// set hoverable filter for region and blur filter outside region
// 			if (map.getLayer('country-hover')) {
// 				map.setFilter('country-hover', ['==', ['get', 'region'], region]);
// 			}

// 			if (map.getLayer('country-touch')) {
// 				map.setFilter('country-touch', ['==', ['get', 'region'], region]);
// 			}

// 			if (!map.getLayer('country-blur')) {
// 				addBlurLayer(map);
// 			}
// 			map.setFilter('country-blur', ['!=', ['get', 'region'], region]);

// 			// add event listeners to the filtered region of the map
// 			addDesktopEventListeners(map);

// 			startRound(map, region, 10);
// 		});
// 	};

// 	if (isMobile) {
// 		addTouchLayer(map);
// 	} else {
// 		addHoverLayer(map);
// 	}

// 	addFlyOnClick($('#europeBtn'), 'Europe', centerCoordinates.europe, 3.5);
// 	addFlyOnClick($('#asiaBtn'), 'Asia', centerCoordinates.asia, 2.5);
// 	addFlyOnClick($('#africaBtn'), 'Africa', centerCoordinates.africa, 2.8);
// 	addFlyOnClick($('#americasBtn'), 'Americas', centerCoordinates.americas, 2.5);
// };

