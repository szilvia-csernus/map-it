import classes from './HowToPlay.module.css';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { howToPlayActions } from '../store/how-to-play-slice';
import { ReactComponent as QuestionMarkSVG } from '../assets/icons/questionMark.svg';
import { game } from '../store/game-action-creators';
import useSound from 'use-sound';
import buttonSound from '../assets/audio/button.mp3';

/**  Renders instructions to screen & adds click event listener to "OK" button */
const HowToPlay = () => {
	const dispatch = useDispatch();
    const mobile = useSelector(state => state.gameSlice.mobile);
	const visitedBefore =
		window.localStorage.getItem('visitedBefore') === 'true' ? true : false;
	const message = mobile ? 'Tap ' : 'Double Click / Double Tap';
	const fastClass = visitedBefore ? classes.fast : '';
	const muted = useSelector((state) => state.gameSlice.muted);
	const [play] = useSound(buttonSound, { volume: 0.7 });

    function clickHandler() {
		!muted && play();
		dispatch(howToPlayActions.remove());

		// if the user visited for the first time, the PLAY button initiated this
		// how-to-play board hence we would want to continue to the game straight away.
		!visitedBefore && game(dispatch);
	}
	
    return (
			<Modal>
				<div className={classes.howToPlayBackground}>
					<div className={classes.howToPlayCanvas}>
						<p className={`${classes.firstRule} ${fastClass}`}>
							Select a region.
						</p>
						<p className={`${classes.secondRule} ${fastClass}`}>
							Find 10 countries on the map.
						</p>
						<p className={`${classes.thirdRule} ${fastClass}`}>
							You can zoom in and out, pan & rotate the map.
						</p>
						<p className={`${classes.fourthRule} ${fastClass}`}>
							{`${message} to select a country.`}
						</p>
						<button className={`${classes.okay} ${fastClass}`} onClick={clickHandler}>
							OK
						</button>
					</div>
				</div>
			</Modal>
		);
};

/** Renders the 'question mark' icon to the screen */
export const QuestionMarkIcon = () => {
	const dispatch = useDispatch();
	const muted = useSelector((state) => state.gameSlice.muted);
	const [play] = useSound(buttonSound, { volume: 0.7 });

	const clickHandler = () => {
		!muted && play();
		dispatch(howToPlayActions.add());
	};

	return (
		<QuestionMarkSVG
			className={classes.questionMark}
			onClick={clickHandler}
			aria-label="info icon"
		/>
	);
}

export default HowToPlay