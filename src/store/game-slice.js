import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
	name: 'gameSlice',
	initialState: {
		firstTime: true,
        exitIcon: false,
        starIcon: false,
        questionMarkIcon: false,
	},
	reducers: {
		setFirstTime(state) {
			state.firstTime = false;
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