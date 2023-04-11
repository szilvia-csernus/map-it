import { useDispatch, useSelector } from "react-redux";
import TimeOut from '../js/timeout';
import { roundActions } from "../store/round-slice";


// export this TimeOut instance so that it can be cleared in exit.js
// export const timeOutForShowScore = new TimeOut();

/**  this recursive code asks the last question in the questions array and in oneQuestion() function it re-sets
 * the event listener to the next question after a dblclick / taphold event. */
export const askQuestions = (map, region, questions, num, showScore, dispatch) => {
	// if (questions.length === 0) {
	// 	return timeOutForShowScore.setTimeOutFunction(
	// 		() => showScore(map, score, region, num),
	// 		1000
	// 	);
	// }

	// const question = questions.pop();
	// oneQuestion(map, question[0], question[1], region, () => {
	// 	askQuestions(map, region, questions, num, showScore);
	// });
};

/** displays score and stores high score */
const showScore = (map, score, region, num) => {
	// resetMap(map);

	// // safely retrieve region data from localStorage
	// const previousScoreExists = !!window.localStorage.getItem(region);
	// const highScore = Number(window.localStorage.getItem(region));

	// let text;
	// if (highScore < score && previousScoreExists) {
	// 	text = 'HIGH';
	// } else {
	// 	text = 'Your';
	// }

	// // update high score in localStorage
	// if (highScore < score) {
	// 	window.localStorage.setItem(region, score);
	// }

	// // remove previous texts and display score
	// $('h1')
	// 	.empty()
	// 	.removeClass('question')
	// 	.addClass('choose')
	// 	.text(`${text} Score: ${score} / ${num}`);
	// $('#countryLabel').remove();
	// $('#checkmarks').remove();

	// // logic to display high scores button
	// const playedBefore =
	// 	window.localStorage.getItem('playedBefore') === 'true' ? true : false;
	// if (playedBefore) {
	// 	addHighScoresBtn(map);
	// } else {
	// 	window.localStorage.setItem('playedBefore', 'true');
	// }

	// addNewGameBtn(map);
};
