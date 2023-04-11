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
		findCountry: false,
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
        },
        addFindCountry(state) {
            state.findCountry = true
        },
        removeFindCountry(state) {
            state.findCountry = false
        }
        
	},
});

export const gameActions = gameSlice.actions;

export default gameSlice;