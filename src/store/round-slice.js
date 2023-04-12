import { createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "./question-action-creators";

const roundSlice = createSlice({
    name: 'roundSlice',
    initialState: {
        score: 0,
        questions: [],
        currentCountryCode: null,
        currentCountryName: null,
        region: null,
        nrOfQuestions: 10
    },
    reducers: {
        increaseScore(state) {
            state.score ++;
        },
        resetScore(state) {
            state.score = 0;
        },
        // when registering the questions to the store, we right away set the 
        // first question and as such, asking the first country.
        setQuestions(state, action) {
            const questions = action.payload;
            const currentCountry = questions.pop();
            state.currentCountryCode = currentCountry[0];
            state.currentCountryName = currentCountry[1];
            state.questions = questions;
        },
        nextCountry(state) {
            if (state.questions.length === 0) {
                return;
            }
            const nextcountry = state.questions.pop();
            state.currentCountryCode = nextcountry[0];
            state.currentCountryName = nextcountry[1];
        },
        clearQuestions(state) {
            state.questions = []
        },
        setRegion(state, action) {
            state.region = action.payload
        }
    }
})

export const roundActions = roundSlice.actions;

export default roundSlice