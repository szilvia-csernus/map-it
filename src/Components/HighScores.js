import { useDispatch, useSelector } from 'react-redux';
import classes from './HighScores.module.css';
import { highScoresActions } from '../store/high-scores-slice';
import Modal from './Modal';
import { ReactComponent as StarSVG } from '../assets/icons/star.svg';
import useSound from 'use-sound';
import buttonSound from '../assets/audio/button.mp3';
import highScoreSound from '../assets/audio/highScore.mp3';
import { useEffect } from 'react';

/** Renders the the high scores into a modal. Includes the background and all elements. */
export const HighScoresBoard = () => {
    const dispatch = useDispatch();
	const muted = useSelector((state) => state.roundSlice.muted);
	const [play] = useSound(buttonSound, { volume: 0.7 });
    
	// only safe input gets loaded from localStorage
	const asiaNr = Number(window.localStorage.getItem('Asia'));
	const asia = asiaNr <= 10 && asiaNr > 0 ? asiaNr : false;
	const europeNr = Number(window.localStorage.getItem('Europe'));
	const europe = europeNr <= 10 && europeNr > 0 ? europeNr : false;
	const africaNr = Number(window.localStorage.getItem('Africa'));
	const africa = africaNr <= 10 && africaNr > 0 ? africaNr : false;
	const americasNr = Number(window.localStorage.getItem('Americas'));
	const americas = americasNr <= 10 && americasNr > 0 ? americasNr : false;

    const onClickHandler = () => {
		!muted && play();
        dispatch(highScoresActions.removeHighScoresBoard())
    }

    return (
			<Modal>
				<div className={classes.highScoresBackground}>
					<div className={classes.highScoresCanvas}>
						<div className={classes.highScoresTitle}>
							Your best scores:
						</div>
						{europe && (
							<p className={`${classes.score} ${classes.scoreEurope}`}>
								Europe: {europe}
							</p>
						)}
						{asia && (
							<p className={`${classes.score} ${classes.scoreAsia}`}>
								Asia: {asia}
							</p>
						)}
						{americas && (
							<p className={`${classes.score} ${classes.scoreAmericas}`}>
								Americas: {americas}
							</p>
						)}
						{africa && (
							<p className={`${classes.score} ${classes.scoreAfrica}`}>
								Africa: {africa}
							</p>
						)}
						<button className={classes.highScoresOkay} onClick={onClickHandler}>
							OK
						</button>
					</div>
				</div>
			</Modal>
		);
    }

/** Adds 'View your best scores here' button & click event listener */
export const HighScoresBtn = () => {
    const dispatch = useDispatch();
	const muted = useSelector((state) => state.roundSlice.muted);
	const [play] = useSound(buttonSound, { volume: 0.7 });

    const clickEventHandler = () => {
		!muted && play();
        dispatch(highScoresActions.addHighScoresBoard());
        dispatch(highScoresActions.removeHighScoresBtn());
    }
    return (
			<button className={classes.highScoresBtn} onClick={clickEventHandler}>
				View your best scores here
			</button>
		);
};

/** Renders the high score text to the screen at the end of the round.
 * Also produces sound effect if enabled. */
export const HighScoresTitle = () => {
	const text = useSelector(state => state.highScoresSlice.highScoresText);
	const score = useSelector(state => state.answersSlice.score);
	const nrOfQuestions = useSelector(state => state.roundSlice.nrOfQuestions);
	const muted = useSelector((state) => state.roundSlice.muted);
	const [play] = useSound(highScoreSound, { volume: 0.5 });

	useEffect(() => {
		!muted && play();
	}, [muted, play]);
	return <h1 className={classes.finalScore}>{`${text} Score: ${score} / ${nrOfQuestions}`}</h1>;
};

/** Renders the 'star' icon to the screen and conditionally produces a sound effect */
export const StarIcon = () => {
	const dispatch = useDispatch();
	const muted = useSelector((state) => state.roundSlice.muted);
	const [play] = useSound(buttonSound, { volume: 0.7 });
	
	const clickHandler = () => {
		!muted && play();
		dispatch(highScoresActions.addHighScoresBoard());
	}
	return (
		<StarSVG
			className={classes.star}
			aria-label="star icon"
			onClick={clickHandler}
		/>
	);
}


