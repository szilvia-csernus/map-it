import { createSlice } from '@reduxjs/toolkit';

const playBtnSlice = createSlice({
	name: 'playBtnSlice',
	initialState: {
		visible: false,
		mobile: false
	},
	reducers: {
		add(state) {
			state.visible = true;
		},
		remove(state) {
			state.visible = false;
		},
		setMobile(state) {
			state.mobile = true;
		}
	},
});

export const playBtnActions = playBtnSlice.actions;

export default playBtnSlice;
