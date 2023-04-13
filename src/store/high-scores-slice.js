import { createSlice } from "@reduxjs/toolkit";

const highScoresSlice = createSlice({
	name: 'highScoresSlice',
	initialState: {
		starIcon: false,
		highScoresTitle: false,
		highScoresText: 'Your',
		highScoresBtn: false,
		highScoresBoard: false,
	},
	reducers: {
		addStarIcon(state) {
			state.starIcon = true;
		},
		removeStarIcon(state) {
			state.starIcon = false;
		},
		addHighScoresTitle(state) {
			state.highScoresTitle = true;
		},
		removeHighScoresTitle(state) {
			state.highScoresTitle = false;
		},
		setHighScoresText(state) {
			state.highScoresText = 'HIGH';
		},
		resetHighScoresText(state) {
			state.highScoresText = 'Your';
		},
		addHighScoresBtn(state) {
			state.highScoresBtn = true;
		},
		removeHighScoresBtn(state) {
			state.highScoresBtn = false;
		},
		addHighScoresBoard(state) {
			state.highScoresBoard = true;
		},
		removeHighScoresBoard(state) {
			state.highScoresBoard = false;
		},
	},
});

export const highScoresActions = highScoresSlice.actions;

export default highScoresSlice