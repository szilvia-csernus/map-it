import { useDispatch } from 'react-redux';
import classes from './NewGameBtn.module.css';
import { forwardRef } from 'react';
import { gameActions } from '../store/game-slice';
import { restartGame } from '../store/game-action-creators';

const NewGameBtn = forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(gameActions.removeNewGameBtn());
        restartGame(ref, dispatch)
    }

    return (
        <button className={classes.newGameBtn} onClick={clickHandler}>New Game</button>
    )
})

export default NewGameBtn