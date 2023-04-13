import { createSlice } from '@reduxjs/toolkit';

const answersSlice = createSlice({
	name: 'answersSlice',
	initialState: {
		checkmarkCanvasPresent: false,
		list: [],
		clickedCountryCode: null,
		score: 0
	},
	reducers: {
		addCheckmarkCanvas(state) {
			state.checkmarkCanvasPresent = true;
		},
		removeCheckmarkCanvas(state) {
			state.checkmarkCanvasPresent = false;
			state.list = [];
		},
		addCorrect(state) {
			state.list.push(true);
			state.score++;
		},
		addIncorrect(state) {
			state.list.push(false);
		},
		setClickedCountryCode(state, action) {
			state.clickedCountryCode = action.payload;
		},
		clearClickedCountryCode(state) {
			state.clickedCountryCode = null;
		},
		resetScore(state) {
			state.score = 0;
		}
	},
});

export const answersActions = answersSlice.actions;

export default answersSlice;
