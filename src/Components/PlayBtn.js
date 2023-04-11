import classes from './PlayBtn.module.css';
import { playBtnActions } from '../store/play-btn-slice';
import { useDispatch, useSelector } from 'react-redux';
import { game } from '../store/game-action-creators';
import { forwardRef } from 'react';
import { rotateGlobe } from '../js/map';



const PlayBtn = forwardRef((props, ref) => {
    const map = ref;
    const dispatch = useDispatch();
    const visible = useSelector(state => state.playBtnSlice.visible);
    const mobile = useSelector(state => state.playBtnSlice.mobile);
    const firstTime = useSelector(state => state.gameSlice.firstTime);
    const localStorageState = useSelector(state => state.localStorageSlice);
	
    const clickEventHandler = () => {
        rotateGlobe(map);
        game(
                map,
                mobile,
                localStorageState,
                firstTime,
                dispatch
			);
	};
    const touchStartEventHandler = () => {
        dispatch(playBtnActions.setMobile(true))
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





