import classes from './PlayBtn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { game } from '../store/game-action-creators';
import { forwardRef } from 'react';
import { gameActions } from '../store/game-slice';
import useSound from 'use-sound';
import buttonSound from '../assets/audio/button.mp3';


const PlayBtn = forwardRef((props, ref) => {
    const map = ref;
    const dispatch = useDispatch();
	const muted = useSelector(state => state.gameSlice.muted);
	const [play] = useSound(buttonSound, { volume: 0.4 });
    const visible = useSelector(state => state.gameSlice.playBtn);
	
    const clickEventHandler = () => {
		!muted && play();
        game( map, dispatch);
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
});

export default PlayBtn;





