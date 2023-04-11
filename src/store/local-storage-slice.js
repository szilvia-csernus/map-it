import { createSlice } from '@reduxjs/toolkit';

const localStorageSlice = createSlice({
	name: 'localStorageSlice',
	initialState: {
		visitedBefore: window.localStorage.getItem('visitedBefore') === 'true' ? true : false,
        playedBefore: window.localStorage.getItem('playedBefore') === 'true' ? true : false
	},
	reducers: {
		setVisitedBefore: state => {
            window.localStorage.setItem('visitedBefore', 'true');
			state.visitedBefore = true;
		},
		setPlayedBefore: state => {
            window.localStorage.setItem('playedBefore', 'true');
			state.playedBefore = true;
		},
	},
});

export const localStorageActions = localStorageSlice.actions;

export default localStorageSlice;

// export function playedBefore() {
// 	return window.localStorage.getItem('playedBefore') === 'true';
// }

// export function setPlayedBefore() {
// 	window.localStorage.setItem('playedBefore', 'true');
// }

// export const visitedBefore =
// 	window.localStorage.getItem('visitedBefore') === 'true' ? true : false;

// export function setVisitedBefore() {
// 	window.localStorage.setItem('visitedBefore', 'true');
// }
