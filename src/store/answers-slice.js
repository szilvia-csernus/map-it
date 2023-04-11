import { createSlice } from '@reduxjs/toolkit';

const answersSlice = createSlice({
	name: 'answersSlice',
	initialState: {
		checkmarkCanvasPresent: false,
		list: [],
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
			return state;
		},
		addIncorrect(state) {
			state.list.push(false);
			return state;
		},
		reset(state) {
			state.list = [];
			return state;
		},
	},
});

export const answersActions = answersSlice.actions;

export default answersSlice;
