import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
	name: 'gameSlice',
	initialState: {
		firstTime: true,
        mapItTitle: true,
        exitIcon: false,
        starIcon: false,
        questionMarkIcon: false,
        chooseRegionTitle: false,
        regionBtns: false,
	},
	reducers: {
		setFirstTime(state) {
			state.firstTime = false;
		},
		addMapItTitle(state) {
			state.mapItTitle = true;
		},
		removeMapItTitle(state) {
			state.mapItTitle = false;
		},
		addExitIcon(state) {
			state.exitIcon = true;
		},
		removeExitIcon(state) {
			state.exitIcon = false;
		},
		addStarIcon(state) {
			state.starIcon = true;
		},
		removeStarIcon(state) {
			state.starIcon = false;
		},
		addQuestionMarkIcon(state) {
			state.questionMarkIcon = true;
		},
		removeQuestionMarkIcon(state) {
			state.questionMarkIcon = false;
		},
        addChooseRegionTitle(state) {
            state.chooseRegionTitle = true
        },
        removeChooseRegionTitle(state) {
            state.chooseRegionTitle = false
        },
        addRegionBtns(state) {
            state.regionBtns = true
        },
        removeRegionBtns(state) {
            state.regionBtns = false
        }
        
	},
});

export const gameActions = gameSlice.actions;

export default gameSlice;


// used to center the flying animation the middle of the regions.
const centerCoordinates = {
	europe: [14.213562, 53.541532],
	asia: [77.367783, 32.17445],
	africa: [17.015762, 8.895926],
	americas: [-84.81102, 11.632733],
};

// add region button click listeners

// const showChooseRegionTitle = () => {
// 	$('h1')
// 		.removeClass('title')
// 		.addClass('choose')
// 		.fadeIn('slow')
// 		.text('Choose a region!');
// };

// Starts the game.