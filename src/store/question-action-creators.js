import { data } from '../assets/data/countries-with-region';
import { roundActions } from './round-slice';
import TimeOut from '../utilities/timeout';
import store from '.';
import { setSelectEventListeners, enableMapInteraction } from './map-event-listeners';


/** generate unique indecies from the countries array and
 * return an array with the given number of country codes.*/
const getRandomCountryCodes = (countries, num) => {
	let codes = [];
	let randomCountryCodeIndex;
	while (codes.length < num) {
		randomCountryCodeIndex = Math.floor(Math.random() * countries.length);
		if (!codes.includes(countries[randomCountryCodeIndex])) {
			codes.push(countries[randomCountryCodeIndex]);
		}
	}
	return codes;
};

/** Generates an array of unique countries in the region and sets it to the store */
export const getQuestions = (dispatch) => {
	const region = store.getState().roundSlice.region;
	const nrOfQuestions = store.getState().roundSlice.nrOfQuestions;

	const allCodesInRegion = Object.keys(data[region]);

	const randomCodes = getRandomCountryCodes(allCodesInRegion, nrOfQuestions);

	const questions = [];
	for (const code of randomCodes) {
		const country = data[region][code];
		questions.push([code, country]);
	}

	dispatch(roundActions.setQuestions(questions));
};


export const timeOutForCountry = new TimeOut();

/** logic for asking one country */
export const oneQuestion = (map, dispatch) => {
	
	enableMapInteraction(map);
	setSelectEventListeners(map, dispatch);
};
