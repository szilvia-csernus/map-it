import { createSlice } from "@reduxjs/toolkit";

const roundSlice = createSlice({
	name: 'roundSlice',
	initialState: {
		chooseRegionTitle: false,
		regionBtns: false,
		findCountry: false,
		questions: [],
		currentCountry: null,
		region: null,
		nrOfQuestions: 10,
		muted: true,
	},
	reducers: {
		addChooseRegionTitle(state) {
			state.chooseRegionTitle = true;
		},
		removeChooseRegionTitle(state) {
			state.chooseRegionTitle = false;
		},
		addRegionBtns(state) {
			state.regionBtns = true;
		},
		removeRegionBtns(state) {
			state.regionBtns = false;
		},
		addFindCountry(state) {
			state.findCountry = true;
		},
		removeFindCountry(state) {
			state.findCountry = false;
		},
		// when registering the questions to the store, we right away set the
		// first question and as such, asking the first country.
		setQuestions(state, action) {
			const questions = action.payload;
			state.currentCountry = questions.pop();
			state.questions = questions;
		},
		nextCountry(state) {
			state.currentCountry = state.questions.pop();
		},
		clearQuestions(state) {
			state.questions = [];
		},
		clearCurrentCountry(state) {
			state.currentCountry = null;
		},
		setRegion(state, action) {
			state.region = action.payload;
		},
		setMute(state) {
			state.muted = true;
		},
		setUnMute(state) {
			state.muted = false;
		},
	},
});

export const roundActions = roundSlice.actions;

export default roundSlice