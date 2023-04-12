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
		},
		addCorrect(state) {
			state.list.push(true);
			state.score++;
		},
		addIncorrect(state) {
			state.list.push(false);
		},
		setClickedCountryCode(state, action) {
			state.clickedCountryCode = action.payload
		},
		reset(state) {
			state.list = [];
		},
	},
});

export const answersActions = answersSlice.actions;

export default answersSlice;
