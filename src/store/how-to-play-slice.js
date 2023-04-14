import { createSlice } from "@reduxjs/toolkit";

const howToPlaySlice = createSlice({
	name: 'howToPlaySlice',
	initialState: {
		visible: false
	},
	reducers: {
		add: state => {
			state.visible = true;
		},
		remove: state => {
			state.visible = false;
		}
	},
});

export const howToPlayActions = howToPlaySlice.actions;

export default howToPlaySlice;