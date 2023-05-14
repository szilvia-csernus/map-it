import { useSelector } from 'react-redux';
import classes from './Checkmarks.module.css';
import { ReactComponent as CorrectSVG } from '../assets/icons/correct.svg';
import { ReactComponent as IncorrectSVG } from '../assets/icons/incorrect.svg';
import correctSound from '../assets/audio/correct.mp3';
import incorrectSound from '../assets/audio/incorrect.mp3';
import useSound from 'use-sound';
import { useEffect } from 'react';

/** Green "check" icon & sound */
const CorrectIcon = () => {
    const [play] = useSound(correctSound, {volume: 0.4})
    const muted = useSelector(state => state.roundSlice.muted);
    useEffect(() => {
        !muted && play()
    }, [muted, play]);

    return (
        <CorrectSVG className={classes.correct} />
    )
}

/** Red "cross" icon & sound */
const IncorrectIcon = () => {
    const [play] = useSound(incorrectSound, {volume: 0.4})
    const muted = useSelector(state => state.roundSlice.muted);
    useEffect(() => {
			!muted && play();
		}, [muted, play]);
    return (
        <IncorrectSVG className={classes.incorrect} />
    )
}

/** Renders all "checks" and "crosses" to the screen */
const Checkmarks = () => {
    const list = useSelector(state => state.answersSlice.list);
    const marks = [];
    list.forEach((el, idx) => {
        if (el) {
            marks.push(
                <CorrectIcon key={idx} />
            )
        } else {
            marks.push(
                <IncorrectIcon key={idx}/>
            )
        }
    });

    return (
        <ul className={classes.checkmarks}>
            {marks}
        </ul>
    )
};

export default Checkmarks;