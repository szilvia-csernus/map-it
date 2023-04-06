import { createSlice } from "@reduxjs/toolkit";

const howToPlaySlice = createSlice({
	name: 'howToPlaySlice',
	initialState: {
		visible: false
	},
	reducers: {
		add(state) {
            console.log('howToPlaySlice add', state)
			state.visible = true;
            return state;
		},
		remove(state) {
			state.visible = false;
		}
	},
});

export const howToPlayActions = howToPlaySlice.actions;

export default howToPlaySlice;