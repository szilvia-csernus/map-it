import classes from './PlayBtn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { game } from '../store/game-action-creators';
import { gameActions } from '../store/game-slice';
// *** to disable the sound on the Play Button, comment out the next 
// two lines as well as the lines underneath the *** signs.
// It will prevent the "AudioContextwas not allowed to start... " 
// warning message in Chrome
import useSound from 'use-sound';
import buttonSound from '../assets/audio/button.mp3';


/** Renders the PLAY Button which starts the game. Also makes a sound
 * effect if enabled. */
const PlayBtn = () => {
	const dispatch = useDispatch();
	// *** - next 2 lines
	const [play] = useSound(buttonSound, { volume: 0.4 });
	const muted = useSelector((state) => state.roundSlice.muted);
	const visible = useSelector((state) => state.gameSlice.playBtn);

	const clickEventHandler = () => {
		// *** next line
		!muted && play();
		dispatch(gameActions.addSoundIcon());
		game(dispatch);
	};
	const touchStartEventHandler = () => {
		dispatch(gameActions.setMobile(true));
	};
	return (
		<>
			{visible && (
				<button
					className={classes.playBtn}
					onClick={clickEventHandler}
					onTouchStart={touchStartEventHandler}
				>
					PLAY
				</button>
			)}
		</>
	);
};

export default PlayBtn;





