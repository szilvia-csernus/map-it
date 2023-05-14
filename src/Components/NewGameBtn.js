import { useDispatch, useSelector } from 'react-redux';
import classes from './NewGameBtn.module.css';
import { forwardRef } from 'react';
import { gameActions } from '../store/game-slice';
import { restartGame } from '../store/game-action-creators';
import useSound from 'use-sound';
import buttonSound from '../assets/audio/button.mp3';

/** Renders the 'New Game' button and makes a sound effect if enabled. */
const NewGameBtn = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const muted = useSelector((state) => state.roundSlice.muted);
	const [play] = useSound(buttonSound, { volume: 0.4 });

    const clickHandler = () => {
        !muted && play();
        dispatch(gameActions.removeNewGameBtn());
			restartGame(ref, dispatch);
		}

    return (
        <button className={classes.newGameBtn} onClick={clickHandler}>New Game</button>
    )
})

export default NewGameBtn