import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
	name: 'gameSlice',
	initialState: {
		firstTime: true,
		mapItTitle: true,
		exitIcon: false,
		questionMarkIcon: false,
		mobile: false,
		playBtn: false,
		newGameBtn: false,
		muted: true,
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
		addQuestionMarkIcon(state) {
			state.questionMarkIcon = true;
		},
		removeQuestionMarkIcon(state) {
			state.questionMarkIcon = false;
		},
		setMobile: (state) => {
			state.mobile = true;
		},
		addPlayBtn(state) {
			state.playBtn = true;
		},
		removePlayBtn(state) {
			state.playBtn = false;
		},
		addNewGameBtn(state) {
			state.newGameBtn = true;
		},
		removeNewGameBtn(state) {
			state.newGameBtn = false;
		},
		setMute(state) {
			state.muted = true;
		},
		setUnMute(state) {
			state.muted = false;
		},
	},
});

export const gameActions = gameSlice.actions;

export default gameSlice;