import classes from './Buttons.module.css';
import { gameActions } from '../store/game-slice';
import { playBtnActions } from '../store/play-btn-slice';
import { useDispatch, useSelector } from 'react-redux';
import {
    localStorageActions
} from '../store/local-storage-slice';
import { howToPlayActions } from '../store/how-to-play-slice';
import { game } from '../js/game';


export const PlayBtn = (map) => {
    const dispatch = useDispatch();
    const visible = useSelector(state => state.playBtnSlice.visible);
    const mobile = useSelector(state => state.playBtnSlice.mobile);
    const gameState = useSelector(state => state.gameSlice);
    const howToPlayState = useSelector(state => state.howToPlaySlice);
    const localStorageState = useSelector(state => state.localStorageSlice);
    const playBtnState = useSelector(state => state.playBtnSlice);
	
    const clickEventHandler = () => {
        game(
					map,
					mobile,
					localStorageState,
					localStorageActions,
					gameActions,
					gameState,
					playBtnActions,
					playBtnState,
					howToPlayActions,
					howToPlayState,
					dispatch
				);
       
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

// used to center the flying animation the middle of the regions.
const centerCoordinates = {
	europe: [14.213562, 53.541532],
	asia: [77.367783, 32.17445],
	africa: [17.015762, 8.895926],
	americas: [-84.81102, 11.632733],
};

function OneRegionBtn (props) {
    const classNames = `${classes.regionBtn} ${props.className}`;

    function clickHandler () {

    }
    return (
        <button className={classNames} onClick={clickHandler}>{props.children}</button>
    )
}

/** creates all 4 region buttons */
export function RegionBtns () {
    const regions = [
        {name: 'Europe', className: classes.europe},
        {name: 'Asia', className: classes.asia},
        {name: 'Americas', className: classes.americas},
        {name: 'Africa', className: classes.africa},
    ];
    const buttons = [];

    for (const region of regions) {
        buttons.push(<OneRegionBtn key={region.name} className={region.className}>{region.name}</OneRegionBtn>)
    }
   
    return (
        <div className={classes.regionCanvas}>
            {buttons }
        </div>
    )
}


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

