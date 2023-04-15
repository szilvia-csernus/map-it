import { useDispatch } from "react-redux";
import classes from './Exit.module.css';
import { ReactComponent as ExitSVG } from '../assets/icons/exit.svg';
import { forwardRef } from "react";
import { roundActions } from "../store/round-slice";
import { answersActions } from "../store/answers-slice";
import { highScoresActions } from "../store/high-scores-slice";
import { howToPlayActions } from "../store/how-to-play-slice";
import { gameActions } from "../store/game-slice";
import { timeOutForCountry } from "../store/question-action-creators";
import { timeOutForMinZoom, timeOutForQuestion } from "../store/round-action-creators";
import { resetMap } from "../js/map";
import { restartGame } from "../store/game-action-creators";
import { timeOutForCorrectFeedback, timeOutForFlyAnimation, timeOutForIncorrectFeedback } from "../store/map-feedback-layer";



/** reset score, remove all elements, reset data and add 'map it!' title */
export const updateElements = (dispatch) => {
	
    // remove all possible elements from the screen
	dispatch(highScoresActions.removeHighScoresBoard);
	dispatch(howToPlayActions.remove());
	dispatch(roundActions.removeRegionBtns());
	dispatch(roundActions.removeChooseRegionTitle());
	dispatch(roundActions.removeFindCountry());
	dispatch(highScoresActions.removeHighScoresTitle());
	dispatch(answersActions.removeCheckmarkCanvas());
	dispatch(highScoresActions.removeHighScoresBtn());
	dispatch(gameActions.removeExitIcon());
	dispatch(highScoresActions.removeStarIcon());
	dispatch(gameActions.removeNewGameBtn());

	// reset all data
	dispatch(roundActions.clearCurrentCountry());
	dispatch(answersActions.resetScore());
	dispatch(roundActions.clearQuestions());

	// add 'map it!' title
	dispatch(gameActions.addMapItTitle());

	timeOutForCorrectFeedback.clearTimeOutFunction();
	timeOutForIncorrectFeedback.clearTimeOutFunction();
	timeOutForFlyAnimation.clearTimeOutFunction();
	timeOutForMinZoom.clearTimeOutFunction();
	timeOutForQuestion.clearTimeOutFunction();
	timeOutForCountry.clearTimeOutFunction();
};


export const ExitIcon = forwardRef((props, ref) => {
    const map = ref.current
    const dispatch = useDispatch();

    const clickHandler = () => {
        resetMap(map);
        updateElements(dispatch);
        restartGame(ref, dispatch)
    }

    return (
        <ExitSVG className={classes.exit} aria-label="exit icon" onClick={clickHandler} />
    )
})