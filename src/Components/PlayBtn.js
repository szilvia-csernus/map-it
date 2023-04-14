import classes from './PlayBtn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { game } from '../store/game-action-creators';
import { forwardRef } from 'react';
import { rotateGlobe } from '../js/map';
import { gameActions } from '../store/game-slice';


const PlayBtn = forwardRef((props, ref) => {
    const map = ref;
    const dispatch = useDispatch();
    const visible = useSelector(state => state.gameSlice.playBtn);
	
    const clickEventHandler = () => {
        rotateGlobe(map);
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





