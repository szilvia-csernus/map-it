import classes from './PlayBtn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { game } from '../store/game-action-creators';
import { gameActions } from '../store/game-slice';
import useSound from 'use-sound';
import buttonSound from '../assets/audio/button.mp3';

/** Renders the PLAY Button which starts the game. Also makes a sound
 * effect if enabled. */
const PlayBtn = () => {
    const dispatch = useDispatch();
	const muted = useSelector(state => state.gameSlice.muted);
	const [play] = useSound(buttonSound, { volume: 0.4 });
    const visible = useSelector(state => state.gameSlice.playBtn);
	
    const clickEventHandler = () => {
		!muted && play();
        game(dispatch);
	};
    const touchStartEventHandler = () => {
        dispatch(gameActions.setMobile(true))
    }
	return (
		<>
        { visible &&
			<button
				className={classes.playBtn}
				onClick={clickEventHandler}
				onTouchStart={touchStartEventHandler}
			>
				PLAY
			</button>
        }
		</>
	);
};

export default PlayBtn;





